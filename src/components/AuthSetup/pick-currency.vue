<template>
  <div class="w-full flex flex-col items-center justify-start h-full space-y-6">
    <app-form-wrapper
      ref="formComponent"
      :parent-refs="parentRefs"
      class="w-full flex flex-col space-y-[20px] h-full"
    >
      <app-info-box>
        <app-normal-text custom-class="!leading-5">
          <span class="font-semibold">What’s your preferred currency?</span>
          Choose one for all your transactions. You can change it later.
        </app-normal-text>
      </app-info-box>

      <div class="w-full flex flex-col space-y-2">
        <div
          class="w-full flex flex-row justify-between items-center py-2"
          v-for="(currency, index) in availableCurrencies"
          :key="index"
          @click="formData.preferred_currency = currency.code"
        >
          <div class="flex flex-row space-x-3 items-center">
            <app-image-loader
              :photo-url="`/images/icons/flags/${currency.code.toLocaleLowerCase()}.svg`"
              class="h-[40px] w-[40px] rounded-full"
            />

            <app-normal-text custom-class="!text-left">
              {{ currency.name }}
            </app-normal-text>
          </div>

          <div class="flex flex-row justify-end">
            <app-icon
              :name="`${
                formData.preferred_currency == currency.code
                  ? 'selected'
                  : 'not-selected'
              }`"
              class="h-[24px]"
            />
          </div>
        </div>
      </div>
    </app-form-wrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, watch } from "vue"
  import {
    AppFormWrapper,
    AppInfoBox,
    AppNormalText,
    AppIcon,
    AppImageLoader,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  const auth = Logic.Auth

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppInfoBox,
      AppNormalText,
      AppIcon,
      AppImageLoader,
    },
    props: {
      attemptToNext: Boolean, // Declare attemptToNext as a prop
    },
    name: "AuthSetupPickCurrency",
    emits: ["next"],
    setup(props, { emit }) {
      const FormValidations = Logic.Form
      const formWrapper = ref<any>(null)
      const availableCurrencies = reactive([
        {
          code: "TRY",
          name: "Turkish Lira",
        },
        {
          code: "USD",
          name: "United States Dollar",
        },
        {
          code: "USDC",
          name: "USDC",
        },
        {
          code: "NGN",
          name: "Nigerian Naira",
        },
        {
          code: "GHS",
          name: "Ghanaian Cedis",
        },
        {
          code: "XLM",
          name: "XLM",
        },
        {
          code: "ZAR",
          name: "South African Rand",
        },
        {
          code: "EUR",
          name: "Euro",
        },
      ])

      const formData = reactive({ preferred_currency: "TRY" })

      const updateSignUpPayload = () => {
        console.log(" auth.SignUpPayload ", auth.SignUpPayload)

        auth.SignUpPayload = {
          ...auth.SignUpPayload,
          default_currency: formData.preferred_currency,
        }
        console.log(" auth.SignUpPayload ", auth.SignUpPayload)
      }

      watch(
        () => props.attemptToNext,
        (newVal) => {
          if (newVal) {
            updateSignUpPayload()
            emit("next")
          }
        }
      )

      return { FormValidations, formWrapper, formData, availableCurrencies }
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
