<template>
  <app-wrapper>
    <subpage-layout :title="pageTitle" :hideBackBtn="hideBackBtn">
      <div class="w-full flex flex-col items-center justify-start px-5 h-full">
        <!-- Confirmation details starts -->
        <template v-if="currentPageContent == 'confirmation_info'">
          <app-title-card-container custom-class="!rounded-2xl">
            <div class="w-full flex flex-col">
              <app-normal-text class="!text-white !font-normal">
                To be sent
              </app-normal-text>
              <app-header-text class="!text-white !text-xl pt-1 !font-normal">
                {{ selectedCurrencyData?.symbol }}
                {{
                  Logic.Common.convertToMoney(
                    paymentData?.amount,
                    true,
                    "",
                    false
                  )
                }}
              </app-header-text>
            </div>
          </app-title-card-container>

          <div class="w-full flex flex-col pt-4">
            <app-details :details="confirmationDetails" />
          </div>
        </template>
        <!-- Confirmation details end -->

        <!-- Processing -->
        <template v-if="currentPageContent == 'processing'">
          <app-title-card-container custom-class="!rounded-2xl">
            <div class="w-full flex flex-col">
              <app-normal-text class="!text-white !font-normal">
                Amount
              </app-normal-text>
              <app-header-text class="!text-white !text-xl pt-1 !font-normal">
                {{ selectedCurrencyData?.symbol }}
                {{
                  Logic.Common.convertToMoney(
                    paymentData?.amount,
                    false,
                    "",
                    false
                  )
                }}
              </app-header-text>
            </div>
          </app-title-card-container>

          <div
            class="w-full flex flex-col space-y-2 items-center justify-center pt-3"
          >
            <app-normal-text class="text-center !font-[500] pt-2">
              Your payment is on the way!
            </app-normal-text>

            <div
              class="px-2 py-2 rounded-full bg-primary flex flex-row items-center space-x-1 mb-2"
            >
              <app-icon name="bold-tick-white-circle" custom-class="size-7" />

              <app-normal-text class="text-center !text-white !text-sm pr-2">
                Sent
              </app-normal-text>
            </div>

            <div class="h-[75px] w-[7px] rounded-[6px] bg-[#F0F3F6]"></div>

            <div
              class="px-2 py-2 rounded-full bg-transparent border-[1.5px] border-[#E0E2E4] flex flex-row items-center space-x-1 mb-2"
            >
              <app-icon name="linear-more-circle" custom-class="size-7" />
              <app-normal-text
                class="text-center !text-veryLightGray !text-sm pr-2"
              >
                Deposited
              </app-normal-text>
            </div>
          </div>
        </template>
      </div>

      <!-- Bottom button -->
      <div
        class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4 flex flex-col"
        :style="`
          ${getBottomPadding}
        `"
      >
        <div
          class="w-full flex flex-col pb-4"
          v-if="currentPageContent === 'processing'"
        >
          <app-countdown-timer custom-class="!py-5" :duration="300" />
        </div>
        <div class="w-full flex flex-col">
          <app-button
            variant="secondary"
            :class="`!py-4`"
            @click="continueToNext"
            :loading="buttonIsLoading"
          >
            {{ mainButtonLabel }}
          </app-button>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  AppButton,
  AppNormalText,
  AppDetails,
  AppHeaderText,
  AppIcon,
  AppTitleCardContainer,
  AppCountdownTimer,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";
import { reactive } from "vue";
import { ref } from "vue";
import { User } from "@greep/logic/src/gql/graphql";
import { availableCurrencies, getBottomPadding } from "../../composable";
import { onMounted } from "vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { computed } from "vue";

export default defineComponent({
  name: "ConfirmSendMoneyPage",
  components: {
    AppButton,
    AppNormalText,
    AppDetails,
    AppHeaderText,
    AppIcon,
    AppTitleCardContainer,
    AppCountdownTimer,
  },
  setup() {
    const hideBackBtn = ref(false);

    const currentPageContent = ref("confirmation_info");
    const mainButtonLabel = ref("Confirm");
    const pageTitle = ref("Confirm Details");
    const buttonIsLoading = ref(false);

    const paymentData = ref<{
      beneficiary: User;
      amount: string;
      currency: string;
    }>();

    const confirmationDetails = reactive<
      {
        title: string;
        content: string;
      }[]
    >([]);

    const allowedAvailableCurrencies = computed(() => {
      const newAvailableCurrencies = availableCurrencies.filter(() => {
        return true;
      });

      newAvailableCurrencies.unshift(
        {
          code: "TRY",
          name: "Turkish Lira",
          symbol: "₺",
          country_code: "TR",
          loading: false,
        },
        {
          code: "USD",
          name: "United States Dollar",
          symbol: "$",
          country_code: "US",
          loading: false,
        },
        {
          code: "EUR",
          name: "Euro",
          symbol: "€",
          country_code: "EU",
          loading: false,
        }
      );

      newAvailableCurrencies.push(
        {
          code: "XLM",
          name: "Stellar Lumen",
          symbol: "XLM",
          country_code: "XLM",
          loading: false,
        },
        {
          code: "USDC",
          name: "USD Coin",
          symbol: "$",
          country_code: "US",
          loading: false,
        }
      );

      return reactive(newAvailableCurrencies);
    });

    const selectedCurrencyData = computed(() => {
      return allowedAvailableCurrencies.value.filter(
        (item) => item.code == paymentData.value?.currency
      )[0];
    });

    const setPageDefault = () => {
      // Get payment data from local storage
      paymentData.value = JSON.parse(
        localStorage.getItem("CurrentPaymentData") || "{}"
      );
      confirmationDetails.length = 0;
      if (paymentData.value?.beneficiary) {
        const beneficiaryName =
          paymentData.value.beneficiary?.profile?.user_type == "Customer"
            ? `${paymentData.value.beneficiary?.first_name} ${paymentData.value.beneficiary?.last_name}`
            : paymentData.value.beneficiary?.profile?.business?.business_name;

        confirmationDetails.push({
          title: "Beneficiary",
          content: beneficiaryName,
        });

        confirmationDetails.push({
          title: "Transfer Amount",
          content: `${
            selectedCurrencyData.value?.symbol
          } ${Logic.Common.convertToMoney(paymentData.value.amount, true, "")}`,
        });

        confirmationDetails.push({
          title: "Fee",
          content: `${
            selectedCurrencyData.value?.symbol
          } ${Logic.Common.convertToMoney(0, true, "")}`,
        });
      }
    };

    const continueToNext = async () => {
      if (buttonIsLoading.value) return;

      if (currentPageContent.value === "confirmation_info") {
        Logic.Wallet.MakePaymentForm = {
          amount: parseFloat(paymentData.value?.amount || "0"),
          currency: selectedCurrencyData.value?.code || "USD",
          receiver_uuid: paymentData.value?.beneficiary?.uuid || "",
        };

        buttonIsLoading.value = true;

        currentPageContent.value = "processing";
        pageTitle.value = "Processing";
        mainButtonLabel.value = "Home";
        hideBackBtn.value = true;

        try {
          await Logic.Wallet.MakePayment();

          Logic.Common.showAlert({
            show: true,
            type: "success",
            message: "Payment successful!",
          });
          Logic.Common.GoToRoute("/");
        } catch (error) {
          console.error(error);
        } finally {
          buttonIsLoading.value = false;
        }
      } else {
        currentPageContent.value = "confirmation_info";
        mainButtonLabel.value = "Confirm";
        pageTitle.value = "Confirm Details";
        hideBackBtn.value = false;
      }
    };

    onIonViewWillEnter(() => {
      setPageDefault();
    });

    onMounted(() => {
      setPageDefault();
    });

    return {
      Logic,
      continueToNext,
      confirmationDetails,
      hideBackBtn,
      currentPageContent,
      mainButtonLabel,
      pageTitle,
      selectedCurrencyData,
      paymentData,
      buttonIsLoading,
      getBottomPadding,
    };
  },
});
</script>
