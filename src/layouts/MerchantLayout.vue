<template>
  <div
    class="w-full h-full flex flex-col pb-4 lg:text-sm mdlg:text-[12px] text-xs font-poppins"
    style="
      padding-top: calc(env(safe-area-inset-top) + 0px) !important;
      padding-bottom: calc(env(safe-area-inset-bottom) + 0px) !important;
    "
  >
    <div class="w-full flex flex-col relative h-full">
      <!-- Top section -->
      <app-image-loader
        class="w-full !bg-green justify-between py-4 bg-white px-4 sticky top-0 z-10 rounded-b-[24px]"
        photo-url="/images/greep-transparent-logo.svg"
      >
        <div class="flex justify-between items-center">
          <app-avatar
            :src="'/images/temps/profile-1.png'"
            custom-class="h-[31px] w-[31px] rounded-full"
          />

          <app-header-text class="!text-white">
            {{ title }}
          </app-header-text>

          <app-icon name="white-circle-bell" custom-class="h-7" />
        </div>

        <!-- title  content -->
        <slot name="title-content" />
      </app-image-loader>

      <!-- Content -->
      <slot />

      <!--  -->
      <div
        class="w-full flex flex-row items-center justify-between bg-white sticky bottom-0 z-999"
      >
        <div
          v-for="(menuTab, index) in menuTabs"
          :key="index"
          class="flex flex-col items-center flex-1 py-3"
          :class="
            getActiveTab(menuTab.route) && ' !border-t-[2px] !border-green '
          "
          @click="Logic.Common.GoToRoute(menuTab.route)"
        >
          <app-icon
            :name="
              getActiveTab(menuTab.route)
                ? `${menuTab.icon}-active`
                : `${menuTab.icon}`
            "
            custom-class="h-6"
          />
          <app-normal-text
            :custom-class="`!pt-1 !font-semibold ${
              getActiveTab(menuTab.route)
                ? `!text-green`
                : ` !text-veryLightGray`
            }`"
          >
            {{ menuTab.title }}
          </app-normal-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { useRoute } from "vue-router"
  import {
    AppImageLoader,
    AppAvatar,
    AppIcon,
    AppHeaderText,
    AppNormalText,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    components: {
      AppImageLoader,
      AppAvatar,
      AppIcon,
      AppHeaderText,
      AppNormalText,
    },
    props: {
      title: {
        type: String,
        default: "",
      },
    },
    name: "MerchantLayout",
    setup() {
      const route = useRoute()
      const menuTabs = [
        { title: "Home", icon: "home-2", route: "/" },
        { title: "Merchants", icon: "shop", route: "/merchants" },
      ]

      const getActiveTab = (tabRoute: string) => {
        if (tabRoute === "/") return route.path === "/"
        return route.fullPath.includes(tabRoute)
      }

      return { Logic, menuTabs, getActiveTab }
    },
  })
</script>
