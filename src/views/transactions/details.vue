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
  import { ref, reactive } from "vue"
  import { defineComponent } from "vue"
  import {
    BeneficiaryList,
    AppSearch,
    AppTitleCardContainer,
    AppNormalText,
    AppHeaderText,
    AppTransaction,
    AppButton,
    AppIcon,
    AppTextField,
    AppDetails,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "TransactionsDetailsPage",
    components: {
      BeneficiaryList,
      AppSearch,
      AppTitleCardContainer,
      AppNormalText,
      AppHeaderText,
      AppTransaction,
      AppButton,
      AppIcon,
      AppTextField,
      AppDetails,
    },
    setup() {
      const amount = ref("1000")
      const transactions = reactive<
        {
          id: string | number
          title: string
          amount: number
          transactionType: "credit" | "debit"
          type: "redeemed" | "sent" | "received" | "added"
          status: "processing" | "failed" | "success"
          date: string
        }[]
      >([
        {
          id: 1,
          title: "Redeemed Points",
          amount: 50,
          transactionType: "debit",
          type: "redeemed",
          status: "processing",
          date: "2025-03-18",
        },
        {
          id: 2,
          title: "Redeemed Points",
          amount: 50,
          transactionType: "debit",
          type: "redeemed",
          status: "failed",
          date: "2025-03-18",
        },
        {
          id: 3,
          title: "Redeemed Points",
          amount: 50,
          transactionType: "debit",
          type: "redeemed",
          status: "success",
          date: "2025-03-18",
        },

        {
          id: 4,
          title: "Sent Payment",
          amount: 100,
          transactionType: "debit",
          type: "sent",
          status: "processing",
          date: "2025-03-18",
        },
        {
          id: 5,
          title: "Sent Payment",
          amount: 100,
          transactionType: "debit",
          type: "sent",
          status: "failed",
          date: "2025-03-18",
        },
        {
          id: 6,
          title: "Sent Payment",
          amount: 100,
          transactionType: "debit",
          type: "sent",
          status: "success",
          date: "2025-03-18",
        },

        {
          id: 7,
          title: "Received Payment",
          amount: 200,
          transactionType: "credit",
          type: "received",
          status: "processing",
          date: "2025-03-18",
        },
        {
          id: 8,
          title: "Received Payment",
          amount: 200,
          transactionType: "credit",
          type: "received",
          status: "failed",
          date: "2025-03-18",
        },
        {
          id: 9,
          title: "Received Payment",
          amount: 200,
          transactionType: "credit",
          type: "received",
          status: "success",
          date: "2025-03-18",
        },

        {
          id: 10,
          title: "Added Funds",
          amount: 500,
          transactionType: "credit",
          type: "added",
          status: "processing",
          date: "2025-03-18",
        },
        {
          id: 11,
          title: "Added Funds",
          amount: 500,
          transactionType: "credit",
          type: "added",
          status: "failed",
          date: "2025-03-18",
        },
        {
          id: 12,
          title: "Added Funds",
          amount: 500,
          transactionType: "credit",
          type: "added",
          status: "success",
          date: "2025-03-18",
        },
      ])

      //   const txnDetails = {
      //     "Bank name": "Script Bank",
      //     accountName: "Dasa Script",
      //     referenceCode: "09802323672",
      //   }

      const txnDetails = [
        { title: "Sent To", content: "Timms Closet Ventures" },
        { title: "Transfer Type", content: "Wallet" },
        { title: "Amount", content: "₦33,000 ($22)" },
        { title: "Time", content: "Feb 20, 2025" },
      ]

      return {
        txnDetails,
        Logic,
        transactions,
        amount,
      }
    },
  })
</script>
