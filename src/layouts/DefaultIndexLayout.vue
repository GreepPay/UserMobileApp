<template>
  <div
    class="w-full h-full flex flex-col pb-4 lg:text-sm mdlg:text-[12px] text-xs font-poppins"
    style="padding-top: calc(env(safe-area-inset-top) + 0px) !important"
  >
    <div class="w-full flex flex-col relative h-full overflow-y-auto">
      <!-- Top section -->
      <div
        class="w-full flex flex-row items-center justify-between py-4 bg-white px-4 sticky top-0 z-999"
      >
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

      <!-- Content -->
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { onMounted, defineComponent, ref } from "vue"
  import { AppHeaderText, AppIcon, AppAvatar } from "@greep/ui-components"
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
      const AuthUser = ref<User>(Logic.Auth.AuthUser)

      onMounted(() => {
        Logic.Auth.watchProperty("AuthUser", AuthUser)
      })

      return { Logic, AuthUser }
    },
  })
</script>
