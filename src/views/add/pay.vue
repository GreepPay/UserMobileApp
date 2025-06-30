<template>
  <app-wrapper>
    <subpage-layout :title="pageTitle" :hideBackBtn="hideBackBtn">
      <div class="w-full flex flex-col items-center justify-start px-4 h-full">
        <!-- Confirmation details starts -->
        <template v-if="currentPageContent == 'confirmation_info'">
          <app-title-card-container custom-class="!rounded-2xl">
            <div class="w-full flex flex-col">
              <app-normal-text class="!text-white !font-normal">
                You pay
              </app-normal-text>
              <app-header-text class="!text-white !text-xl !font-normal pt-1">
                {{ defaultCountryCode.symbol }}
                {{
                  Logic.Common.convertToMoney(
                    currentPayment?.amount || 0,
                    false,
                    "",
                    false
                  )
                }}
              </app-header-text>
            </div>
          </app-title-card-container>

          <div class="w-full flex flex-col py-4">
            <app-info-box>
              <app-normal-text custom-class="left !leading-5 !text-gray-two ">
                Add money to your wallet using the following bank details
              </app-normal-text>
            </app-info-box>
          </div>
          <app-details :details="confirmationDetails" />

          <!-- Space -->
          <div class="w-full flex flex-col py-[50px]"></div>
        </template>
        <!-- Confirmation details end -->

        <!-- Processing -->
        <template v-if="currentPageContent == 'processing'">
          <app-title-card-container custom-class="!rounded-2xl">
            <div class="w-full flex flex-col">
              <app-normal-text class="!text-white !font-normal">
                Amount
              </app-normal-text>
              <app-header-text class="!text-white !text-xl !font-normal pt-1">
                {{ defaultCountryCode.symbol }}
                {{
                  Logic.Common.convertToMoney(
                    currentPayment?.amount || 0,
                    false,
                    "",
                    false
                  )
                }}
              </app-header-text>
            </div>
          </app-title-card-container>

          <div
            class="w-full flex flex-col space-y-2 items-center justify-center pt-6"
          >
            <app-normal-text class="text-center !font-medium">
              Your payment is on the way!
            </app-normal-text>

            <div
              class="px-2 py-2 rounded-full bg-primary flex flex-row items-center space-x-1 mb-2"
            >
              <app-icon name="bold-tick-white-circle" custom-class="size-7" />

              <app-normal-text class="text-center !text-white pr-2">
                Sent
              </app-normal-text>
            </div>

            <div class="h-[75px] w-[7px] rounded-[6px] bg-[#F0F3F6]"></div>

            <div
              class="px-2 py-2 rounded-full bg-transparent border-[1.5px] border-[#E0E2E4] flex flex-row items-center space-x-1 mb-2"
            >
              <app-icon name="linear-more-circle" custom-class="size-7" />
              <app-normal-text class="text-center !text-veryLightGray pr-2">
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
          class="w-full flex flex-col mb-3"
          v-if="currentPageContent === 'processing'"
        >
          <app-countdown-timer custom-class="!py-5" :duration="300" />
        </div>

        <div class="w-full flex flex-col">
          <app-button
            variant="secondary"
            :class="`!py-4`"
            @click="continueToNext"
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
  AppInfoBox,
  AppCountdownTimer,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";
import { reactive } from "vue";
import { ref } from "vue";
import { availableCurrencies, getBottomPadding } from "../../composable";
import { PaymentCollectionResponse } from "@greep/logic/src/gql/graphql";
import { onMounted } from "vue";
import { onIonViewWillEnter } from "@ionic/vue";

const defaultCountryCode = availableCurrencies.filter(
  (item) => item.code == Logic.Auth.AuthUser?.profile?.default_currency
)[0];

export default defineComponent({
  name: "AddMoneyPaymentPage",
  components: {
    AppButton,
    AppNormalText,
    AppDetails,
    AppHeaderText,
    AppIcon,
    AppTitleCardContainer,
    AppInfoBox,
    AppCountdownTimer,
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
    const hideBackBtn = ref(false);

    const currentPayment = ref<
      | {
          collection_data: PaymentCollectionResponse;
          amount: number;
          method: "bank" | "momo";
          currency: string;
          extra_data: {
            network: string;
            phone_number: string;
          };
        }
      | undefined
    >();

    const currentPageContent = ref("confirmation_info");
    const mainButtonLabel = ref("Confirm");
    const pageTitle = ref("Make Payment");

    const confirmationDetails = reactive([
      {
        title: "Bank Name",
        content: "Capital One",
      },
      {
        title: "Account Number",
        content: "4833241496",
      },
      {
        title: "Reference Code",
        content: "278356263782903",
      },
    ]);

    const setPageDefault = () => {
      currentPayment.value = localStorage.getItem("currentPayment")
        ? JSON.parse(localStorage.getItem("currentPayment") || "")
        : undefined;

      if (currentPayment.value?.method == "bank") {
        confirmationDetails.length = 0;

        confirmationDetails.push({
          title: "Bank Name",
          content: currentPayment.value?.collection_data?.bankInfo.name || "",
        });
        confirmationDetails.push({
          title: "Account Number",
          content:
            currentPayment.value?.collection_data?.bankInfo.accountNumber || "",
        });
        confirmationDetails.push({
          title: "Account Name",
          content:
            currentPayment.value?.collection_data?.bankInfo.accountName || "",
        });
        confirmationDetails.push({
          title: "Expires at",
          content: Logic.Common.fomartDate(
            currentPayment.value?.collection_data?.expiresAt || "",
            "YYYY-MM-DD HH:mm:ss"
          ),
        });

        mainButtonLabel.value = "I've made the payment";
      } else {
        currentPageContent.value = "processing";
      }
    };

    const continueToNext = () => {
      if (currentPageContent.value === "confirmation_info") {
        currentPageContent.value = "processing";
        pageTitle.value = "Processing";
        mainButtonLabel.value = "Home";
        hideBackBtn.value = true;

        // Monitor payment status
        Logic.Wallet.MonitorTopupStatus(
          currentPayment.value?.collection_data?.id || "",
          async () => {
            await Logic.Auth.GetAuthUser();
            Logic.Common.GoToRoute("/");
          }
        );
      } else {
        Logic.Common.GoToRoute("/");
        currentPageContent.value = "confirmation_info";
        mainButtonLabel.value = "Confirm";
        pageTitle.value = "Make Payment";
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
      currentPayment,
      defaultCountryCode,
      getBottomPadding,
    };
  },
});
</script>
