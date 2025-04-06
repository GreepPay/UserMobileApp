<template>
  <app-wrapper>
    <subpage-layout title="Personal Info">
      <div class="p-4 space-y-4">
        <div
          class="relative mx-auto flex items-center justify-center space-x-2 h-[96px] w-[120px]"
        >
          <!-- <app-avatar
            src="/images/temps/profile-1.png"
            alt="Raymond"
            :size="96"
          />

          <div
            class="flex items-center border-[4px] border-white rounded-full justify-center absolute bottom-0 right-0 size-12 bg-black"
          >
            <app-icon name="linear-gallery" custom-class="size-6" />
          </div> -->

          <!-- <div class="w-full flex flex-row">
            <div
              :style="`background-image: url(${photoUrl});  background-size: cover;
                background-repeat: no-repeat;
                background-position: center;`"
              class="h-[90px] w-[90px] rounded-full flex flex-row items-center relative"
            >
              <app-file-attachment
                :is-wrapper="true"
                v-model="formDetails.photo"
                v-model:local-file-url="photoUrl"
                :accept="`image/png, image/gif, image/jpeg`"
                class="flex flex-row items-center justify-start !w-auto absolute bottom-[-10%] right-[-10%]"
              >
                <template v-slot:content>
                  <app-icon name="upload-image" custom-class="!h-[48px]" />
                </template>
              </app-file-attachment>
            </div>
          </div> -->
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
import { defineComponent, computed, onMounted } from "vue";
import {
  // AppAvatar,
  // AppIcon,
  AppDetails,
  // AppFileAttachment,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";

export default defineComponent({
  name: "ProfilePersonalInfo",
  components: {
    // AppAvatar,
    // AppIcon,
    AppDetails,
    // AppFileAttachment,
  },
  setup() {
    const AuthUser = ref(Logic.Auth.AuthUser);
    // const userDetails = [
    //   { title: "First & Last Name", content: "Raymond Ray" },
    //   { title: "Phone Number", content: "+234 802 222 4591" },
    //   { title: "Email Address", content: "draykintola@gmail.com" },
    //   { title: "State, Country", content: "Ibadan, Nigeria" },
    // ]

    //
    const userDetails = computed(() => {
      return [
        {
          title: "First & Last Name",
          content: `${AuthUser.value?.first_name} ${AuthUser.value?.last_name}`,
        },
        {
          title: "Email Address",
          content: AuthUser.value?.email || "",
        },
        {
          title: "State, Country",
          content: `${AuthUser.value?.profile?.customer?.city}, ${AuthUser.value?.profile?.customer?.country}`,
        },
      ];
    });

    onMounted(() => {
      Logic.Auth.watchProperty("AuthUser", AuthUser);
    });

    return {
      Logic,
      userDetails,
      AuthUser,
    };
  },
});
</script>
