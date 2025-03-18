<template>
  <app-wrapper>
    <subpage-layout title="Profile">
      <div class="py-4 px-5">
        <app-title-card-container>
          <div class="flex items-center space-x-2 -mt-4">
            <app-avatar
              src="/images/temps/profile-1.png"
              alt="Raymond"
              :size="88"
            />

            <div class="h-fit space-y-2">
              <app-header-text class="!text-white"
                >Raymond Akinola</app-header-text
              >

              <div
                class="flex items-center p-1.5 pr-3 bg-[#0A141E59] rounded-full w-fit"
              >
                <app-icon
                  name="grp-green-and-white"
                  custom-class="size-6 mx-auto"
                />
                <app-header-text class="!text-white !text-lg px-2">
                  1000
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
          <app-header-text custom-class="flex-1 font-medium  !text-lg  ">
            {{ item.title }}
          </app-header-text>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { ref, reactive } from "vue"
  import { defineComponent } from "vue"
  import {
    BeneficiaryList,
    AppSearch,
    AppTitleCardContainer,
    AppNormalText,
    AppHeaderText,
    AppTransaction,
    AppButton,
    AppIcon,
    AppAvatar,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WalletProfilePage",
    components: {
      BeneficiaryList,
      AppSearch,
      AppTitleCardContainer,
      AppNormalText,
      AppHeaderText,
      AppTransaction,
      AppButton,
      AppIcon,
      AppAvatar,
    },
    setup() {
      const amount = ref("1000")
      const profileSettings = reactive<
        {
          title: string
          route: string
          icon: string
        }[]
      >([
        {
          title: "Personal Info",
          route: "personal-info",
          icon: "linear-user",
        },
        {
          title: "Default Currency",
          route: "default-currency",
          icon: " linear-money-3",
        },
        {
          title: "Login Settings",
          route: "login-settings",
          icon: "linear-security-shield",
        },
      ])

      return {
        Logic,
        profileSettings,
        amount,
      }
    },
  })
</script>
