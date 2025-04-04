<template>
  <app-wrapper>
    <subpage-layout title="Profile">
      <div class="p-4">
        <app-title-card-container>
          <div class="flex items-center space-x-2 -mt-4">
            <app-avatar
              :src="
                AuthUser?.profile?.profile_picture ||
                '/images/profile-image.svg'
              "
              alt="Raymond"
              :size="88"
            />

            <app-image-loader
              :photo-url="
                AuthUser?.profile?.profile_picture ||
                '/images/profile-image.svg'
              "
              custom-class="!h-[88px] !w-[88px]"
            />

            <div class="h-fit space-y-2">
              <app-header-text class="!text-white">
                {{ AuthUser.first_name }} {{ AuthUser.last_name }}
              </app-header-text>

              <div
                class="flex items-center p-1.5 pr-3 bg-[#0A141E59] rounded-full w-fit"
                @click="Logic.Common.GoToRoute('/grp')"
              >
                <app-icon
                  name="grp-green-and-white"
                  custom-class="size-6 mx-auto"
                />
                <app-header-text class="!text-white !text-lg px-2">
                  {{
                    Logic.Common.convertToMoney(
                      AuthUser.wallet?.point_balance,
                      true,
                      ""
                    )
                  }}
                </app-header-text>

                <app-icon name="white-arrow-right" />
              </div>
            </div>
          </div>
        </app-title-card-container>
      </div>

      <!--  -->
      <div class="flex-col">
        <div
          class="flex items-center space-x-4 py-6 px-8 border-b"
          v-for="item in profileSettings"
          :key="item.route"
          @click="Logic.Common.GoToRoute(`/profile/${item.route}`)"
        >
          <app-icon :name="item.icon" custom-class="size-6" />
          <app-normal-text custom-class="flex-1 !font-medium  !text-lg ">
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
          variant="danger"
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
    AppHeaderText,
    AppButton,
    AppIcon,
    AppAvatar,
  } from "@greep/ui-components"
  import { User } from "@greep/logic/src/gql/graphql"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WalletProfilePage",
    components: {
      AppTitleCardContainer,
      AppNormalText,
      AppHeaderText,
      AppButton,
      AppIcon,
      AppAvatar,
    },
    setup() {
      const amount = ref("1000")
      const AuthUser = ref<User>(Logic.Auth.AuthUser)

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
