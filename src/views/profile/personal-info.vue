<template>
  <app-wrapper>
    <subpage-layout title="Personal Info">
      <div class="p-4 space-y-4">
        <div
          class="relative mx-auto flex items-center justify-center space-x-2 h-[96px] w-[120px]"
        >
          <app-avatar
            src="/images/temps/profile-1.png"
            alt="Raymond"
            :size="96"
          />

          <div
            class="flex items-center border-[4px] border-white rounded-full justify-center absolute bottom-0 right-0 size-12 bg-black"
          >
            <app-icon name="linear-gallery" custom-class="size-6" />
          </div>
        </div>

        <div class="pt-4">
          <app-details :details="userDetails" />
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import { AppAvatar, AppIcon, AppDetails } from "@greep/ui-components";
import { Logic } from "@greep/logic";

export default defineComponent({
  name: "ProfilePersonalInfo",
  components: {
    AppAvatar,
    AppIcon,
    AppDetails,
  },
  setup() {
    const userDetails = [
      { title: "First & Last Name", content: "Raymond Ray" },
      { title: "Phone Number", content: "+234 802 222 4591" },
      { title: "Email Address", content: "draykintola@gmail.com" },
      { title: "State, Country", content: "Ibadan, Nigeria" },
    ];

    return {
      Logic,
      userDetails,
    };
  },
});
</script>
