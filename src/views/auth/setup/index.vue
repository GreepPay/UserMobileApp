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
    // AuthSetupVerifyPhone,
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
      // AuthSetupVerifyPhone,
      AppOnboardingLayout,
      AuthSetupKycVerification,
    },
    setup() {
      const currentPage = ref("account_info")
      // const accountInfoValid = ref(false)
      // const isPhoneVerified = ref(false)
      // const isEmailVerified = ref(false)
      const attemptToNext = ref(false)

      const accountInfoRef = ref<any>(null)
      const kycVerificationRef = ref<any>(null)
      const pickCurrencyRef = ref<any>(null)
      const setPasswordRef = ref<any>(null)
      const verifyEmailRef = ref<any>(null)

      // const isBtnLoading = computed(() => {
      // if (currentPage.value === "verify_phone" && !isPhoneVerified.value) {
      //     return true
      //   }
      //   return false
      // })
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
            title: "KYC Verification",
            key: "kyc_verification",
            action_btn: {
              label: "Verify",
              handler: () => kycVerificationHandler(),
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
        ],
      })

      // const computedDisableBtn = computed(() => {
      //   // If the current page is account_info, disable the Next button if there is a validation error
      //   if (currentPage.value === "account_info") {
      //     return !accountInfoValid.value
      //   }
      //   return false
      // })

      // const handleIsAccountInfoValid = (value: boolean) => {
      //   accountInfoValid.value = value
      //   if (value) currentPage.value = "kyc_verification"
      // }

      // setup steps handlers
      const accountInfoHandler = () => {
        const formData = accountInfoRef.value?.continueWithForm()

        if (Logic.Auth.SignUpPayload && formData) {
          Logic.Auth.SignUpPayload.email = formData.email
          Logic.Auth.SignUpPayload.first_name = formData.first_name
          Logic.Auth.SignUpPayload.last_name = formData.last_name
          Logic.Auth.SignUpPayload.state = formData.state
          Logic.Auth.SignUpPayload.country = formData.country

          currentPage.value = "kyc_verification"
        }
      }

      const kycVerificationHandler = () => {
        const formData = kycVerificationRef.value?.continueWithForm()
        // if (formData && Logic.Auth.SignUpPayload) {
        //   Logic.Auth.SignUpPayload.documents = [
        //     formData.international_passport,
        //     formData.business_document,
        //   ]
        // }
        if (!formData) return
        currentPage.value = "pick_currency"
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

        console.log(" Logic.Auth.SignUpPayload", Logic.Auth.SignUpPayload)

        if (formData && Logic.Auth.SignUpPayload) {
          Logic.Auth.SignUpPayload.password = formData.password

          // set loadingstate for this flow
          pageSettings.pages[3].action_btn.loading = true

          // Send signup request
          Logic.Auth.SignUp(true, (progress) => {
            console.log("progress", progress)
          })?.then((response) => {
            console.log("response", response)

            if (response) {
              currentPage.value = "verify_email"
              pageSettings.pages[3].action_btn.loading = true
            } else {
              pageSettings.pages[3].action_btn.loading = true
            }
          })
        }
      }

      const verifyEmailHandler = () => {
        const otpCode = verifyEmailRef.value?.continueWithForm()
        console.log("otpCode", otpCode)

        if (otpCode) {
          Logic.Auth.VerifyUserOTPayload = {
            user_uuid: Logic.Auth.AuthUser?.uuid,
            otp: otpCode,
          }

          pageSettings.pages[4].action_btn.loading = true

          Logic.Auth.VerifyUserOTP()?.then(async (response) => {
            if (response) {
              Logic.Auth.SignInPayload = {
                email: localStorage.getItem("auth_email"),
                password: localStorage.getItem("auth_pass"),
              }

              await Logic.Auth.SignIn(true)
              await Logic.Auth.GetAuthUser()

              pageSettings.pages[4].action_btn.loading = false

              // Check if passcode has been set
              if (localStorage.getItem("auth_passcode")) {
                Logic.Common.GoToRoute("/")
              } else {
                Logic.Common.GoToRoute("/auth/set-passcode")
              }
            } else {
              pageSettings.pages[4].action_btn.loading = false
            }
          })
        }
      }

      onMounted(() => {
        initializeForm()
        onMounted(() => {
          StatusBar.setBackgroundColor({ color: "#008651" }) // any hex color
          StatusBar.setStyle({ style: Style.Light }) // Light or Dark
        })
      })
      return {
        // FormValidations,
        // Logic,
        currentPage,
        pageSettings,
        attemptToNext,
        // isPhoneVerified,
        // isEmailVerified,
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
