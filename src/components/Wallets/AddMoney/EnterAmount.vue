<template>
  <div class="w-full flex flex-col items-center p-5 pt-8 space-y-8 h-full">
    <app-title-card-container>
      <div class="space-y-4 flex flex-col justify-center">
        <div class="flex items-center justify-center">
          <app-dropdown-select :options="dropdownOptions" :showTitle="false" />
        </div>

        <div class="w-full flex flex-col items-center justify-center">
          <app-normal-text class="!text-white !font-normal text-center">
            Amount
          </app-normal-text>

          <app-header-text class="!text-2xl text-white">
            ₺
            {{
              !Number.isNaN(parseFloat(amount))
                ? Logic.Common.convertToMoney(amount, false, "", false)
                : "0"
            }}
          </app-header-text>
        </div>
      </div>
    </app-title-card-container>

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
          {{ Logic.Common.convertToMoney(maximumAmount, false, "", false) }}
        </span>
      </app-normal-text>
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
          @click="continueToNext"
          :class="`!bg-secondary !py-4 ${
            amountIsValid() ? 'opacity-100' : 'opacity-50'
          }`"
        >
          Next
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
        if (amountIsValid()) {
          emit("next", parseFloat(amount.value))
        }
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

      return {
        amount,
        Logic,
        maximumAmount,
        dropdownOptions,
        continueToNext,
        amountIsValid,
      }
    },
  })
</script>
