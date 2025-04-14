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
            <template
              v-if="parseFloat(amount) > (selectedChannel?.max || 100000)"
            >
              <app-normal-text class="!text-red-500">
                Maximum amount is
                <span class="!font-semibold pl-1"
                  >{{ currencySymbol }}
                  {{
                    Logic.Common.convertToMoney(
                      selectedChannel?.max || 100000,
                      true,
                      "",
                      false
                    )
                  }}</span
                >
              </app-normal-text>
            </template>
            <template v-if="parseFloat(amount) < (selectedChannel?.min || 0)">
              <app-normal-text class="!text-gray-700">
                Minimum amount is
                <span class="!font-semibold pl-1"
                  >{{ currencySymbol }}
                  {{
                    Logic.Common.convertToMoney(
                      selectedChannel?.min,
                      true,
                      "",
                      false
                    )
                  }}</span
                >
              </app-normal-text>
            </template>
          </div>
        </div>

        <!-- Bottom button -->
        <div
          class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
          style="
            padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
          "
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
} from "@greep/ui-components";
import { availableCurrencies } from "../../composable";
import { Logic } from "@greep/logic";
import { onMounted } from "vue";
import { User } from "@greep/logic/src/gql/graphql";
import { computed } from "vue";
import { onIonViewWillEnter } from "@ionic/vue";

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
  },
  middlewares: {
    fetchRules: [
      {
        domain: "Wallet",
        property: "OnRampChannels",
        method: "GetOnRampChannels",
        params: [defaultCountryCode?.country_code],
        requireAuth: true,
        ignoreProperty: false,
      },
      {
        domain: "Wallet",
        property: "OnRampNetwork",
        method: "GetOnRampNetwork",
        params: [defaultCountryCode?.country_code],
        requireAuth: true,
        ignoreProperty: false,
      },
    ],
  },
  setup() {
    const amount = ref("0");

    const OnRampChannels = ref(Logic.Wallet.OnRampChannels);
    const OnRampNetwork = ref(Logic.Wallet.OnRampNetwork);

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

    const setPageDefaults = () => {
      defaultCurrency.value =
        Logic.Auth.AuthUser?.profile?.default_currency ||
        defaultCountryCode.code;
      selectedCurrency.value = defaultCurrency.value;

      selectedMethod.value =
        Logic.Common.route?.query?.channelId?.toString() || "";
    };

    const amountIsValid = () => {
      return (
        parseFloat(amount.value) >= (selectedChannel.value?.min || 0) &&
        parseFloat(amount.value) <= (selectedChannel.value?.max || 0)
      );
    };

    const continueToNext = () => {
      if (amountIsValid()) {
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

    onIonViewWillEnter(() => {
      setPageDefaults();
    });

    onMounted(() => {
      Logic.Auth.watchProperty("AuthUser", AuthUser);
      Logic.Wallet.watchProperty("OnRampChannels", OnRampChannels);
      Logic.Wallet.watchProperty("OnRampNetwork", OnRampNetwork);
      setPageDefaults();
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
    };
  },
});
</script>
