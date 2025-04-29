<template>
  <div
    class="w-full h-full flex flex-col lg:text-sm mdlg:text-[12px] text-xs font-poppins"
    style="padding-top: calc(env(safe-area-inset-top) + 0px) !important"
  >
    <div class="w-full flex flex-col relative h-full overflow-y-auto pb-16">
      <!-- Top section -->
      <div class="w-full bg-white px-4 sticky top-0 z-999">
        <div class="w-full flex flex-row items-center justify-between py-4">
          <app-avatar
            :src="
              AuthUser?.profile?.profile_picture || '/images/profile-image.svg'
            "
            :alt="`${AuthUser.first_name} ${AuthUser.last_name}`"
            :size="40"
            @click="Logic.Common.GoToRoute(`/profile`)"
          />

          <app-header-text class="!text-left">
            {{ title }}
          </app-header-text>

          <div
            class="border h-9 w-9 rounded-full flex justify-center items-center border-black"
            @click="Logic.Common.GoToRoute(`/notifications`)"
          >
            <app-icon name="bell" custom-class="h-6" />
          </div>
        </div>

        <!-- title  content -->
        <slot name="title-content" />
      </div>

      <!-- Content -->
      <slot />
    </div>

    <!--  -->
    <div
      class="w-full flex flex-row items-center justify-between bg-white fixed bottom-0 z-999"
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
              : `${menuTab.icon}-inactive`
          "
          custom-class="h-5"
        />
        <app-normal-text
          :custom-class="`!pt-1 !font-semibold ${
            getActiveTab(menuTab.route) ? `!text-green` : ` !text-veryLightGray`
          }`"
        >
          {{ menuTab.title }}
        </app-normal-text>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { onMounted, defineComponent, ref } from "vue"
  import { AppHeaderText, AppIcon, AppAvatar } from "@greep/ui-components"
  import { useRoute } from "vue-router"
  import { User } from "@greep/logic/src/gql/graphql"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    components: {
      AppHeaderText,
      AppIcon,
      AppAvatar,
    },
    props: {
      title: {
        type: String,
        default: "",
      },
      useTopPadding: {
        type: Boolean,
        default: false,
      },
    },
    name: "DefaultIndexLayout",

    setup() {
      const route = useRoute()
      const AuthUser = ref<User>(Logic.Auth.AuthUser)
      const menuTabs = [
        { title: "Home", icon: "home-2", route: "/" },
        { title: "Merchants", icon: "shop", route: "/merchants" },
      ]

      const getActiveTab = (tabRoute: string) => {
        if (tabRoute === "/") return route.path === "/"
        return route.fullPath.includes(tabRoute)
      }

      onMounted(() => {
        Logic.Auth.watchProperty("AuthUser", AuthUser)
      })

      return { Logic, AuthUser, menuTabs, getActiveTab }
    },
  })
</script>
