<template>
  <app-wrapper>
    <default-index-layout title="Withdraw Funds">
      <div
        class="w-full flex flex-col items-center justify-center space-y-3 p-5 pt-8"
      >
        <app-title-card-container>
          <div class="p-0">
            <div class="w-full flex flex-col items-center justify-center">
              <app-normal-text class="!text-white !font-normal text-center">
                Total Balance
              </app-normal-text>
              <app-header-text class="!text-2xl text-white">
                ₺
                {{
                  !Number.isNaN(parseFloat(amount))
                    ? Logic.Common.convertToMoney(1000, false, "", false)
                    : "0"
                }}
              </app-header-text>
            </div>
          </div>
        </app-title-card-container>

        <!-- Transaction details -->
        <div class="w-full flex flex-col space-y-4 pt-2">
          <div class="w-full flex flex-row justify-between items-center">
            <app-normal-text class="!text-left font-semibold flex-1 !text-sm">
              Transactions
            </app-normal-text>

            <app-normal-text class="text-primary text-right">
              View all
            </app-normal-text>
          </div>

          <div class="w-full flex flex-col space-y-3">
            <app-transaction
              :data="item"
              v-for="(item, index) in transactions"
              :key="index"
              @click="Logic.Common.GoToRoute(`/wallets/add-money`)"
            />
          </div>
        </div>
      </div>
    </default-index-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import {
    AppHeaderText,
    AppButton,
    AppKeyboard,
    AppNormalText,
    AppModal,
    AppIcon,
    AppTransaction,
    AppTitleCardContainer,
  } from "@greep/ui-components"
  import { ref, reactive } from "vue"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WalletsPage",
    components: {
      AppHeaderText,
      AppButton,
      AppKeyboard,
      AppNormalText,
      AppModal,
      AppIcon,
      AppTransaction,
      AppTitleCardContainer,
    },
    setup() {
      const amount = ref("1000")

      const modalIsOpen = ref(false)

      const amountIsValid = () => {
        return parseFloat(amount.value) > 0 && parseFloat(amount.value) <= 6074
      }

      const continueToNext = () => {
        //   modalIsOpen.value = true;
      }

      const transactions = reactive<
        {
          type: "credit" | "debit"
          description: string
          icon: string
          amount: number
          day: string
          time: string
        }[]
      >([
        {
          type: "credit",
          description: "Payment from QR-Code | Josh",
          icon: "scan-type",
          amount: 70,
          day: "Today",
          time: "10:54 AM",
        },
        {
          type: "credit",
          description: "Payment from QR-Code | Lizzy",
          icon: "scan-type",
          amount: 95,
          day: "Today",
          time: "09:54 AM",
        },
        {
          type: "debit",
          description: "Raymond Akinola",
          icon: "send-type",
          amount: 230,
          day: "Today",
          time: "07:54 AM",
        },
        {
          type: "credit",
          description: "Payment from Transfer | Josh",
          icon: "tag-type",
          amount: 89,
          day: "Today",
          time: "06:54 AM",
        },
        {
          type: "credit",
          description: "Payment from QR-Code | Mica",
          icon: "scan-type",
          amount: 70,
          day: "Today",
          time: "05:54 AM",
        },
        {
          type: "credit",
          description: "Payment from Transfer | Lola",
          icon: "tag-type",
          amount: 100,
          day: "Today",
          time: "04:54 AM",
        },
        {
          type: "credit",
          description: "Payment from QR-Code | Josh",
          icon: "scan-type",
          amount: 70,
          day: "Today",
          time: "03:54 AM",
        },
      ])

      return {
        amount,
        Logic,
        modalIsOpen,
        transactions,
        continueToNext,
        amountIsValid,
      }
    },
  })
</script>
