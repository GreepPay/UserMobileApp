<template>
  <app-wrapper>
    <subpage-layout title="Withdraw to Bank">
      <div class="w-full flex flex-col items-center p-5 pt-8 space-y-8 h-full">
        <AppTitleCardContainer>
          <div class="p-0">
            <div
              class="w-full flex flex-col items-center justify-center space-y-2"
            >
              <app-normal-text class="!text-white !font-normal text-center">
                Total Balance
              </app-normal-text>
              <app-header-text class="!text-3xl">
                ₺
                {{
                  !Number.isNaN(parseFloat(amount))
                    ? Logic.Common.convertToMoney(amount, false, "", false)
                    : "0"
                }}
              </app-header-text>
            </div>
          </div>
        </AppTitleCardContainer>

        <!-- keyboard -->
        <app-keyboard v-model="amount" />

        <div
          :class="`w-full flex flex-col items-center justify-center ${
            parseFloat(amount) > maximumAmount ? 'visible' : 'invisible'
          }`"
        >
          <app-normal-text class="!text-red-500">
            Maximum withdrawal amount is
            <span class="!font-semibold pl-1">
              ₺
              {{
                Logic.Common.convertToMoney(maximumAmount, false, "", false)
              }}</span
            >
          </app-normal-text>
        </div>
      </div>

      <!-- Bottom button -->
      <div
        class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
        style="
          padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
        "
      >
        <div class="w-full flex flex-col">
          <app-button
            :class="`!bg-secondary !py-4 ${
              amountIsValid() ? 'opacity-100' : 'opacity-50'
            }`"
            @click="amountIsValid() ? continueToNext() : null"
            >Next</app-button
          >
        </div>
      </div>
    </subpage-layout>

    <app-modal
      v-if="modalIsOpen"
      title="Choose Withdrawal Method"
      canClose
      :close="
        () => {
          modalIsOpen = false
        }
      "
    >
      <div class="w-full flex flex-col space-y-1 px-4 pb-4">
        <app-normal-text class="!text-left !text-gray-500">
          How do you want to receive your funds?
        </app-normal-text>
      </div>
    </app-modal>
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
    AppTitleCardContainer,
  } from "@greep/ui-components"
  import { ref } from "vue"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WalletsWithdrawPage",
    components: {
      AppHeaderText,
      AppButton,
      AppKeyboard,
      AppNormalText,
      AppModal,
      AppTitleCardContainer,
    },
    setup() {
      const amount = ref("0")
      const maximumAmount = 10000

      const modalIsOpen = ref(false)

      const amountIsValid = () => {
        return (
          parseFloat(amount.value) > 0 &&
          parseFloat(amount.value) <= maximumAmount
        )
      }

      const continueToNext = () => {
        // Implement the logic for choosing the withdrawal method and calling the next step.
      }

      return {
        amount,
        Logic,
        modalIsOpen,
        maximumAmount,
        continueToNext,
        amountIsValid,
      }
    },
  })
</script>
