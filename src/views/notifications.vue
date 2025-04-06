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
import { defineComponent, ref } from "vue";
import { AppButton, AppNotifications } from "@greep/ui-components";
import { Logic } from "@greep/logic";

export default defineComponent({
  name: "NotificationsPage",
  components: {
    AppButton,
    AppNotifications,
  },
  setup() {
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
    ];

    return {
      notifications,
      Logic,
    };
  },
});
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
