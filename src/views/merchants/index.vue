<template>
  <app-wrapper>
    <subpage-layout title="Profile">
      <div class="p-4">
        <app-title-card-container>
          <div class="flex items-center space-x-2 -mt-4">
            <app-image-loader
              :photo-url="
                AuthUser?.profile?.profile_picture ||
                '/images/profile-image.svg'
              "
              custom-class="!h-[84px] !w-[84px]"
            />
          </div>
        </app-title-card-container>
      </div>

      <!-- Featured Merchant -->
      <div class="w-full flex flex-col px-4 border-y">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-gray-800 !text-sm">
            Featured
          </app-normal-text>

          <app-normal-text
            class="text-primary"
            @click="Logic.Common.GoToRoute('/merchants/featured')"
          >
            See all
          </app-normal-text>
        </div>

        <div class="py-2 border-y-2">
          <div v-if="true" class="py-4 !pt-2">
            <app-empty-state
              title="No Featured Merchant available"
              description="See all Featured Merchants"
            />
          </div>
          <template v-else> gfhjjkl </template>
        </div>
      </div>

      <!-- Boutiques Merchant -->
      <div class="w-full flex flex-col px-4 border-y">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-gray-800 !text-sm">
            Boutiques
          </app-normal-text>

          <app-normal-text
            class="text-primary"
            @click="Logic.Common.GoToRoute('/merchants/boutiques')"
          >
            See all
          </app-normal-text>
        </div>

        <div class="py-2 border-y-2">
          <div v-if="true" class="py-4 !pt-2">
            <app-empty-state
              title="No Boutiques Merchant available"
              description="See all Boutiques Merchants"
            />
          </div>
          <template v-else> tes </template>
        </div>
      </div>

      <!-- Featured Merchant -->
      <div class="w-full flex flex-col px-4 border-y">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-gray-800 !text-sm">
            Featured
          </app-normal-text>

          <app-normal-text
            class="text-primary"
            @click="Logic.Common.GoToRoute('/merchants/featured')"
          >
            See all
          </app-normal-text>
        </div>

        <div class="py-2 border-y-2">
          <div v-if="true" class="py-4 !pt-2">
            <app-empty-state
              title="No Featured Merchant available"
              description="See all Featured Merchants"
            />
          </div>
          <template v-else> gfhjjkl </template>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { ref, reactive, onMounted } from "vue"
  import { defineComponent } from "vue"
  import {
    AppTitleCardContainer,
    AppNormalText,
    AppButton,
    AppIcon,
    AppImageLoader,
    AppMerchant,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "MarketsPage",
    components: {
      AppTitleCardContainer,
      AppNormalText,
      AppButton,
      AppIcon,
      AppImageLoader,
    },
    setup() {
      const amount = ref("1000")
      const AuthUser = ref(Logic.Auth.AuthUser)

      const profileSettings = reactive<
        {
          title: string
          route: string
          icon: string
        }[]
      >([
        {
          title: "Personal Info",
          route: "info",
          icon: "linear-user",
        },
        {
          title: "Default Currency",
          route: "default-currency",
          icon: "linear-money",
        },
        {
          title: "Login Settings",
          route: "login-settings",
          icon: "linear-security-shield",
        },
      ])

      onMounted(() => {
        Logic.Auth.watchProperty("AuthUser", AuthUser)
      })

      return {
        Logic,
        profileSettings,
        amount,
        AuthUser,
      }
    },
  })
</script>
