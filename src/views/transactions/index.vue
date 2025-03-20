<template>
  <app-wrapper>
    <subpage-layout title="Transaction History">
      <div class="w-full flex flex-col items-center p-5 space-y-3 h-full">
        <!-- Date filter selector -->
        <div class="flex items-center w-full">
          <div
            class="flex-1 flex items-center border rounded-l-xl py-[15px] px-5"
          >
            <app-normal-text
              class="flex-1 !text-base !text-veryLightGray !leading-6 !font-medium"
            >
              From
            </app-normal-text>
            <app-icon name="calendar" />
          </div>
          <div
            class="flex-1 flex items-center border rounded-r-xl py-[15px] px-5"
          >
            <app-normal-text
              class="flex-1 !text-base !text-veryLightGray !leading-6 !font-medium"
            >
              To
            </app-normal-text>
            <app-icon name="calendar" />
          </div>
        </div>

        <!-- <app-text-field type="date" placeholder="From">
          <template #inner-suffix> <app-icon name="calendar" /> </template>
        </app-text-field> -->

        <!-- Header  -->
        <div class="w-full flex flex-col space-y-1 border rounded-xl py-4 px-5">
          <div class="flex items-center space-x-2">
            <app-header-text class="!font-semibold !text-xl !leading-6">
              Feb, 2025
            </app-header-text>
            <app-icon name="caret-down" />
          </div>

          <div class="flex items-center justify -between space-x-6">
            <app-normal-text class="!font-medium !text-lg !block !leading-6">
              In | 1500 GRP
            </app-normal-text>
            <app-normal-text class="!font-medium !text-lg !leading-6">
              Out | 5000 GRP
            </app-normal-text>
          </div>
        </div>

        <!-- History -->
        <div class="w-full flex flex-col space-y-2 s">
          <app-transactions :transactions="transactions" />
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
    AppTransactions,
    AppButton,
    AppIcon,
    AppTextField,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "TransactionsPage",
    components: {
      BeneficiaryList,
      AppSearch,
      AppTitleCardContainer,
      AppNormalText,
      AppHeaderText,
      AppTransactions,
      AppButton,
      AppIcon,
      AppTextField,
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
          id: 6,
          title: "Sent Payment",
          amount: 100,
          transactionType: "debit",
          type: "sent",
          status: "success",
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
        {
          id: 8,
          title: "Received Payment",
          amount: 200,
          transactionType: "credit",
          type: "received",
          status: "success",
          date: "2025-03-18",
        },
        {
          id: 2,
          title: "Redeemed Points",
          amount: 50,
          transactionType: "debit",
          type: "redeemed",
          status: "success",
          date: "2025-03-18",
        },
        {
          id: 10,
          title: "Added Funds",
          amount: 500,
          transactionType: "credit",
          type: "added",
          status: "success",
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
          id: 5,
          title: "Sent Payment",
          amount: 100,
          transactionType: "debit",
          type: "sent",
          status: "success",
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
          id: 7,
          title: "Received Payment",
          amount: 200,
          transactionType: "credit",
          type: "received",
          status: "success",
          date: "2025-03-18",
        },
        {
          id: 4,
          title: "Sent Payment",
          amount: 100,
          transactionType: "debit",
          type: "sent",
          status: "success",
          date: "2025-03-18",
        },
        {
          id: 11,
          title: "Added Funds",
          amount: 500,
          transactionType: "credit",
          type: "added",
          status: "success",
          date: "2025-03-18",
        },
        {
          id: 1,
          title: "Redeemed Points",
          amount: 50,
          transactionType: "debit",
          type: "redeemed",
          status: "success",
          date: "2025-03-18",
        },
      ])

      return {
        Logic,
        transactions,
        amount,
      }
    },
  })
</script>
