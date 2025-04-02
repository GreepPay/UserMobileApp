<template>
  <div class="w-full flex flex-col items-center justify-start h-full space-y-6">
    <app-form-wrapper
      ref="formWrapper"
      :parent-refs="parentRefs"
      class="w-full flex flex-col space-y-[20px] h-full"
    >
      <app-info-box>
        <app-normal-text custom-class="!leading-5">
          <span class="font-semibold"> Let's get started! </span>
          Help us know you.
        </app-normal-text>
      </app-info-box>
      <!-- {{ isFormValid }} -->

      <!-- <div class="flex flex-col space-y-2">
        <div
          class="relative flex items-center justify-center space-x-2 h-[80px] w-[100px]"
        >
          <app-avatar
            src="/images/temps/profile-1.png"
            alt="Raymond"
            :size="80"
          />

          <div
            class="flex items-center border-[4px] border-white rounded-full justify-center absolute bottom-0 right-0 size-10 bg-black"
          >
            <app-icon name="linear-gallery" custom-class="size-6" />
          </div>
        </div>

        <app-info-box>
          <app-normal-text custom-class="!leading-5">
            Profile Picture Upload
          </app-normal-text>
        </app-info-box>
      </div> -->

      <app-text-field
        :has-title="false"
        type="text"
        placeholder="First Name"
        ref="first_name"
        name="First Name"
        use-floating-label
        v-model="formData.first_name"
        :rules="[FormValidations.RequiredRule]"
      >
      </app-text-field>

      <app-text-field
        :has-title="false"
        type="text"
        placeholder="Last Name"
        ref="last_name"
        name="Last Name"
        use-floating-label
        v-model="formData.last_name"
        :rules="[FormValidations.RequiredRule]"
      >
      </app-text-field>

      <!-- <app-text-field
        :has-title="false"
        type="tel"
        placeholder="Phone Number"
        ref="phoneNumber"
        name="Phone Number"
        use-floating-label
        v-model="formData.phoneNumber"
        :rules="[FormValidations.RequiredRule]"
      >
      </app-text-field> -->

      <app-text-field
        :has-title="false"
        type="text"
        placeholder="Email Address"
        ref="email"
        name="Email"
        v-model="formData.email"
        use-floating-label
        :rules="[FormValidations.RequiredRule, FormValidations.EmailRule]"
      >
      </app-text-field>

      <div class="w-full grid grid-cols-2 gap-3">
        <app-select
          :placeholder="'Country'"
          :hasTitle="false"
          :paddings="'py-4 !px-3'"
          :options="countries"
          ref="country"
          use-floating-label
          v-model="countryCode"
          auto-complete
        >
        </app-select>

        <app-select
          v-if="showStateSelector"
          :placeholder="'State'"
          :hasTitle="false"
          :paddings="'py-4 !px-3'"
          :options="states"
          ref="state"
          v-model="stateIsoCode"
          use-floating-label
          auto-complete
        >
        </app-select>
      </div>
    </app-form-wrapper>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    onMounted,
    watch,
    ref,
    computed,
  } from "vue"
  import {
    AppFormWrapper,
    AppTextField,
    AppInfoBox,
    AppNormalText,
    AppSelect,
    AppAvatar,
    AppIcon,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { Country, State } from "country-state-city"
  import { SelectOption } from "@greep/ui-components/src/types"
  const auth = Logic.Auth

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppTextField,
      AppInfoBox,
      AppNormalText,
      AppSelect,
      AppAvatar,
      AppIcon,
    },
    props: {},
    name: "AuthSetupAccountInfo",
    emits: ["update:isValid"],
    setup(_, { emit }) {
      const FormValidations = Logic.Form
      const formWrapper = ref<any>(null)

      const formData = reactive({
        first_name: "",
        last_name: "",
        email: "",
        // phoneNumber: "",
        country: "",
        state: "",
      })

      const showStateSelector = ref(true)
      const stateIsoCode = ref("")
      const countryCode = ref("")

      const countries = reactive<SelectOption[]>([])
      const states = reactive<SelectOption[]>([])

      const updateSignUpPayload = () => {
        auth.SignUpPayload.country = countryCode.value
        auth.SignUpPayload.state = countryCode.value
        // auth.SignUpPayload.default_currency = countryCode.value
        auth.SignUpPayload.email = countryCode.value
        auth.SignUpPayload.first_name = countryCode.value
        auth.SignUpPayload.last_name = countryCode.value
        // auth.SignUpPayload.password = countryCode.value
      }

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

      const isFormValid = computed(() => {
        return formWrapper.value ? formWrapper.value.validate() : false
      })

      // Watch for changes and emit updated valid state
      // watch(
      //   isFormValid,
      //   (newVal) => {
      //     emit("update:isValid", newVal)
      //   },
      //   { deep: true }
      // )

      const validateForm = () => {
        if (formWrapper.value) {
          const isValid = formWrapper.value.validate()
          emit("update:isValid", isValid)
        }
      }
      return {
        FormValidations,
        Logic,
        formData,
        countries,
        states,
        stateIsoCode,
        countryCode,
        showStateSelector,
        formWrapper,
        isFormValid,
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
