<template>
  <app-wrapper>
    <subpage-layout title="GRP Tokens">
      <div class="w-full flex flex-col items-center p-5 space-y-3 h-full">
        <!-- Date filter selector -->
        <div class="w-full flex flex-row items-center">
          <div class="w-1/2 flex flex-col">
            <app-text-field
              :has-title="false"
              type="date"
              placeholder="From"
              ref="from"
              name="from"
              v-model="filterSetup.from"
              custom-class="!border-[1.5px] border-[#E0E2E4] !rounded-r-[0px] px-4 py-4 !bg-transparent"
              :input-style="`!text-sm`"
            >
              <template #inner-suffix>
                <app-icon name="calendar" custom-class="h-[22px]" />
              </template>
            </app-text-field>
          </div>

          <div class="w-1/2 flex flex-col">
            <app-text-field
              :has-title="false"
              type="date"
              placeholder="To"
              ref="to"
              name="to"
              v-model="filterSetup.to"
              custom-class="!border-[1.5px] border-[#E0E2E4] !rounded-l-[0px] !border-l-[0px] px-4 py-4 !bg-transparent"
              :input-style="`!text-sm`"
            >
              <template #inner-suffix>
                <app-icon name="calendar" custom-class="h-[22px]" />
              </template>
            </app-text-field>
          </div>
        </div>

        <div
          class="w-full flex flex-col space-y-1 border-[#E0E2E4] border-[1.5px] px-4 py-4 rounded-[16px]"
        >
          <app-select
            v-model="filterSetup.period"
            :options="monthFilterOption"
            is-wrapper
            @OnOptionSelected="
              (option) => {
                currentOptionName = option.value
              }
            "
          >
            <div
              class="flex flex-row space-x-[3px] items-center w-full justify-start"
            >
              <app-normal-text
                custom-class="!text-black !font-semibold !text-left !text-sm"
                >{{ currentOptionName }}</app-normal-text
              >
              <app-icon name="dropdown" custom-class="!h-[6px]" />
            </div>
          </app-select>

          <div class="w-full flex flex-row items-center space-x-3">
            <app-normal-text
              custom-class="!text-black !font-[500] !text-left !text-sm"
              >In | ₺30,000</app-normal-text
            >

            <app-normal-text
              custom-class="!text-black !font-[500] !text-left !text-sm"
              >Out | ₺30,000</app-normal-text
            >
          </div>
        </div>

        <!-- History -->
        <div class="w-full flex flex-col">
          <div
            v-for="(transaction, index) in transactionHistory"
            :key="index"
            class="w-full flex flex-row justify-between py-4 border-b-[1px] border-veryLightGray"
          >
            <div class="flex flex-row space-x-2 items-center">
              <app-icon name="grp-black" custom-class="!size-11" />

              <div class="flex flex-col space-y-[2px]">
                <app-normal-text class="font-[500] !text-left !text-sm"
                  >{{ transaction.title }}
                </app-normal-text>
                <app-normal-text
                  class="!text-left text-gray-two !font-light !text-[12px]"
                  >{{ transaction.date }}</app-normal-text
                >
              </div>
            </div>

            <div class="flex flex-row space-x-2 justify-end">
              <app-normal-text class="font-[500] !text-right !text-sm">
                {{ transaction.type == "debit" ? "-" : "+" }}
                {{ transaction.amount }}</app-normal-text
              >
            </div>
          </div>
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
    AppSelect,
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
      const selectedDate = ref("")
      const dateHistory = [
        { key: "bills", value: "Paying Bills" },
        { key: "gift", value: "Sending as a Gift" },
        { key: "business", value: "Business Transaction" },
        { key: "personal", value: "Personal Use" },
      ]

      const transactionHistory = [
        {
          title: "Earned",
          date: "Today",
          type: "credit",
          amount: 1000,
        },
        {
          title: "Redeemed",
          date: "Yesterday",
          type: "debit",
          amount: 500,
        },
        {
          title: "Earned",
          date: "2 days ago",
          type: "credit",
          amount: 2000,
        },
        {
          title: "Redeemed",
          date: "3 days ago",
          type: "debit",
          amount: 1000,
        },
        {
          title: "Earned",
          date: "4 days ago",
          type: "credit",
          amount: 1500,
        },
        {
          title: "Earned",
          date: "Today",
          type: "credit",
          amount: 1000,
        },
        {
          title: "Redeemed",
          date: "Yesterday",
          type: "debit",
          amount: 500,
        },
        {
          title: "Earned",
          date: "2 days ago",
          type: "credit",
          amount: 2000,
        },
        {
          title: "Redeemed",
          date: "3 days ago",
          type: "debit",
          amount: 1000,
        },
        {
          title: "Earned",
          date: "4 days ago",
          type: "credit",
          amount: 1500,
        },
        {
          title: "Earned",
          date: "Today",
          type: "credit",
          amount: 1000,
        },
        {
          title: "Redeemed",
          date: "Yesterday",
          type: "debit",
          amount: 500,
        },
        {
          title: "Earned",
          date: "2 days ago",
          type: "credit",
          amount: 2000,
        },
        {
          title: "Redeemed",
          date: "3 days ago",
          type: "debit",
          amount: 1000,
        },
        {
          title: "Earned",
          date: "4 days ago",
          type: "credit",
          amount: 1500,
        },
        {
          title: "Earned",
          date: "Today",
          type: "credit",
          amount: 1000,
        },
        {
          title: "Redeemed",
          date: "Yesterday",
          type: "debit",
          amount: 500,
        },
        {
          title: "Earned",
          date: "2 days ago",
          type: "credit",
          amount: 2000,
        },
        {
          title: "Redeemed",
          date: "3 days ago",
          type: "debit",
          amount: 1000,
        },
        {
          title: "Earned",
          date: "4 days ago",
          type: "credit",
          amount: 1500,
        },
      ]

      const filterSetup = reactive({
        from: "",
        to: "",
        period: "",
      })
      const currentOptionName = ref("January, 2025")

      const monthFilterOption = [
        {
          value: "January, 2025",
          key: "january_2025",
        },
        {
          value: "February, 2025",
          key: "february_2025",
        },
        {
          value: "March, 2025",
          key: "march_2025",
        },
        {
          value: "April, 2025",
          key: "april_2025",
        },
        {
          value: "May, 2025",
          key: "may_2025",
        },
        {
          value: "June, 2025",
          key: "june_2025",
        },
        {
          value: "July, 2025",
          key: "july_2025",
        },
        {
          value: "August, 2025",
          key: "august_2025",
        },
        {
          value: "September, 2025",
          key: "september_2025",
        },
        {
          value: "October, 2025",
          key: "october_2025",
        },
        {
          value: "November, 2025",
          key: "november_2025",
        },
        {
          value: "December, 2025",
          key: "december_2025",
        },
      ]

      return {
        Logic,
        transactionHistory,
        amount,
        dateHistory,
        selectedDate,
        currentOptionName,
        filterSetup,
        monthFilterOption,
      }
    },
  })
</script>
