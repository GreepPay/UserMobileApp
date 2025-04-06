<template>
  <app-wrapper>
    <subpage-layout :title="pageTitle" :hideBackBtn="hideBackBtn">
      <div
        class="w-full flex flex-col items-center justify-start px-5 h-full space-y-3"
      >
        <!-- Confirmation details starts -->
        <template v-if="currentPageContent == 'confirmation_info'">
          <app-title-card-container custom-class="!rounded-2xl">
            <div class="w-full flex flex-col">
              <app-normal-text class="!text-white !font-normal">
                To Be Sent
              </app-normal-text>
              <app-header-text class="!text-white !text-xl pt-1">
                ₺
                {{ Logic.Common.convertToMoney(10000, false, "", false) }}
              </app-header-text>
            </div>
          </app-title-card-container>

          <app-details :details="confirmationDetails" />
        </template>
        <!-- Confirmation details end -->

        <!-- Processing -->
        <template v-if="currentPageContent == 'processing'">
          <app-title-card-container custom-class="!rounded-2xl">
            <div class="w-full flex flex-col">
              <app-normal-text class="!text-white !font-normal">
                Amount
              </app-normal-text>
              <app-header-text class="!text-white !text-xl pt-1">
                ₺
                {{ Logic.Common.convertToMoney(10000, false, "", false) }}
              </app-header-text>
            </div>
          </app-title-card-container>

          <div
            class="w-full flex flex-col space-y-2 items-center justify-center pt-3"
          >
            <app-normal-text class="text-center !font-medium !text-lg">
              Your payment is on the way!
            </app-normal-text>

            <div
              class="px-2 py-2 rounded-full bg-primary flex flex-row items-center space-x-1 mb-2"
            >
              <app-icon name="bold-tick-white-circle" custom-class="size-7" />

              <app-normal-text class="text-center !text-white !text-sm pr-2">
                Sent
              </app-normal-text>
            </div>

            <div class="h-[75px] w-[7px] rounded-[6px] bg-[#F0F3F6]"></div>

            <div
              class="px-2 py-2 rounded-full bg-transparent border-[1.5px] border-[#E0E2E4] flex flex-row items-center space-x-1 mb-2"
            >
              <app-icon name="linear-more-circle" custom-class="size-7" />
              <app-normal-text
                class="text-center !text-veryLightGray !text-sm pr-2"
              >
                Deposited
              </app-normal-text>
            </div>
          </div>
        </template>
      </div>

      <!-- Bottom button -->
      <div
        class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4 flex flex-col space-y-3"
        style="
          padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
        "
      >
        <div
          class="w-full flex flex-col"
          v-if="currentPageContent === 'processing'"
        >
          <app-countdown-timer custom-class="!py-5" :duration="100" />
        </div>
        <div class="w-full flex flex-col">
          <app-button
            variant="secondary"
            :class="`!py-4`"
            @click="continueToNext"
          >
            {{ mainButtonLabel }}
          </app-button>
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
    AppDetails,
    AppHeaderText,
    AppIcon,
    AppTitleCardContainer,
    AppCountdownTimer,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { reactive } from "vue"
  import { ref } from "vue"

  export default defineComponent({
    name: "ConfirmSendMoneyPage",
    components: {
      AppButton,
      AppNormalText,
      AppDetails,
      AppHeaderText,
      AppIcon,
      AppTitleCardContainer,
      AppCountdownTimer,
    },
    setup() {
      const hideBackBtn = ref(false)

      const currentPageContent = ref("confirmation_info")
      const mainButtonLabel = ref("Confirm")
      const pageTitle = ref("Confirm Details")

      const confirmationDetails = reactive([
        {
          title: "Merchant",
          content: "Timms Closet Ventures",
        },
        {
          title: "Transfer Amount",
          content: "₦ 33,500",
        },
        {
          title: "Fee",
          content: "₦ 500",
        },
      ])

      const continueToNext = () => {
        if (currentPageContent.value === "confirmation_info") {
          currentPageContent.value = "processing"
          pageTitle.value = "Processing"
          mainButtonLabel.value = "Home"
          hideBackBtn.value = true
        } else {
          currentPageContent.value = "confirmation_info"
          mainButtonLabel.value = "Confirm"
          pageTitle.value = "Confirm Details"
          hideBackBtn.value = false
        }
      }

      return {
        Logic,
        continueToNext,
        confirmationDetails,
        hideBackBtn,
        currentPageContent,
        mainButtonLabel,
        pageTitle,
      }
    },
  })
</script>
