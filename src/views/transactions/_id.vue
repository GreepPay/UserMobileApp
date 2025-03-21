<template>
  <app-wrapper>
    <subpage-layout title="Transaction Details">
      <div class="w-full flex flex-col items-center p-5 space-y-3 h-full">
        <app-title-card-container :custom-class="'!sbg-red-900'">
          <div class="w-full flex justify-center items-center flex-col py-5">
            <app-normal-text class="!text-white !font-normal text-center">
              Amount Sent
            </app-normal-text>
            <app-header-text class="!text-3xl !font-medium text-white">
              ₺
              {{ Logic.Common.convertToMoney(3350000, false, "", false) }}
            </app-header-text>
          </div>
        </app-title-card-container>

        <div
          class="flex py-6 px-5 rounded-3xl items-center w-full justify-between space-x-3 w-full border"
        >
          <app-normal-text
            custom-class="!text-gray-two !flex-1 capitalize flex-1"
          >
            GRP Token Earned
          </app-normal-text>

          <div class="flex px-1 items-center justify-end space-x-1">
            <app-normal-text custom-class="!text-black !font-semibold">
              40
            </app-normal-text>
            <app-icon name="grp-white-and-black" />
          </div>
        </div>

        <div class="w-full py-2">
          <app-details :details="txnDetails" :isVertical="false" />
        </div>

        <!-- Bottom button -->
        <div
          class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
          style="
            padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
          "
        >
          <app-button
            :custom-class="` !border-secondary !w-full !py-4  !px-8`"
            :outlined="true"
          >
            Share Receipt
          </app-button>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { defineComponent } from "vue";
import {
  AppTitleCardContainer,
  AppNormalText,
  AppHeaderText,
  AppButton,
  AppIcon,
  AppDetails,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";

export default defineComponent({
  name: "TransactionsDetailsPage",
  components: {
    AppTitleCardContainer,
    AppNormalText,
    AppHeaderText,
    AppButton,
    AppIcon,
    AppDetails,
  },
  setup() {
    const txnDetails = [
      { title: "Sent To", content: "Timms Closet Ventures" },
      { title: "Transfer Type", content: "Wallet" },
      { title: "Amount", content: "₦33,000 ($22)" },
      { title: "Time", content: "Feb 20, 2025" },
    ];

    return {
      txnDetails,
      Logic,
    };
  },
});
</script>
