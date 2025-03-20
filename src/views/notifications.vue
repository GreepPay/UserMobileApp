<template>
  <app-wrapper>
    <subpage-layout title="Notifications">
      <div class="w-full flex flex-col items-center justify-start">
        <div class="w-full p-6">
          <app-button custom-class="w-full  !h-14" outlined>
            Mark all as Read
          </app-button>
        </div>

        <!-- Notifications -->
        <div class="w-full flex flex-col space-y-3">
          <app-notifications :notifications="notifications" />
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue"
  import {
    AppImageLoader,
    AppNormalText,
    AppHeaderText,
    AppButton,
    AppNotifications,
    AppIcon,
    AppTitleCardContainer,
    AppModal,
    HorizontalUserList,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  enum TransactionType {
    Success = "success",
    Failed = "failed",
    Info = "info",
  }

  export default defineComponent({
    name: "NotificationsPage",
    components: {
      AppImageLoader,
      AppNormalText,
      AppHeaderText,
      AppButton,
      AppNotifications,
      AppIcon,
      AppModal,
      AppTitleCardContainer,
      HorizontalUserList,
    },
    setup() {
      const amount = ref("1000")
      const showWelcomeModal = ref(true)

      const notifications = [
        {
          id: 1,
          title: "Timms Milestone",
          description: "₺200   .   Pay noew",
          type: "failed",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "info",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "success",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "failed",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "failed",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "info",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "success",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "failed",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "failed",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "info",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "success",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "failed",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "failed",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "info",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "success",
          date: "Today",
        },
        {
          id: 1,
          title: "Timms Milestone",
          description:
            "Congratulations! You have earned 1000 GRP Tokens. Redeem now!",
          type: "failed",
          date: "Today",
        },
      ]

      return {
        showWelcomeModal,
        notifications,

        Logic,
        amount,
      }
    },
  })
</script>

<style scoped>
  /* Hide scrollbar but allow horizontal scrolling */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
