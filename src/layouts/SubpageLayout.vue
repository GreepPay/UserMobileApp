<template>
  <div
    class="w-full flex flex-col lg:text-sm mdlg:text-[12px] relative h-full text-xs !overflow-y-auto font-poppins"
    style="padding-top: calc(env(safe-area-inset-top) + 0px) !important"
  >
    <div class="w-full flex flex-col relative h-full overflow-y-auto">
      <!-- Top section -->
      <div
        class="w-full flex flex-row items-center py-4 bg-white px-4 sticky top-0 z-10"
        :class="hideBackBtn ? ' justify-center ' : ' justify-between '"
      >
        <div class="flex justify-start" v-if="!hideBackBtn">
          <app-icon
            name="arrow-left"
            :customClass="'h-[22px]'"
            @click="handleBack"
          />
        </div>

        <div class="flex justify-center flex-1">
          <app-header-text custom-class="">
            {{ title }}
          </app-header-text>
        </div>

        <slot name="icon-action" />
      </div>

      <!-- Content -->
      <slot />

      <!--  -->
      <div
        v-if="showFooter"
        class="w-full flex flex-row items-center justify-between bg-white sticky bottom-0 p-4 z-999"
      >
        <div class="grid grid-cols-5 gap-4 items-center justify-center w-full">
          <app-button
            class="!col-span-3 !py-4 border-secondary"
            variant="secondary"
          >
            Send Money
          </app-button>

          <app-button
            class="!col-span-2 !py-4 font-semibold !text-center"
            variant="secondary"
            outlined
          >
            Message
          </app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { AppHeaderText, AppIcon, AppButton } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    components: {
      AppHeaderText,
      AppIcon,
      AppButton,
    },
    props: {
      title: {
        type: String,
        default: "",
      },
      showCurrencySwitch: {
        type: Boolean,
        default: false,
      },
      currencySwitchAction: {
        type: Function,
        required: false,
      },
      useEmitBack: {
        type: Boolean, // If true, emits "back" instead of using goBack
        default: false,
      },

      hideBackBtn: {
        type: Boolean,
        default: false,
      },

      showFooter: {
        type: Boolean,
        default: false,
      },
    },
    name: "SubPageLayout",
    emits: ["back"],
    setup(props, { emit }) {
      const router = useRouter()
      const route = useRoute()

      const goToRoute = (route: string) => {
        router.push(route)
      }

      const ignoreBackRoute = route.query.ignoreBackRoute
        ? route.query.ignoreBackRoute.toString()
        : null

      const goBack = () => {
        const routeMiddlewares: any = route.meta.middlewares
        const goBackRoute = routeMiddlewares?.goBackRoute
        if (typeof goBackRoute == "function" && !ignoreBackRoute) {
          goToRoute(goBackRoute())
        } else if (typeof goBackRoute == "string" && !ignoreBackRoute) {
          goToRoute(goBackRoute)
        } else {
          window.history.length > 1 ? router.go(-1) : router.push("/")
        }
      }

      const handleBack = () => {
        if (props.useEmitBack) emit("back")
        else goBack()
      }

      return {
        handleBack,
        goToRoute,
        Logic,
      }
    },
  })
</script>
