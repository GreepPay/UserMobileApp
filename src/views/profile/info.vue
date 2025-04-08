<template>
  <app-wrapper>
    <subpage-layout title="Personal Info">
      <div class="p-4 space-y-4">
        <div
          class="relative mx-auto flex items-center justify-center space-x-2 h-[96px] w-[120px]"
        >
          <app-image-loader
            :photo-url="
              AuthUser?.profile?.profile_picture || '/images/profile-image.svg'
            "
            custom-class="!h-24 !w-24"
          />
        </div>

        <div class="pt-4">
          <app-details :details="userDetails" />
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { ref } from "vue"
  import { defineComponent, computed, onMounted } from "vue"
  import { AppDetails, AppImageLoader } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "ProfilePersonalInfo",
    components: {
      AppDetails,
      AppImageLoader,
    },
    setup() {
      const AuthUser = ref(Logic.Auth.AuthUser)

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
        ]
      })

      onMounted(() => {
        Logic.Auth.watchProperty("AuthUser", AuthUser)
      })

      return {
        Logic,
        userDetails,
        AuthUser,
      }
    },
  })
</script>
