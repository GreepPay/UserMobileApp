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
        :options="selectedSupportedCountry.idVerificationMethods"
        ref="reason"
        v-model="formData.idType"
        use-floating-label
        auto-complete
      >
      </app-select>

      <app-text-field
        :has-title="false"
        type="number"
        placeholder="Enter ID number"
        ref="id_number"
        name="ID Number"
        v-model="formData.idNumber"
        :rules="[FormValidations.RequiredRule]"
      >
      </app-text-field>
    </app-form-wrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, ref } from "vue"
  import {
    AppFormWrapper,
    AppTextField,
    AppInfoBox,
    AppNormalText,
    AppSelect,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { supportedCountries } from "../../composable"

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
      const formComponent = ref()
      const formData = reactive({ idType: "", idNumber: "" })

      const selectedSupportedCountry = ref(supportedCountries[0])

      const getIdMethodsForCountry = () => {
        const defaultCurrency = Logic.Auth.SignUpPayload?.default_currency
        if (defaultCurrency) {
          selectedSupportedCountry.value = supportedCountries.find(
            (c) => c.currency === defaultCurrency
          )
        }
      }

      const continueWithForm = () => {
        const state = formComponent.value?.validate()
        if (state) {
          if (formData.idType)
            return {
              ...formData,
              countryIsoCode: selectedSupportedCountry.value?.isoCode || "",
            }
          else return
        }
      }

      onMounted(() => getIdMethodsForCountry())

      return {
        FormValidations,
        Logic,
        formData,
        selectedSupportedCountry,
        formComponent,
        continueWithForm,
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
