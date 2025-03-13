<template>
  <div class="w-full flex flex-col items-center p-5 space-y-5 h-full">
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

    <div class="flex flex-col items-center space-y-5 pt-1">
      <app-header-text class="!text-[#001726] !font-medium text-center">
        Your payment is on the way!
      </app-header-text>

      <div class="flex flex-col items-center space-y-3">
        <div
          class="flex space-x-2 p-3 pr-5 items-center justify-center rounded-3xl bg-[#10BB76]"
        >
          <app-icon class="!text-gray-400" name="bold-tick-white-circle" />
          <app-normal-text class="!text-white">Sent</app-normal-text>
        </div>

        <div class="h-20 w-2 bg-[#F0F3F6] rounded-lg"></div>

        <div
          class="flex space-x-2 p-3 pr-5 items-center justify-center rounded-3xl border border-[#999999]"
        >
          <app-icon name="linear-more-circle" />
          <app-normal-text class="!text-[#999999]">Deposited</app-normal-text>
        </div>
      </div>
    </div>

    <!-- Bottom button -->

    <div
      class="!w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
      style="
        padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
      "
    >
      <app-countdown-timer :duration="100" />

      <div class="w-full bg-white dark:bg-black pt-4">
        <app-button
          :class="`!bg-secondary !w-full !py-4  !px-8`"
          @click="continueToNext"
        >
          Home
        </app-button>
      </div>
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
    AppCountdownTimer,
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
      AppCountdownTimer,
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

      const dropdownOptions = [
        { title: "Home", icon: "images/temps/profile-1.png", value: "home" },
        {
          title: "Profile",
          icon: "images/temps/profile-1.png",
          value: "profile",
        },
        {
          title: "Settings",
          icon: "images/temps/profile-1.png",
          value: "settings",
        },
      ]

      // const amount = ref("0")
      const handleNext = () => {
        if (amountIsValid()) {
          emit("next", parseFloat(amount.value))
        }
      }
      return {
        amount,
        Logic,
        maximumAmount,
        dropdownOptions,
        continueToNext,
        amountIsValid,
        handleNext,
      }
    },
  })
</script>
