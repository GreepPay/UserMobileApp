<template>
  <app-wrapper>
    <subpage-layout title="GRP Tokens">
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
          <app-transactions
            :data="item"
            v-for="(item, index) in transactions"
            :key="index"
            :show-type="false"
          />
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
    name: "WalletRedeemokenHistory",
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
          type: "redeemed"
          transactionType: "credit" | "debit"
          date: string
        }[]
      >([
        {
          id: 1,
          title: "Redeemed",
          amount: 33000,
          type: "redeemed",
          transactionType: "debit",
          date: "Today",
        },
        {
          id: 2,
          title: "Earned",
          amount: 54,
          type: "redeemed",
          transactionType: "credit",
          date: "Yesterday",
        },
        {
          id: 3,
          title: "Earned",
          amount: 500,
          type: "redeemed",
          transactionType: "credit",
          date: "2 Days Ago",
        },
        {
          id: 4,
          title: "Earned",
          amount: 500,
          type: "redeemed",
          transactionType: "debit",
          date: "Last Week",
        },
        {
          id: 5,
          title: "Redeemed",
          amount: 20,
          type: "redeemed",
          transactionType: "debit",
          date: "Last Month",
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
