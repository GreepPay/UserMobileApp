<template>
  <app-wrapper>
    <subpage-layout title="Confirm Details">
      <div class="w-full flex flex-col items-center px-4 h-full">
        <app-title-card-container custom-class="!rounded-2xl">
          <div class="w-full flex flex-col">
            <app-normal-text class="!text-white !font-normal">
              You Get
            </app-normal-text>
            <app-header-text class="!text-white !text-xl !font-normal pt-1">
              {{ defaultCountryCode.symbol }}
              {{
                Logic.Common.convertToMoney(
                  (purchaseData?.amount || 0) -
                    (selectedChannel?.feeLocal || 0),
                  false,
                  "",
                  false
                )
              }}
            </app-header-text>
          </div>
        </app-title-card-container>

        <div class="w-full flex flex-col pt-5">
          <app-details :details="bankDetails" />
        </div>

        <!-- Spacer -->
        <div class="w-full flex flex-col py-[60px]"></div>
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
            @click="continueToNext"
            class="!bg-secondary !py-4"
            variant="secondary"
            :loading="loadingState"
          >
            Next
          </app-button>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import {
  AppNormalText,
  AppTitleCardContainer,
  AppHeaderText,
  AppButton,
  AppDetails,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";
import {
  availableCurrencies,
  getBottomPadding,
  getPayinFee,
} from "../../composable";
import { ref } from "vue";
import { onMounted } from "vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { computed } from "vue";

const defaultCountryCode = availableCurrencies.filter(
  (item) => item.code == Logic.Auth.AuthUser?.profile?.default_currency
)[0];

export default defineComponent({
  name: "ConfirmAddMoneyPage",
  components: {
    AppNormalText,
    AppHeaderText,
    AppTitleCardContainer,
    AppButton,
    AppDetails,
  },
  middlewares: {
    fetchRules: [
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
    ],
  },
  setup() {
    const OnRampNetwork = ref(Logic.Wallet.OnRampNetwork);
    const OnRampChannels = ref(Logic.Wallet.OnRampChannels);

    const loadingState = ref(false);

    const bankDetails = reactive([
      {
        title: "Name",
        content: "Toyin Script",
      },
      {
        title: "Mobile Number",
        content: "+234 813 306 6201",
      },
      {
        title: "Provider",
        content: "MTN",
      },
      {
        title: "Deposit Amount",
        content: "$ 100.00",
      },
      {
        title: "Fee",
        content: "$ 5.00",
      },
    ]);

    const purchaseData = ref<
      | {
          type: "bank" | "momo";
          amount: number;
          currency: string;
          channelId: string;
          momoDetails?: {
            networkId: string;
            mobileNumber: string;
          };
        }
      | undefined
    >();

    const selectedChannel = computed(() => {
      return OnRampChannels.value?.find(
        (method) => method.id === purchaseData.value?.channelId
      );
    });

    const setDefault = () => {
      purchaseData.value = localStorage.getItem("purchaseData")
        ? JSON.parse(localStorage.getItem("purchaseData") || "")
        : undefined;

      let methodType = "momo";

      if (purchaseData.value) {
        bankDetails.length = 0;

        if (purchaseData.value.type != "momo") {
          bankDetails.push({
            title: "Payment Method",
            content: "Bank Transfer",
          });

          methodType = "bank_transfer";
        } else {
          bankDetails.push({
            title: "Payment Method",
            content: "Mobile Money",
          });

          bankDetails.push({
            title: "Network",
            content:
              OnRampNetwork.value?.find(
                (network) =>
                  network.id === purchaseData.value?.momoDetails?.networkId
              )?.name || "",
          });

          bankDetails.push({
            title: "Mobile Number",
            content: purchaseData.value.momoDetails?.mobileNumber || "",
          });
        }

        bankDetails.push({
          title: "Deposit Amount",
          content: `${defaultCountryCode.symbol} ${Logic.Common.convertToMoney(
            purchaseData.value.amount,
            false,
            ""
          )}`,
        });

        const finalFee = getPayinFee(
          defaultCountryCode.code,
          methodType,
          purchaseData.value.amount
        );

        bankDetails.push({
          title: "Fee",
          content: `${defaultCountryCode.symbol} ${Logic.Common.convertToMoney(
            finalFee || 0,
            false,
            ""
          )}`,
        });
      }
    };

    const continueToNext = async () => {
      Logic.Wallet.InitiateTopupForm = {
        amount: purchaseData.value?.amount || 0,
        method: purchaseData.value?.type || "",
        currency: purchaseData.value?.currency || "",
        payment_metadata: JSON.stringify(purchaseData.value),
      };

      loadingState.value = true;
      try {
        const paymentCollectionResponse = await Logic.Wallet.InitiateTopup();

        // Save to local storage
        localStorage.setItem(
          "currentPayment",
          JSON.stringify({
            collection_data: paymentCollectionResponse,
            amount: purchaseData.value?.amount || 0,
            method: purchaseData.value?.type || "",
            currency: purchaseData.value?.currency || "",
            extra_data: {
              network:
                OnRampNetwork.value?.find(
                  (network) =>
                    network.id === purchaseData.value?.momoDetails?.networkId
                )?.name || "",
              phone_number: purchaseData.value?.momoDetails?.mobileNumber || "",
            },
          })
        );

        Logic.Common.GoToRoute("/add/pay");
      } catch (error) {
        console.error(error);
      } finally {
        loadingState.value = false;
      }
    };

    onIonViewWillEnter(() => {
      setDefault();
    });

    onMounted(() => {
      setDefault();
    });

    return {
      Logic,
      bankDetails,
      continueToNext,
      defaultCountryCode,
      purchaseData,
      selectedChannel,
      loadingState,
      getBottomPadding,
    };
  },
});
</script>
