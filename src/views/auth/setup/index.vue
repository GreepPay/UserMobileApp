<template>
  <app-wrapper>
    <app-onboarding-layout
      v-model="currentPage"
      :page-setting="pageSettings"
      :topPadding="`${currentPlatform === 'android' ? '!pt-6' : ''}`"
    >
      <div
        class="w-full flex flex-col items-center justify-start h-full space-y-6 px-4 py-4"
      >
        <template v-if="currentPage == 'account_info'">
          <auth-setup-account-info ref="accountInfoRef" />
        </template>

        <template v-if="currentPage == 'kyc_verification'">
          <auth-setup-kyc-verification ref="kycVerificationRef" />
        </template>

        <template v-if="currentPage == 'pick_currency'">
          <auth-setup-pick-currency ref="pickCurrencyRef" />
        </template>

        <template v-if="currentPage == 'set_password'">
          <auth-setup-set-password ref="setPasswordRef" />
        </template>

        <template v-if="currentPage == 'verify_email'">
          <auth-setup-verify-email ref="verifyEmailRef" />
        </template>

        <!-- Spacer -->
        <div class="!h-[100px] py-5 w-full"></div>
      </div>
    </app-onboarding-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted } from "vue"
  import { AppOnboardingLayout } from "@greep/ui-components"
  import {
    AuthSetupAccountInfo,
    AuthSetupSetPassword,
    AuthSetupPickCurrency,
    AuthSetupVerifyEmail,
    AuthSetupKycVerification,
  } from "../../../components/AuthSetup"
  import { getPlatforms } from "@ionic/vue"
  import { Logic } from "@greep/logic"
  import { StatusBar, Style } from "@capacitor/status-bar"
  const auth = Logic.Auth

  export default defineComponent({
    name: "SetupAccountIndex",
    components: {
      AuthSetupAccountInfo,
      AuthSetupSetPassword,
      AuthSetupPickCurrency,
      AuthSetupVerifyEmail,
      AppOnboardingLayout,
      AuthSetupKycVerification,
    },
    setup() {
      const currentPage = ref("account_info")

      const accountInfoRef = ref<any>(null)
      const kycVerificationRef = ref<any>(null)
      const pickCurrencyRef = ref<any>(null)
      const setPasswordRef = ref<any>(null)
      const verifyEmailRef = ref<any>(null)

      const currentPlatform = computed(() => {
        return getPlatforms()[0]
      })

      const initializeForm = () => {
        Logic.Auth.SignUpPayload = {
          email: "",
          first_name: "",
          last_name: "",
          state: "",
          country: "",
          password: "",
          default_currency: "",
        }
      }

      //
      const pageSettings = reactive({
        main_title: "Setup",
        pages: [
          {
            title: "Account Info",
            key: "account_info",
            action_btn: {
              label: "Next",
              handler: () => accountInfoHandler(),
              is_disabled: false,
              loading: false,
            },
          },
          {
            title: "Pick Currency",
            key: "pick_currency",
            action_btn: {
              label: "Next",
              handler: () => pickCurrencyHandler(),
              is_disabled: false,
              loading: false,
            },
          },
          {
            title: "Set Password",
            key: "set_password",
            action_btn: {
              label: "Next",
              handler: () => setPasswordHandler(),
              is_disabled: false,
              loading: false,
            },
          },
          {
            title: "Verify Email",
            key: "verify_email",
            action_btn: {
              label: "Next",
              handler: () => verifyEmailHandler(),
              is_disabled: false,
              loading: false,
            },
          },
          {
            title: "KYC Verification",
            key: "kyc_verification",
            action_btn: {
              label: "Verify",
              handler: () => kycVerificationHandler(),
              is_disabled: false,
              loading: false,
            },
          },
        ],
      })

      // setup steps handlers
      const accountInfoHandler = () => {
        const formData = accountInfoRef.value?.continueWithForm()

        if (Logic.Auth.SignUpPayload && formData) {
          Logic.Auth.SignUpPayload.email = formData.email
          Logic.Auth.SignUpPayload.first_name = formData.first_name
          Logic.Auth.SignUpPayload.last_name = formData.last_name
          Logic.Auth.SignUpPayload.state = formData.state
          Logic.Auth.SignUpPayload.country = formData.country

          currentPage.value = "pick_currency"
        }
      }

      const pickCurrencyHandler = () => {
        const formData = pickCurrencyRef.value?.continueWithForm()
        if (formData && Logic.Auth.SignUpPayload) {
          Logic.Auth.SignUpPayload.default_currency =
            formData.preferred_currency
          currentPage.value = "set_password"
        }
      }

      const setPasswordHandler = () => {
        const formData = setPasswordRef.value?.continueWithForm()

        if (formData && Logic.Auth.SignUpPayload) {
          Logic.Auth.SignUpPayload.password = formData.password

          // set loadingstate for this flow
          pageSettings.pages[2].action_btn.loading = true

          // Send signup request
          Logic.Auth.SignUp(true, (progress) => {})?.then((response) => {
            if (response) {
              // Save auth email and pass
              localStorage.setItem(
                "auth_email",
                Logic.Auth.SignUpPayload?.email || ""
              )
              localStorage.setItem(
                "auth_pass",
                Logic.Auth.SignUpPayload?.password || ""
              )

              currentPage.value = "verify_email"
              pageSettings.pages[2].action_btn.loading = true
            } else {
              pageSettings.pages[2].action_btn.loading = true
            }
          })
        }
      }

      const verifyEmailHandler = () => {
        const otpCode = verifyEmailRef.value?.continueWithForm()

        if (otpCode) {
          Logic.Auth.VerifyUserOTPayload = {
            user_uuid: Logic.Auth.AuthUser?.uuid,
            otp: otpCode,
          }

          pageSettings.pages[3].action_btn.loading = true

          Logic.Auth.VerifyUserOTP()?.then(async (response) => {
            if (response) {
              Logic.Auth.SignInPayload = {
                email: localStorage.getItem("auth_email"),
                password: localStorage.getItem("auth_pass"),
              }

              pageSettings.pages[3].action_btn.loading = false
              await Logic.Auth.SignIn(true)
              await Logic.Auth.GetAuthUser()

              currentPage.value = "kyc_verification"
            } else {
              pageSettings.pages[3].action_btn.loading = false
            }
          })
        }
      }

      const kycVerificationHandler = async () => {
        const formData = kycVerificationRef.value?.continueWithForm()

        if (!formData) return
        Logic.Auth.VerifyUserIdentityPayload = {
          user_uuid: Logic.Auth.AuthUser?.uuid,
          id_number: formData.idNumber,
          id_country: formData?.countryIsoCode,
          id_type: formData.idType,
        }

        await Logic.Auth.VerifyUserIdentity()

        // Check if passcode has been set
        Logic.Common.GoToRoute("/auth/set-passcode")
        // if (localStorage.getItem("auth_passcode")) {
        //   Logic.Common.GoToRoute("/")
        // } else {
        // }
      }

      onMounted(() => {
        initializeForm()
        onMounted(() => {
          StatusBar.setBackgroundColor({ color: "#008651" }) // any hex color
          StatusBar.setStyle({ style: Style.Light }) // Light or Dark
        })
      })
      return {
        currentPage,
        pageSettings,
        accountInfoRef,
        kycVerificationRef,
        pickCurrencyRef,
        verifyEmailRef,
        setPasswordRef,
        currentPlatform,
      }
    },
    data() {
      return {
        parentRefs: null,
      }
    },
    mounted() {
      const parentRefs: any = this.$refs
      this.parentRefs = parentRefs
    },
  })
</script>
