<template>
  <app-wrapper>
    <app-onboarding-layout
      v-model="currentPage"
      :page-setting="pageSettings"
      :disableBtn="computedDisableBtn"
    >
      <div
        class="w-full flex flex-col items-center justify-start h-full space-y-6 px-4 py-4"
      >
        <!-- v-model:isValid="accountInfoValid" -->
        <template
          v-if="currentPage == 'account_info'"
          ref="accountInfoRef"
          @update:isValid="updateAccountInfoValid"
        >
          <auth-setup-account-info />
        </template>

        <template v-if="currentPage == 'kyc_verification'">
          <auth-setup-kyc-verification />
        </template>

        <template v-if="currentPage == 'pick_currency'">
          <auth-setup-pick-currency />
        </template>

        <template v-if="currentPage == 'verify_phone'">
          <auth-setup-verify-phone />
        </template>

        <template v-if="currentPage == 'verify_email'">
          <auth-setup-verify-email />
        </template>

        <template v-if="currentPage == 'set_passcode'">
          <auth-setup-set-passcode />
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
  import { Logic } from "@greep/logic"
  import {
    AuthSetupAccountInfo,
    AuthSetupSetPasscode,
    AuthSetupPickCurrency,
    AuthSetupVerifyEmail,
    AuthSetupVerifyPhone,
    AuthSetupKycVerification,
  } from "../../../components/AuthSetup"

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
      const FormValidations = Logic.Form
      const currentPage = ref("account_info")
      const accountInfoValid = ref(false)
      const accountInfoRef = ref(null)
      const updateAccountInfoValid = (isValid: boolean) => {
        accountInfoValid.value = isValid
      }

      const pageSettings = reactive({
        main_title: "Setup",
        pages: [
          {
            title: "Account Info",
            key: "account_info",
            action_btn: {
              label: "Next",
              handler: () => {
                currentPage.value = "kyc_verification"
              },
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
              handler: () => {
                currentPage.value = "verify_phone"
              },
              is_disabled: false,
            },
          },
          {
            title: "Verify Phone",
            key: "verify_phone",
            action_btn: {
              label: "Next",
              handler: () => {
                currentPage.value = "verify_email"
              },
              is_disabled: false,
            },
          },
          {
            title: "Verify Email",
            key: "verify_email",
            action_btn: {
              label: "Next",
              handler: () => {
                currentPage.value = "set_passcode"
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
                handleNext()
              },
              is_disabled: false,
            },
          },
        ],
      })

      const computedDisableBtn = computed(() => {
        // If the current page is account_info, disable the Next button if there is a validation error
        if (currentPage.value === "account_info") {
          return !accountInfoValid.value
        }
        return false
      })

      const handleNext = () => {
        Logic.Common.GoToRoute("/")
      }

      return {
        FormValidations,
        Logic,
        currentPage,
        pageSettings,
        computedDisableBtn,
        accountInfoValid,
        accountInfoRef,
        updateAccountInfoValid,
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
