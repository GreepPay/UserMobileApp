<template>
  <div class="w-full flex flex-col items-center p-5 space-y-4 h-full">
    <app-title-card-container custom-class="!rounded-2xl">
      <div class="w-full flex flex-col">
        <app-normal-text class="!text-white !font-normal text-center">
          You Pay
        </app-normal-text>
        <app-header-text class="!text-2xl text-white">
          ₺
          {{ Logic.Common.convertToMoney(10000, false, "", false) }}
        </app-header-text>
      </div>
    </app-title-card-container>

    <div
      class="text-center text-sm text-[#616161] font-normal p-4 rounded-lg bg-[#F0F3F6]"
    >
      Add money to your wallet using the following bank details
    </div>

    <div
      class="w-full flex flex-col px-4 rounded-xl border-[1.5px] border-[#F0F3F6]"
    >
      <div class="space-y-1 py-4">
        <app-normal-text class="!text-[#616161]">Bank Name</app-normal-text>
        <app-header-text class="!text-[#0A141E] !font-medium">
          Script Bank
        </app-header-text>
      </div>

      <p class="h-[1px] bg-[#F0F3F6]" />

      <div class="space-y-1 py-4">
        <app-normal-text class="!text-[#616161]">
          Account Name
        </app-normal-text>
        <app-header-text class="!text-[#0A141E] !font-medium">
          Dasa Script
        </app-header-text>
      </div>

      <p class="h-[1px] bg-[#F0F3F6]" />

      <div class="space-y-1 py-4">
        <app-normal-text class="!text-[#616161]">
          Reference Code
        </app-normal-text>
        <app-header-text class="!text-[#0A141E] !font-medium">
          09802323672
        </app-header-text>
      </div>
    </div>
  </div>

  <!-- Bottom button -->
  <div
    class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
    style="padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important"
  >
    <div class="w-full flex flex-col">
      <app-button @click="continueToNext" class="!bg-secondary !py-4">
        Next
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import {
    AppNormalText,
    AppTitleCardContainer,
    AppHeaderText,
    AppButton,
  } from "@greep/ui-components"
  import { ref } from "vue"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WalletPaymentMethod",
    components: {
      AppNormalText,
      AppTitleCardContainer,
      AppHeaderText,
      AppButton,
    },
    emits: ["next"],
    setup(_, { emit }) {
      const continueToNext = () => {
        emit("next")
      }

      return {
        Logic,
        continueToNext,
      }
    },
  })
</script>
