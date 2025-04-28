<template>
  <app-wrapper>
    <subpage-layout title="Profile">
      <div class="px-4 pb-4">
        <app-image-loader
          class="w-full !bg-green justify-between py-3 px-4 rounded-[32px]"
          photo-url="/images/greep-transparent-logo.svg"
        >
          <div class="flex items-center space-x-2">
            <app-avatar
              :src="
                AuthUser?.profile?.profile_picture ||
                '/images/profile-image.svg'
              "
              class="!h-[84px] !w-[84px]"
            />

            <div class="h-fit">
              <app-normal-text
                class="!text-white font-semibold !text-left !text-base"
              >
                {{ AuthUser.first_name }}
                {{ AuthUser.last_name }}
              </app-normal-text>

              <div
                class="p-2 space-x-2 mt-2 items-center bg-[#0A141E]/35 flex flex-row rounded-full w-fit"
                @click="Logic.Common.GoToRoute('/grp')"
              >
                <div class="flex flex-row space-x-1 items-center">
                  <app-icon
                    name="grp-green-and-white"
                    custom-class="!h-[20px]"
                  />

                  <app-normal-text class="!text-white font-[500] !text-sm">{{
                    Logic.Common.convertToMoney(
                      AuthUser.wallet?.point_balance,
                      true,
                      ""
                    )
                  }}</app-normal-text>
                </div>

                <app-icon name="arrow-right-white" custom-class="!h-[20px]" />
              </div>
            </div>
          </div>
        </app-image-loader>
      </div>

      <!--  -->
      <div class="flex-col p-4">
        <div
          class="w-full px-3 flex flex-row space-x-4 mb-3 items-center py-2 pb-4 border-b-[1px] border-[#E0E2E4]"
          v-for="item in profileSettings"
          :key="item.route"
          @click="Logic.Common.GoToRoute(`/profile/${item.route}`)"
        >
          <app-icon :name="item.icon" custom-class="size-[22px]" />
          <app-normal-text custom-class="!text-black !text-sm">
            {{ item.title }}
          </app-normal-text>
        </div>
      </div>

      <!-- Bottom button -->
      <div
        class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
        style="
          padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
        "
      >
        <app-button
          custom-class="!w-full !py-4  !border-red !text-red !border-[1.5px] hover:!bg-red/20"
          :outlined="true"
          variant="secondary"
          @click="Logic.Auth.SignOut()"
        >
          Logout
        </app-button>
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
    AppAvatar,
    AppImageLoader,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WalletProfilePage",
    components: {
      AppTitleCardContainer,
      AppNormalText,
      AppButton,
      AppIcon,
      AppAvatar,
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
