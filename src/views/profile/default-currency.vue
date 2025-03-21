<template>
  <app-wrapper>
    <subpage-layout title="Default Currency">
      <app-form-wrapper
        ref="formComponent"
        :parent-refs="parentRefs"
        class="w-full p-4"
      >
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

      <!-- Bottom section -->
      <div
        class="w-full flex flex-col px-4 fixed z-50 bottom-0 left-0 pt-4 bg-white"
        style="padding-bottom: calc(env(safe-area-inset-bottom) + 16px)"
      >
        <app-button
          variant="secondary"
          class="!py-4 col-span-4"
          @click="handleConfirm"
        >
          Confirm
        </app-button>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { ref, reactive } from "vue"
  import { defineComponent } from "vue"
  import {
    BeneficiaryList,
    AppSearch,
    AppTitleCardContainer,
    AppNormalText,
    AppHeaderText,
    AppButton,
    AppFormWrapper,
    AppImageLoader,
    AppIcon,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "ProfileDefualtCurrency",
    components: {
      BeneficiaryList,
      AppSearch,
      AppTitleCardContainer,
      AppNormalText,
      AppHeaderText,
      AppButton,
      AppFormWrapper,
      AppImageLoader,
      AppIcon,
    },
    setup() {
      const FormValidations = Logic.Form
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

      const formData = reactive<{
        preferred_currency: string
      }>({
        preferred_currency: "TRY",
      })

      const handleConfirm = () => {
        // Perform your logic here to save the form data.
        console.log("Form Data:", formData)
      }

      return {
        Logic,
        formData,
        FormValidations,
        availableCurrencies,
        handleConfirm,
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
