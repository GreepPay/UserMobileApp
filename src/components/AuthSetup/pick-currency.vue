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

      <div class="w-full flex flex-col">
        <div
          class="w-full flex flex-row justify-between items-center py-2 mb-3"
          v-for="(currency, index) in availableCurrencies"
          :key="index"
          @click="formData.preferred_currency = currency.code"
        >
          <div class="flex flex-row space-x-3 items-center">
            <app-image-loader
              :photo-url="`/images/icons/flags/${currency.code.toLocaleLowerCase()}.svg`"
              class="size-10 rounded-full"
            />

            <app-normal-text custom-class="!text-left">
              {{ currency.name }} {{ currency.code }}
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
import { defineComponent, reactive } from "vue";
import {
  AppFormWrapper,
  AppInfoBox,
  AppNormalText,
  AppIcon,
  AppImageLoader,
} from "@greep/ui-components";
import { availableCurrencies } from "../../composable";

export default defineComponent({
  components: {
    AppFormWrapper,
    AppInfoBox,
    AppNormalText,
    AppIcon,
    AppImageLoader,
  },
  props: {},
  setup() {
    const formData = reactive({ preferred_currency: "NGN" });

    const continueWithForm = () => {
      if (formData.preferred_currency) {
        return formData;
      } else {
        return;
      }
    };

    return {
      formData,
      availableCurrencies,
      continueWithForm,
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
