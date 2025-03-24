<template>
  <div class="w-full flex flex-col items-center justify-start h-full space-y-6">
    <app-form-wrapper
      ref="formComponent"
      :parent-refs="parentRefs"
      class="w-full flex flex-col space-y-[20px] h-full"
    >
      <app-info-box>
        <app-normal-text custom-class="!leading-5">
          <span class="font-semibold"> Quick security check! </span>
          Choose a method below to verify your identity.
        </app-normal-text>
      </app-info-box>

      <app-select
        placeholder="KYC Method *"
        :hasTitle="false"
        :paddings="'py-4 !px-3'"
        :options="idVerificationMethods"
        ref="reason"
        v-model="formData.idMethod"
        use-floating-label
        auto-complete
      >
      </app-select>

      <app-text-field
        :has-title="false"
        type="number"
        placeholder="Enter 11-digit NIN number"
        ref="email"
        name="Email"
        v-model="formData.code"
        :rules="[FormValidations.RequiredRule]"
      >
      </app-text-field>
    </app-form-wrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from "vue"
  import {
    AppFormWrapper,
    AppTextField,
    AppInfoBox,
    AppNormalText,
    AppSelect,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppTextField,
      AppInfoBox,
      AppNormalText,
      AppSelect,
    },
    props: {},
    name: "AuthSetupKycVerification",
    setup() {
      const FormValidations = Logic.Form

      const formData = reactive({
        idMethod: "",
        code: "",
      })

      const idVerificationMethods = [
        { key: "nin", value: "National Identification Number (NIN)" },
        { key: "bvn", value: "Bank Verification Number (BVN)" },
        { key: "passport", value: "International Passport" },
        { key: "dl", value: "Driver’s License" },
        { key: "voter", value: "Voter’s Card" },
      ]

      return {
        FormValidations,
        Logic,
        formData,
        idVerificationMethods,
      }
    },
    data() {
      return {
        parentRefs: [],
      }
    },
    mounted() {
      const parentRefs: any = this.$refs
      this.parentRefs = parentRefs
    },
  })
</script>
