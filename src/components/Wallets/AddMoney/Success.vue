<template>
  <div
    class="w-full flex flex-col items-center justify-center p-5 space-y-4 h-full"
  >
    <div class="space-y-4 py-4 flex flex-col justify-center items-center">
      <app-icon name="success-check" custom-class="h-12" />

      <app-header-text
        clas="font-semibold items-center text-[#0A141E]   text-[lg]"
      >
        Deposit Successful
      </app-header-text>
    </div>

    <app-title-card-container custom-class="!rounded-[30px]">
      <div class="w-full flex justify-center items-center flex-col">
        <app-normal-text class="!text-white !font-normal text-center">
          Amount
        </app-normal-text>
        <app-header-text class="!text-2xl text-white">
          ₺
          {{ Logic.Common.convertToMoney(10000, false, "", false) }}
        </app-header-text>
      </div>
    </app-title-card-container>

    <!-- Bottom button -->
    <div class="w-fit bg-white dark:bg-black pt-4">
      <app-button :class="`!bg-secondary !py-4  !px-8`" @click="continueToNext">
        Done
      </app-button>
    </div>
  </div>
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
    AppAvatar,
    AppDropdownSelect,
    AppIcon,
  } from "@greep/ui-components"
  import { ref } from "vue"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WalletAddMoneyPage",
    components: {
      AppHeaderText,
      AppButton,
      AppKeyboard,
      AppNormalText,
      AppModal,
      AppTitleCardContainer,
      AppAvatar,
      AppDropdownSelect,
      AppIcon,
    },
    emits: ["next"],
    setup(_, { emit }) {
      const amount = ref("0")
      const maximumAmount = 10000

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
        maximumAmount,
        continueToNext,
        amountIsValid,
      }
    },
  })
</script>
