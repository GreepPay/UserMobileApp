<template>
  <app-wrapper>
    <app-onboarding-layout v-model="currentPage" :page-setting="pageSettings">
      <div
        class="w-full flex flex-col items-center justify-start h-full space-y-6 px-4 py-4"
      >
        <template v-if="currentPage == 'account_info'">
          <auth-setup-account-info
            :attemptToNext="attemptToNext"
            @update:isValid="handleIsAccountInfoValid"
          />
        </template>

        <template v-if="currentPage == 'kyc_verification'">
          <auth-setup-kyc-verification />
        </template>

        <template v-if="currentPage == 'pick_currency'">
          <auth-setup-pick-currency
            :attemptToNext="attemptToNext"
            @next="handlePickCurrencyNext"
          />
        </template>

        <template v-if="currentPage == 'verify_phone'">
          <auth-setup-verify-phone @verified="isPhoneVerified = true" />
        </template>

        <template v-if="currentPage == 'verify_email'">
          <auth-setup-verify-email @verified="isEmailVerified = true" />
        </template>

        <template v-if="currentPage == 'set_passcode'">
          <auth-setup-set-passcode
            :attemptToNext="attemptToNext"
            @update:isValid="validateAndSignUserUp"
          />
        </template>

        <!-- Spacer -->
        <div class="!h-[100px] py-5 w-full"></div>
      </div>
    </app-onboarding-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from "vue"
  import { AppOnboardingLayout } from "@greep/ui-components"
  import {
    AuthSetupAccountInfo,
    AuthSetupSetPasscode,
    AuthSetupPickCurrency,
    AuthSetupVerifyEmail,
    AuthSetupVerifyPhone,
    AuthSetupKycVerification,
  } from "../../../components/AuthSetup"
  import { Logic } from "@greep/logic"
  const auth = Logic.Auth

  export default defineComponent({
    name: "SetupAccountIndex",
    components: {
      AuthSetupAccountInfo,
      AuthSetupSetPasscode,
      AuthSetupPickCurrency,
      AuthSetupVerifyEmail,
      AuthSetupVerifyPhone,
      AppOnboardingLayout,
      AuthSetupKycVerification,
    },
    setup() {
      const currentPage = ref("account_info")
      const accountInfoValid = ref(false)
      const isPhoneVerified = ref(false)
      const isEmailVerified = ref(false)
      const isLoading = ref(false)
      const attemptToNext = ref(false)

      const isBtnLoading = computed(() => {
        if (currentPage.value === "verify_phone" && !isPhoneVerified.value) {
          return true
        }
        return false
      })

      const pageSettings = reactive({
        main_title: "Setup",
        pages: [
          {
            title: "Account Info",
            key: "account_info",
            action_btn: {
              label: "Next",
              handler: () => updateAndResetAttemptToNext(),
              is_disabled: false,
            },
          },
          {
            title: "KYC Verification",
            key: "kyc_verification",
            action_btn: {
              label: "Verify",
              handler: () => {
                currentPage.value = "pick_currency"
              },
              is_disabled: false,
            },
          },
          {
            title: "Pick Currency",
            key: "pick_currency",
            action_btn: {
              label: "Next",
              handler: () => updateAndResetAttemptToNext(),
              // handler: () => {
              //   currentPage.value = "verify_phone"
              // },
              is_disabled: false,
            },
          },
          {
            title: "Verify Phone",
            key: "verify_phone",
            action_btn: {
              label: "Next",
              handler: () => {
                if (isPhoneVerified.value) {
                  isPhoneVerified.value = false
                  currentPage.value = "verify_email"
                }
              },
              is_disabled: false,
              loading: false,
            },
          },
          {
            title: "Verify Email",
            key: "verify_email",
            action_btn: {
              label: "Next",
              handler: () => {
                if (isEmailVerified.value) {
                  isEmailVerified.value = false
                  currentPage.value = "set_passcode"
                }
              },
              is_disabled: false,
            },
          },
          {
            title: "Set Passcode",
            key: "set_passcode",
            action_btn: {
              label: "Complete Setup",
              handler: () => {
                updateAndResetAttemptToNext()
                // console.log(67890)
                // handleCompleteSetup()
              },
              is_disabled: false,
              loading: isLoading.value,
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

      const updateAndResetAttemptToNext = () => {
        attemptToNext.value = true
        setTimeout(() => (attemptToNext.value = false), 1000)
      }
      const handleIsAccountInfoValid = (value: boolean) => {
        accountInfoValid.value = value
        if (value) currentPage.value = "kyc_verification"
      }
      const handlePickCurrencyNext = () => {
        currentPage.value = "verify_phone"
      }
      const handleCompleteSetup = () => {
        Logic.Common.GoToRoute("/")
      }
      const validateAndSignUserUp = async (isValid: boolean) => {
        console.log("isValid", isValid)

        if (isValid) {
          // Call SignUp method
          const response = await auth.SignUp(true)
          console.log("response", response)

          if (response) {
            console.log("Sign up successful:", response)
          } else {
            console.error("Sign up failed")
            Logic.Common.GoToRoute("/auth/login")
          }
        }
        isLoading.value = true
      }
      return {
        // FormValidations,
        // Logic,
        currentPage,
        pageSettings,
        attemptToNext,
        isPhoneVerified,
        isEmailVerified,
        isBtnLoading,
        handleIsAccountInfoValid,
        handlePickCurrencyNext,
        validateAndSignUserUp,
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
