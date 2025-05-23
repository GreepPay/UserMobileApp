<template>
  <app-wrapper>
    <div
      :class="`w-full flex flex-col lg:text-sm mdlg:text-[12px] text-xs overflow-y-auto !font-inter bg-white space-y-5 sm:!space-y-5 xs:space-y-3 items-center justify-center`"
      :style="`height: ${
        mobileFullHeight ? mobileFullHeight.height : ''
      }; padding-top: calc(env(safe-area-inset-top) + 16px);
      padding-bottom: calc(env(safe-area-inset-bottom) + 16px);`"
    >
      <!-- Top section -->
      <div class="w-full flex flex-row items-center justify-center pt-4">
        <app-image-loader
          :photo-url="
            AuthUser?.profile?.profile_picture || '/images/profile-image.svg'
          "
          custom-class="h-[96px] w-[96px] rounded-full"
        />
      </div>

      <div
        class="w-full flex flex-col xs:!space-y-0 sm:!space-y-2 md:space-y-2 items-center justify-center"
      >
        <app-header-text class="text-center w-full xs:!text-base sm:!text-lg">
          Welcome Back
        </app-header-text>
        <app-normal-text
          class="text-center w-full !text-[#0A141E] sm:!text-sm xs:!text-xs"
        >
          {{ AuthUser?.first_name }} {{ AuthUser?.last_name }}
        </app-normal-text>
      </div>

      <div class="w-full flex flex-col space-y-2 items-center justify-center">
        <app-normal-text
          class="text-center w-full font-semibold sm:!text-sm xs:!text-sm"
        >
          Enter Passcode
        </app-normal-text>

        <div class="w-full flex flex-row space-x-0 items-center justify-center">
          <div v-for="index in 6" :key="index" class="px-3">
            <div
              :class="`h-[15px] w-[15px] rounded-full ${
                index <= formData.passcode.length
                  ? 'bg-primary'
                  : 'bg-light-gray-two'
              }`"
            ></div>
          </div>
        </div>
      </div>

      <!-- Keyboard -->
      <div class="w-full pt-4 flex flex-col">
        <app-keyboard v-model="formData.passcode" />
      </div>

      <div class="w-full flex flex-row items-center justify-center">
        <app-normal-text
          class="text-center w-full text-red sm:!text-sm xs:!text-xs"
          @click="Logic.Auth.SignOut()"
        >
          Log Out
        </app-normal-text>
      </div>
    </div>
  </app-wrapper>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  reactive,
  ref,
  onMounted,
  onUnmounted,
} from "vue";
import {
  AppHeaderText,
  AppNormalText,
  AppKeyboard,
  AppImageLoader,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";
import { computed } from "vue";

export default defineComponent({
  name: "WelcomePage",
  components: {
    AppHeaderText,
    AppNormalText,
    AppKeyboard,
    AppImageLoader,
  },
  setup() {
    const AuthUser = ref(Logic.Auth.AuthUser);

    const formData = reactive({
      passcode: "",
    });

    watch(formData, async () => {
      if (formData.passcode.length === 6) {
        await isFilled();
      }
    });

    const isFilled = async () => {
      const authPasscode = localStorage.getItem("auth_passcode");

      if (formData.passcode != authPasscode) {
        Logic.Common.showAlert({
          show: true,
          type: "error",
          message: "Invalid passcode. Please try again.",
        });
        formData.passcode = "";
        return;
      }

      const encryptedAuthData = localStorage.getItem("auth_encrypted_data");

      try {
        const authData: any = Logic.Common.decryptData(
          encryptedAuthData || "",
          authPasscode
        );

        Logic.Auth.SignInPayload = {
          email: authData.email,
          password: authData.password,
        };
      } catch (error) {
        Logic.Common.showAlert({
          show: true,
          type: "error",
          message: "Invalid passcode. Please try again.",
        });
        formData.passcode = "";
        return;
      }

      Logic.Common.showLoader({
        show: true,
        loading: true,
      });

      await Logic.Auth.SignIn(true);

      Logic.Common.showLoader({
        show: true,
        loading: true,
      });

      await Logic.Auth.GetAuthUser();
      Logic.Common.hideLoader();
      Logic.Common.GoToRoute("/");
    };

    onMounted(() => {
      Logic.Auth.watchProperty("AuthUser", AuthUser);
    });

    const innerHeight = ref(window.innerHeight);

    const updateHeight = () => {
      innerHeight.value = window.innerHeight;
    };

    onMounted(() => {
      updateHeight();
      window.addEventListener("resize", updateHeight);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateHeight);
    });

    const mobileFullHeight = computed(() => {
      return {
        height: `${innerHeight.value}px`,
      };
    });

    return {
      Logic,
      formData,
      AuthUser,
      mobileFullHeight,
    };
  },
});
</script>
