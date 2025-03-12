<template>
  <div
    class="w-full h-full flex flex-col pb-4 lg:text-sm mdlg:text-[12px] text-xs font-poppins"
    style="
      padding-top: calc(env(safe-area-inset-top) + 0px) !important;
      padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
    "
  >
    <div class="w-full flex flex-col relative h-full overflow-y-auto">
      <!-- Top section -->
      <div
        class="w-full flex flex-row items-center justify-between py-4 bg-white px-4 sticky top-0 z-999"
      >
        <app-image-loader
          :photo-url="'/images/temps/profile-1.png'"
          custom-class="h-[31px] w-[31px] rounded-full"
        />

        <app-header-text class="!text-left">
          {{ title }}
        </app-header-text>

        <div
          class="border border-black rounded-full h-9 w-9 rounded-full flex justify-center items-center border-black"
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
  import { AppHeaderText, AppIcon, AppImageLoader } from "@greep/ui-components"
  import { ref, defineComponent } from "vue"

  export default defineComponent({
    components: {
      AppHeaderText,
      AppIcon,
      AppImageLoader,
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
      return {}
    },
  })
</script>
