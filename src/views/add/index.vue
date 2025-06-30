<template>
  <app-wrapper>
    <subpage-layout title="Add Money">
      <div class="w-full flex flex-col items-center p-4 pt-3 h-full">
        <app-title-card-container>
          <div class="flex flex-col justify-center items-center w-full">
            <app-currency-switch
              :model-value="defaultCurrency"
              :default_currency="defaultCountryCode.code"
              :availableCurrencies="availableCurrencies"
              v-model:model-symbol="currencySymbol"
              :isSwitchable="false"
            />

            <div class="w-full flex flex-col items-center justify-center pt-4">
              <app-normal-text
                custom-class="!text-white !font-normal !font-sm pb-2  text-center"
              >
                Amount
              </app-normal-text>

              <app-header-text class="!text-3xl text-white !font-normal">
                {{ currencySymbol }}
                {{
                  !Number.isNaN(parseFloat(amount))
                    ? Logic.Common.convertToMoney(amount, false, "", false)
                    : "0"
                }}
              </app-header-text>
            </div>
          </div>
        </app-title-card-container>

        <div
          class="w-full flex flex-col flex-grow justify-start space-y-2 items-center pt-6"
        >
          <app-keyboard v-model="amount" class="" />

          <div :class="`w-full flex flex-col items-center justify-center`">
            <template v-if="parseFloat(amount) > maxAmount">
              <app-normal-text class="!text-red-500">
                Maximum amount is
                <span class="!font-semibold pl-1"
                  >{{ currencySymbol }}
                  {{
                    Logic.Common.convertToMoney(maxAmount, true, "", false)
                  }}</span
                >
              </app-normal-text>
            </template>
            <template v-if="parseFloat(amount) < minAmount">
              <app-normal-text class="!text-red-500">
                Minimum amount is
                <span class="!font-semibold pl-1"
                  >{{ currencySymbol }}
                  {{
                    Logic.Common.convertToMoney(minAmount, true, "", false)
                  }}</span
                >
              </app-normal-text>
            </template>

            <app-normal-text
              class="!text-gray-800 pt-5"
              v-if="parseFloat(amount) > 0 && selectedMethod == 'card'"
            >
              Amuount in USD is
              <span class="!font-semibold pl-1"
                >{{ "$" }}
                {{
                  Logic.Common.convertToMoney(amountInUSD, true, "", false)
                }}</span
              >
            </app-normal-text>
          </div>
        </div>

        <!-- Bottom button -->
        <div
          class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
          :style="`
            ${getBottomPadding}
          `"
        >
          <div class="w-full flex flex-col">
            <app-button
              :class="`!py-4 ${amountIsValid() ? 'opacity-100' : 'opacity-50'}`"
              @click="amountIsValid() ? continueToNext() : null"
              variant="secondary"
            >
              Next
            </app-button>
          </div>
        </div>
      </div>

      <!-- Welcome Modal -->
      <app-modal
        v-if="showPayWithCard"
        :close="
          () => {
            showPayWithCard = false;
          }
        "
        hasTitle
        title="Topup Your Wallet"
        :canClose="false"
        contentClass="!px-0 !py-0 !h-full"
        innerClass="!h-[85%] !max-h-[90%]"
      >
        <iframe
          :src="`${paymentBaseUrl}?amount=${amountInUSD}&userUuid=${Logic.Auth.AuthUser?.wallet?.uuid}`"
          width="100%"
          height="100%"
          class=""
          style="border: none"
          title="GreepPay"
        ></iframe>
      </app-modal>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  AppHeaderText,
  AppButton,
  AppKeyboard,
  AppNormalText,
  AppTitleCardContainer,
  AppCurrencySwitch,
  AppModal,
} from "@greep/ui-components";
import { availableCurrencies, getBottomPadding } from "../../composable";
import { Logic } from "@greep/logic";
import { onMounted } from "vue";
import { GlobalExchangeRate, User } from "@greep/logic/src/gql/graphql";
import { computed } from "vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { onUnmounted } from "vue";

const defaultCountryCode = availableCurrencies.filter(
  (item) => item.code == Logic.Auth.AuthUser?.profile?.default_currency
)[0];

export default defineComponent({
  name: "WalletAddMoneyPage",
  components: {
    AppHeaderText,
    AppButton,
    AppKeyboard,
    AppNormalText,
    AppTitleCardContainer,
    AppCurrencySwitch,
    AppModal,
  },
  middlewares: {
    fetchRules: [
      {
        domain: "Wallet",
        property: "OnRampChannels",
        method: "GetOnRampChannels",
        params: [
          defaultCountryCode?.country_code ||
            localStorage.getItem("default_country_code"),
        ],
        requireAuth: true,
        ignoreProperty: false,
      },
      {
        domain: "Wallet",
        property: "OnRampNetwork",
        method: "GetOnRampNetwork",
        params: [
          defaultCountryCode?.country_code ||
            localStorage.getItem("default_country_code"),
        ],
        requireAuth: true,
        ignoreProperty: false,
      },
    ],
  },
  setup() {
    const amount = ref("0");

    const OnRampChannels = ref(Logic.Wallet.OnRampChannels);
    const OnRampNetwork = ref(Logic.Wallet.OnRampNetwork);
    const currencyExchangeToUSD = ref<GlobalExchangeRate | undefined>();

    const showPayWithCard = ref(false);

    const defaultCurrency = ref(defaultCountryCode.code);

    const selectedMethod = ref("");

    const selectedCurrency = ref(defaultCountryCode.code);

    const AuthUser = ref<User | undefined>(Logic.Auth.AuthUser);

    const currencySymbol = ref(defaultCountryCode.symbol);

    const selectedChannel = computed(() => {
      return OnRampChannels.value?.find(
        (method) => method.id === selectedMethod.value
      );
    });

    const minAmount = computed(() => {
      if (selectedMethod.value != "card") {
        return selectedChannel.value?.min || 0;
      } else {
        return defaultCountryCode.card_payment?.min || 0;
      }
    });

    const maxAmount = computed(() => {
      if (selectedMethod.value != "card") {
        return selectedChannel.value?.max || 0;
      } else {
        return defaultCountryCode.card_payment?.max || 1000000;
      }
    });

    const setPageDefaults = () => {
      defaultCurrency.value =
        Logic.Auth.AuthUser?.profile?.default_currency ||
        defaultCountryCode.code;
      selectedCurrency.value = defaultCurrency.value;

      selectedMethod.value =
        Logic.Common.route?.query?.channelId?.toString() || "";
    };

    const amountIsValid = () => {
      if (selectedMethod.value != "card") {
        return (
          parseFloat(amount.value) >= (selectedChannel.value?.min || 0) &&
          parseFloat(amount.value) <= (selectedChannel.value?.max || 0)
        );
      } else {
        return (
          parseFloat(amount.value) >=
            (defaultCountryCode.card_payment?.min || 0) &&
          parseFloat(amount.value) <=
            (defaultCountryCode.card_payment?.max || 1000000)
        );
      }
    };

    const paymentBaseUrl = computed(() => {
      return import.meta.env.VITE_PAYMENT_URL;
    });

    const amountInUSD = computed(() => {
      return (
        parseFloat(amount.value.replaceAll(",", "")) /
        (currencyExchangeToUSD.value?.mid || 1)
      );
    });

    const continueToNext = () => {
      if (amountIsValid()) {
        if (selectedMethod.value == "card") {
          showPayWithCard.value = true;
          return;
        }
        if (selectedChannel.value?.channelType == "momo") {
          const purchaseData = {
            type: "momo",
            amount: parseFloat(amount.value),
            currency: selectedCurrency.value,
            channelId: selectedChannel.value?.id || "",
          };
          localStorage.setItem("purchaseData", JSON.stringify(purchaseData));

          Logic.Common.GoToRoute(
            "/add/bank-details?channelId=" + selectedMethod.value
          );
        } else {
          // Save purchase data to localstorage
          const purchaseData = {
            type: "bank",
            amount: parseFloat(amount.value),
            currency: selectedCurrency.value,
            channelId: selectedChannel.value?.id || "",
          };
          localStorage.setItem("purchaseData", JSON.stringify(purchaseData));

          Logic.Common.GoToRoute("/add/confirm");
        }
      }
    };

    const setExchangeRateToUSD = async () => {
      currencyExchangeToUSD.value = await Logic.Wallet.GetGlobalExchangeRate(
        "USD",
        defaultCountryCode.code || "",
        true
      );
    };

    const handleIframeMessage = (event: MessageEvent) => {
      if (event.origin === import.meta.env.VITE_PAYMENT_BASE_URL) {
        const paymentStatus: string = event.data.paymentStatus;
        if (paymentStatus == "success") {
          Logic.Common.showAlert({
            show: true,
            type: "success",
            message: "Topup Successful",
          });

          showPayWithCard.value = false;
          Logic.Auth.GetAuthUser();
          Logic.Common.GoToRoute("/");
        } else {
          Logic.Common.showAlert({
            show: true,
            type: "error",
            message: "Topup Failed. Please try again",
          });
          showPayWithCard.value = false;
        }
      }
    };

    onIonViewWillEnter(() => {
      setPageDefaults();
      if (selectedMethod.value == "card") {
        setExchangeRateToUSD();
      }
    });

    onMounted(() => {
      Logic.Auth.watchProperty("AuthUser", AuthUser);
      Logic.Wallet.watchProperty("OnRampChannels", OnRampChannels);
      Logic.Wallet.watchProperty("OnRampNetwork", OnRampNetwork);
      setPageDefaults();

      window.addEventListener("message", handleIframeMessage);
    });

    onUnmounted(() => {
      window.removeEventListener("message", handleIframeMessage);
    });

    return {
      amount,
      Logic,
      selectedChannel,
      continueToNext,
      amountIsValid,
      currencySymbol,
      availableCurrencies,
      defaultCurrency,
      defaultCountryCode,
      getBottomPadding,
      selectedMethod,
      minAmount,
      maxAmount,
      showPayWithCard,
      currencyExchangeToUSD,
      paymentBaseUrl,
      amountInUSD,
    };
  },
});
</script>
