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

        <!-- Spacer -->
        <div class="h-[80px]"></div>
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
import { reactive } from "vue";
import { defineComponent } from "vue";
import {
  AppNormalText,
  AppButton,
  AppFormWrapper,
  AppImageLoader,
  AppIcon,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";
import { availableCurrencies } from "../../composable";

export default defineComponent({
  name: "ProfileDefualtCurrency",
  components: {
    AppNormalText,
    AppButton,
    AppFormWrapper,
    AppImageLoader,
    AppIcon,
  },
  setup() {
    const FormValidations = Logic.Form;

    const formData = reactive<{
      preferred_currency: string;
    }>({
      preferred_currency: "NGN",
    });

    const handleConfirm = () => {};

    return {
      Logic,
      formData,
      FormValidations,
      availableCurrencies,
      handleConfirm,
    };
  },

  data() {
    return {
      parentRefs: [],
    };
  },
  mounted() {
    const parentRefs: any = this.$refs;
    this.parentRefs = parentRefs;
  },
});
</script>
