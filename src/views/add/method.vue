<template>
  <app-wrapper>
    <subpage-layout title="Choose Method">
      <div
        class="w-full flex flex-col items-center justify-start px-4 h-full pt-1"
      >
        <template v-for="(method, index) in paymentMethods" :key="index">
          <div
            :class="`w-full flex flex-col space-y-1 px-4 py-4 !border-[2px] mb-3 ${
              selectedMethod == method.key
                ? 'border-primary'
                : 'border-[#E0E2E4]'
            } rounded-[16px]`"
            @click="selectedMethod = method.key"
          >
            <div class="w-full flex flex-row justify-between items-center">
              <app-normal-text class="text-left !text-sm font-semibold">
                {{ method.title }}
              </app-normal-text>

              <div class="flex flex-row justify-end">
                <app-icon
                  :name="`${
                    selectedMethod == method.key ? 'selected' : 'not-selected'
                  }`"
                  class="h-[24px]"
                />
              </div>
            </div>

            <div class="w-full flex flex-row">
              <app-normal-text class="text-left">
                Fee: {{ method.fee }}
              </app-normal-text>
            </div>
          </div>
        </template>
      </div>

      <!-- Bottom button -->
      <div
        class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
        style="
          padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
        "
      >
        <div class="">
          <app-button
            variant="secondary"
            :class="`!w-full !py-4`"
            @click="continueToNext"
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
import { AppNormalText, AppButton, AppIcon } from "@greep/ui-components";
import { ref } from "vue";
import { Logic } from "@greep/logic";
import { onMounted } from "vue";
import { availableCurrencies } from "../../composable";
import { onIonViewWillEnter } from "@ionic/vue";
import { watch } from "vue";

const defaultCountryCode = availableCurrencies.filter(
  (item) => item.code == Logic.Auth.AuthUser?.profile?.default_currency
)[0];

export default defineComponent({
  name: "AddMoneyPaymentMethod",
  components: {
    AppNormalText,
    AppButton,
    AppIcon,
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
    const selectedMethod = ref<string>("bank_transfer");

    const OnRampChannels = ref(Logic.Wallet.OnRampChannels);
    const OnRampNetwork = ref(Logic.Wallet.OnRampNetwork);

    const paymentMethods = reactive([
      {
        title: "Bank Transfer",
        key: "bank_transfer",
        fee: `$1`,
        active: true,
        type: "bank",
      },
      {
        title: "Mobile Money",
        key: "mobile_money",
        fee: `$1`,
        active: true,
        type: "mobile_money",
      },
    ]);

    const continueToNext = () => {
      Logic.Common.GoToRoute("/add?channelId=" + selectedMethod.value);
    };

    const getMethodName = (method: string) => {
      if (method === "bank") {
        return "Bank Transfer";
      } else if (method === "momo") {
        return "Mobile Money";
      } else if (method === "p2p") {
        return "P2P transfer";
      }
    };

    const setAvailableOptions = () => {
      if (OnRampChannels.value) {
        paymentMethods.length = 0;

        OnRampChannels.value.forEach((channel) => {
          paymentMethods.push({
            title: getMethodName(channel.channelType) || "Unknown",
            key: channel.id,
            fee: `${defaultCountryCode.symbol}${Logic.Common.convertToMoney(
              channel.feeLocal,
              false,
              ""
            )}`,
            active: channel.status == "active",
            type: channel.channelType,
          });
        });

        if (paymentMethods.length > 0) {
          selectedMethod.value = paymentMethods[0].key;
        }
      }
    };

    onIonViewWillEnter(() => {
      setAvailableOptions();
    });

    watch([OnRampChannels, OnRampNetwork], () => {
      setAvailableOptions();
    });

    onMounted(() => {
      Logic.Wallet.watchProperty("OnRampChannels", OnRampChannels);
      Logic.Wallet.watchProperty("OnRampNetwork", OnRampNetwork);
      setAvailableOptions();
    });

    return {
      paymentMethods,
      Logic,
      selectedMethod,
      continueToNext,
    };
  },
});
</script>
