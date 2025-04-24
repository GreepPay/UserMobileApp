<template>
  <template v-if="buildType == 'mobile'">
    <ion-page
      :registerIonPage="registerIonPage"
      id="ionPageApp"
      aria-hidden="true"
      :class="`${innerClassRef} h-full ${
        currentPlatform == 'ios' || currentPlatform == 'android' ? '!pt-6' : ''
      }`"
    >
      <ion-content
        :scroll-y="false"
        id="mainContent"
        :class="`${innerClassRef} h-full`"
      >
        <slot />
      </ion-content>
    </ion-page>
  </template>
  <template v-if="buildType == 'web'">
    <div :class="`w-full h-full ${innerClassRef} `" id="ionPageApp">
      <slot />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import { getPlatforms } from "@ionic/vue";
import { computed } from "vue";
import { onMounted } from "vue";
import { Logic } from "@greep/logic";
import { watch } from "vue";

export default defineComponent({
  props: {
    class: {
      type: String,
      default: "",
    },
    registerIonPage: {
      type: Function,
      default: () => {
        //
      },
    },
    innerClass: {
      type: String,
      default: "bg-white dark:bg-black",
    },
  },
  components: {
    IonContent,
    IonPage,
  },
  name: "AppWrapper",
  setup(props) {
    const innerClassRef = toRef(props, "innerClass");

    const buildType = "mobile";

    const currentPlatform = computed(() => {
      return getPlatforms()[0];
    });

    const forcePageTransparency = ref(false);

    onMounted(() => {
      document.body.classList.add("!bg-transparent");

      Logic.Common.watchProperty(
        "forcePageTransparency",
        forcePageTransparency
      );
    });

    const currentAppTheme = "light";

    watch(forcePageTransparency, (value) => {
      console.log("forcePageTransparency", value);
      if (value) {
        // Set background color of body to transparent
        document.body.style.backgroundColor = "transparent !important";

        // Set background color of mainApp to transparent
        const mainApp = document.getElementById("mainApp");
        if (mainApp) {
          mainApp.style.backgroundColor = "transparent !important";
        }

        // Set background color of ionPageApp to transparent
        const ionPageApp = document.getElementById("ionPageApp");
        if (ionPageApp) {
          ionPageApp.style.backgroundColor = "transparent !important";
        }

        // Set background color of mainContent to transparent
        const mainContent = document.getElementById("mainContent");
        if (mainContent) {
          mainContent.style.backgroundColor = "transparent !important";
        }

        document.documentElement.style.setProperty(
          "--ion-background-color",
          "transparent"
        );
      } else {
        // Return to default background color

        // Set background color of body to transparent
        document.body.style.backgroundColor =
          currentAppTheme == "light" ? "white !important" : "black !important";

        // Set background color of mainApp to transparent
        const mainApp = document.getElementById("mainApp");
        if (mainApp) {
          mainApp.style.backgroundColor =
            currentAppTheme == "light"
              ? "white !important"
              : "black !important";
        }

        // Set background color of ionPageApp to transparent
        const ionPageApp = document.getElementById("ionPageApp");
        if (ionPageApp) {
          ionPageApp.style.backgroundColor =
            currentAppTheme == "light"
              ? "white !important"
              : "black !important";
        }

        // Set background color of mainContent to transparent
        const mainContent = document.getElementById("mainContent");
        if (mainContent) {
          mainContent.style.backgroundColor =
            currentAppTheme == "light"
              ? "white !important"
              : "black !important";
        }

        document.documentElement.style.setProperty(
          "--ion-background-color",
          currentAppTheme == "light" ? "white" : "black"
        );
      }
    });

    return {
      innerClassRef,
      buildType,
      currentPlatform,
    };
  },
});
</script>
