<template>
  <app-wrapper>
    <subpage-layout title="GRP Tokens" :hasBottomButton="false">
      <div class="w-full flex flex-col justify-start px-4 h-full pt-1">
        <app-title-card-container custom-class="rounded-[40px] mb-6">
          <div class="space-y-6 px-4">
            <div
              class="w-full flex flex-col space-y-1 items-center justify-center"
            >
              <app-normal-text
                custom-class="!text-white !font-normal  text-center"
              >
                Total Balance
              </app-normal-text>

              <app-header-text custom-class="!text-3xl !leading-6 text-white">
                ₺
                {{ Logic.Common.convertToMoney(1000, false, "", false) }}
              </app-header-text>
            </div>

            <app-button
              :custom-class="`!bg-white !text-darkGreen !w-full !py-4  !px-8`"
              variant="primary"
              @click="Logic.Common.GoToRoute(`/grp/converter`)"
            >
              Redeem
            </app-button>
          </div>
        </app-title-card-container>

        <!-- Transaction history -->
        <div class="flex flex-col">
          <div class="w-full flex justify-between items-center pb-4 px-2">
            <app-header-text class="!text-left"> History </app-header-text>
            <app-normal-text
              class="text-primary !text-lg text-right"
              @click="Logic.Common.GoToRoute(`/grp/history`)"
            >
              See all
            </app-normal-text>
          </div>

          <div class="w-full flex flex-col">
            <div
              v-for="(transaction, index) in transactionHistory"
              :key="index"
              class="w-full flex flex-row justify-between mb-3 pb-3 border-b-[1px] border-veryLightGray"
            >
              <div class="flex flex-row space-x-2 items-center">
                <app-icon name="grp-black" custom-class="!size-11" />
                <div class="flex flex-col space-y-[2px]">
                  <app-normal-text class="font-[500] !text-left !text-sm">
                    {{ transaction.title }}
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
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import {
    AppButton,
    AppNormalText,
    AppHeaderText,
    AppIcon,
    AppTitleCardContainer,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { reactive } from "vue"

  export default defineComponent({
    name: "GRPTokenPage",
    components: {
      AppButton,
      AppHeaderText,
      AppNormalText,
      AppIcon,
      AppTitleCardContainer,
    },
    setup() {
      const transactionHistory = reactive([
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
      ])

      return {
        Logic,
        transactionHistory,
      }
    },
  })
</script>
