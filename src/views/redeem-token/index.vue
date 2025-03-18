<template>
  <app-wrapper>
    <subpage-layout title="GRP Tokens">
      <div class="w-full flex flex-col items-center p-5 space-y-3 h-full">
        <!-- Balance card section -->
        <app-title-card-container custom-class="rounded-[40px]">
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
                {{
                  !Number.isNaN(parseFloat(amount))
                    ? Logic.Common.convertToMoney(1000, false, "", false)
                    : "0"
                }}
              </app-header-text>
            </div>

            <app-button
              :custom-class="`!bg-white !text-darkGreen !w-full !py-4  !px-8`"
              variant="primary"
              @click="Logic.Common.GoToRoute(`/redeem-token/convert`)"
            >
              Redeem
            </app-button>
          </div>
        </app-title-card-container>

        <div class="w-full flex flex-col space-y-2 pt-2">
          <div class="w-full flex justify-between items-center">
            <app-header-text class="!text-left"> History </app-header-text>
            <app-normal-text
              class="text-primary text-right"
              @click="Logic.Common.GoToRoute(`/redeem-token/history`)"
            >
              See all
            </app-normal-text>
          </div>

          <div class="w-full flex flex-col space-y-3">
            <app-transaction
              :data="item"
              v-for="(item, index) in transactions"
              :key="index"
              :show-type="false"
            />
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
    AppTransaction,
    AppButton,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WalletRedeemGRPToken",
    components: {
      BeneficiaryList,
      AppSearch,
      AppTitleCardContainer,
      AppNormalText,
      AppHeaderText,
      AppTransaction,
      AppButton,
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
