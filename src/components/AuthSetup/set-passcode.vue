<template>
  <div class="w-full flex flex-col items-center justify-start h-full space-y-6">
    <app-form-wrapper
      ref="formComponent"
      :parent-refs="parentRefs"
      class="w-full flex flex-col space-y-[20px] h-full"
    >
      <app-info-box>
        <app-normal-text custom-class="!leading-5">
          Enter a
          <span class="font-semibold">6-digit </span>
          passcode to ensure that only you can open this app.
        </app-normal-text>
      </app-info-box>

      <app-text-field
        :has-title="false"
        type="password"
        placeholder="Passcode"
        ref="passcode"
        name="Passcode"
        use-floating-label
        v-model="formData.passcode"
        :rules="[FormValidations.RequiredRule]"
      >
      </app-text-field>

      <app-text-field
        :has-title="false"
        type="password"
        placeholder="Confirm Passcode"
        ref="confirm_passcode"
        name="Confirm Passcode"
        use-floating-label
        v-model="formData.confirm_passcode"
        :rules="[FormValidations.RequiredRule]"
      >
      </app-text-field>
    </app-form-wrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, watch, ref } from "vue"
  import {
    AppFormWrapper,
    AppTextField,
    AppInfoBox,
    AppNormalText,
    AppSelect,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { Country, State } from "country-state-city"
  import { SelectOption } from "@greep/ui-components/src/types"

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppTextField,
      AppInfoBox,
      AppNormalText,
      AppSelect,
    },
    props: {},
    name: "AuthSetupAccountInfo",
    setup() {
      const FormValidations = Logic.Form

      const formData = reactive({
        passcode: "",
        confirm_passcode: "",
      })

      const showStateSelector = ref(true)

      const stateIsoCode = ref("")
      const countryCode = ref("")

      const countries = reactive<SelectOption[]>([])
      const states = reactive<SelectOption[]>([])

      const setCountries = () => {
        countries.length = 0
        const allCountries = Country.getAllCountries()
        countries.push(
          ...allCountries.map((country) => ({
            key: country.isoCode,
            value: ` ${country.flag} ${country.name}`,
          }))
        )
      }

      const setStates = () => {
        if (countryCode.value) {
          const allStates = State.getStatesOfCountry(countryCode.value)
          states.length = 0
          states.push(
            ...allStates.map((state) => ({
              key: state.isoCode,
              value: state.name,
            }))
          )
        }
      }

      onMounted(() => {
        setCountries()
      })

      watch(countryCode, () => {
        setStates()
        showStateSelector.value = false
        setTimeout(() => {
          showStateSelector.value = true
        }, 100)
      })

      return {
        FormValidations,
        Logic,
        formData,
        countries,
        states,
        stateIsoCode,
        countryCode,
        showStateSelector,
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
