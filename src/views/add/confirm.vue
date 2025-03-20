<template>
  <app-wrapper>
    <subpage-layout title="Confirm Details">
      <div class="w-full flex flex-col items-center p-5 pt-2 space-y-4 h-full">
        <app-title-card-container custom-class="!rounded-2xl">
          <div class="w-full flex flex-col">
            <app-normal-text class="!text-white !font-normal">
              You Get
            </app-normal-text>
            <app-header-text class="!text-white !text-xl pt-1">
              ₺
              {{ Logic.Common.convertToMoney(10000, false, "", false) }}
            </app-header-text>
          </div>
        </app-title-card-container>

        <app-details :details="getDetails()" />
      </div>

      <!-- Bottom button -->
      <div
        class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
        style="
          padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
        "
      >
        <div class="w-full flex flex-col">
          <app-button @click="continueToNext" class="!bg-secondary !py-4">
            Next
          </app-button>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue"
  import {
    AppNormalText,
    AppTitleCardContainer,
    AppHeaderText,
    AppButton,
    AppDetails,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "ConfirmAddMoneyPage",
    components: {
      AppNormalText,
      AppHeaderText,
      AppTitleCardContainer,
      AppButton,
      AppDetails,
    },
    setup() {
      const paymentMethod = ref("bank_transfer")
      const paymentDetails = [
        { title: "Deposit Amount", content: "$ 1600.00" },
        { title: "Fee", content: "$ 100.00" },
      ]
      const bankDetails = reactive([
        {
          title: "Name",
          content: "Toyin Script",
        },
        {
          title: "Mobile Number",
          content: "+234 813 306 6201",
        },
        {
          title: "Provider",
          content: "MTN",
        },
        {
          title: "Deposit Amount",
          content: "$ 100.00",
        },
        {
          title: "Fee",
          content: "$ 5.00",
        },
      ])

      const getDetails = () => {
        if (paymentMethod.value === "bank_transfer") return bankDetails
        else paymentDetails
      }

      const continueToNext = () => {
        Logic.Common.GoToRoute("/add/pay")
      }

      return {
        Logic,
        getDetails,
        continueToNext,
      }
    },
  })
</script>
