<template>
  <app-wrapper>
    <subpage-layout title="GRP Converter">
      <div class="w-full flex flex-col items-center p-5 space-y-4 h-full">
        <app-title-card-container>
          <div class="flex items-center justify-between space-x-4 px-4">
            <app-normal-text
              custom-class="!text-white !font-normal !text-lg text-center"
            >
              Balance
            </app-normal-text>

            <div class="flex items-center space-x-2">
              <app-header-text custom-class="!text-white !text-xl  text-center">
                1000
              </app-header-text>

              <app-icon name="grp-green-and-white" />
            </div>
          </div>
        </app-title-card-container>

        <!-- converter -->
        <div class="w-full relative">
          <div
            class="w-full flex items-center border border-light-gray-two rounded-t-[32px] p-6"
          >
            <app-icon name="grp-white-and-black" custom-class="size-8" />

            <app-normal-text
              custom-class="!text-veryLightGray font-medium  flex-1  !text-lg text-right  "
            >
              ₦ 14 = 1 GRP
            </app-normal-text>
          </div>

          <!-- converter icon -->
          <span class="absolute bg-white top-1/2 left-8 -mt-3">
            <app-icon name="linear-arrow-3" custom-class="h-6" />
          </span>

          <div
            class="w-full flex items-center border border-light-gray-two rounded-b-[32px] p-6"
          >
            <app-icon name="flags/ngn" custom-class="size-8" />

            <app-normal-text
              custom-class="!text-veryLightGray font-medium  flex-1  !text-lg text-right  "
            >
              ₦ 14 = 1 GRP
            </app-normal-text>
          </div>
        </div>

        <!-- Rate -->
        <div
          class="flex w-full items-center justify-between rounded-full space-x-4 py-5 px-6 bg-light-gray-one"
        >
          <app-normal-text
            custom-class="!text-veryLightGray   !text-lg text-center"
          >
            Rate
          </app-normal-text>

          <app-normal-text
            custom-class="!text-veryLightGray font-medium  flex-1  !text-lg text-center"
          >
            ₦ 14 = 1 GRP
          </app-normal-text>
        </div>

        <!-- Button -->

        <app-button :custom-class="`!bg-secondary !w-full !py-4  !px-8`">
          Redeem
        </app-button>
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
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WalletRedeemTokenConvert",
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
