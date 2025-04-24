<template>
  <ion-app class="font-poppins !bg-transparent" id="mainApp">
    <ion-router-outlet class="!bg-transparent" />
    <app-alert v-if="alertSetup.show" :setup="alertSetup" />
    <app-loader v-if="loaderSetup.show" :setup="loaderSetup" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import { App as CapacitorApp, URLOpenListenerEvent } from "@capacitor/app";
import { getPlatforms } from "@ionic/vue";
import { useRoute, useRouter } from "vue-router";
import { Logic } from "@greep/logic";
import { SetFrontendLogic, AppAlert, AppLoader } from "@greep/ui-components";
import { SplashScreen } from "@capacitor/splash-screen";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    AppAlert,
    AppLoader,
  },
  setup() {
    const router: any = useRouter();
    const route: any = useRoute();

    const alertSetup = ref(Logic.Common.alertSetup);
    const loaderSetup = ref(Logic.Common.loaderSetup);

    // Set routers
    Logic.Common.SetRouter(router);
    Logic.Common.SetRoute(route);

    // Set UI frontend logic
    // @ts-expect-error varying types
    SetFrontendLogic(Logic);

    // Set app version
    localStorage.setItem("app_version", "1.00");

    // Set app url
    Logic.Common.SetApiUrl(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (import.meta as any).env.VITE_API_URL ?? "http://localhost:3000/graphql"
    );

    const handleMountActions = () => {
      const currentAuthUser = Logic.Auth.AuthUser;

      if (
        window.location.pathname.includes("send/enter-amount") ||
        window.location.pathname.includes("scan")
      ) {
        if (currentAuthUser) {
          Logic.Auth.GetAuthUser();
        }
        return;
      }

      // If user is authenticated
      if (currentAuthUser) {
        Logic.Auth.GetAuthUser();

        if (localStorage.getItem("auth_passcode")) {
          if (Logic.Auth.AuthUser?.profile?.verification_status == "Pending") {
            Logic.Common.GoToRoute("/auth/setup?state=kyc_verification");
          } else {
            Logic.Common.GoToRoute("/auth/welcome");
          }
        } else {
          if (Logic.Auth.AuthUser?.profile?.verification_status == "Pending") {
            Logic.Common.GoToRoute("/auth/setup?state=kyc_verification");
          } else {
            Logic.Common.GoToRoute("/auth/welcome");
          }
        }
      } else {
        // Go to start page
        // Only if the path does not contain /auth
        if (!window.location.pathname.includes("/auth")) {
          Logic.Common.GoToRoute("/start");
        }
      }
    };

    onMounted(async () => {
      // deep link config

      CapacitorApp.addListener(
        "appUrlOpen",
        function (event: URLOpenListenerEvent) {
          // Example url: https://beerswift.app/tabs/tabs2
          // slug = /tabs/tabs2
          const domainType = ".com";
          const slug = event.url.split(domainType).pop();

          // We only push to the route if there is a slug present
          if (slug) {
            if (getPlatforms()[0] == "android") {
              window.location.href = `https://localhost${slug}`;
              return;
            }
            Logic.Common.GoToRoute(slug);
            return;
          }
        }
      );

      // Register watchers
      Logic.Common.watchProperty("alertSetup", alertSetup);
      Logic.Common.watchProperty("loaderSetup", loaderSetup);

      handleMountActions();

      await SplashScreen.show({
        showDuration: 3000,
        autoHide: true,
      });
    });

    return {
      alertSetup,
      loaderSetup,
    };
  },
});
</script>
