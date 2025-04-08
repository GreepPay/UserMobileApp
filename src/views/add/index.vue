<template>
  <app-wrapper>
    <subpage-layout title="Add Money">
      <div class="w-full flex flex-col items-center p-4 pt-3 space-y-8 h-full">
        <app-title-card-container>
          <div
            class="flex flex-col space-y-4 justify-center items-center w-full"
          >
            <app-currency-switch
              :model-value="modelCurrencyValue"
              default_currency="NGN"
              :availableCurrencies="availableCurrencies"
            />

            <div class="w-full flex flex-col items-center justify-center">
              <app-normal-text
                custom-class="!text-white !font-normal !font-sm pb-2  text-center"
              >
                Amount
              </app-normal-text>

              <app-header-text class="!text-3xl text-white">
                ₺
                {{
                  !Number.isNaN(parseFloat(amount))
                    ? Logic.Common.convertToMoney(amount, false, "", false)
                    : "0"
                }}
              </app-header-text>
            </div>
          </div>
        </app-title-card-container>

        <!-- keyboard -->
        <app-keyboard v-model="amount" />

        <div
          :class="`w-full flex flex-col items-center justify-center ${
            parseFloat(amount) > maximumAmount ? 'visible' : 'invisible'
          }`"
        >
          <app-normal-text class="!text-red-500">
            Maximum withdrawal amount is
            <span class="!font-semibold pl-1">
              ₺
              {{ Logic.Common.convertToMoney(maximumAmount, false, "", false) }}
            </span>
          </app-normal-text>
        </div>

        <!-- Bottom button -->
        <div
          class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
          style="
            padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
          "
        >
          <div class="w-full flex flex-col">
            <app-button
              :class="`!py-4 ${amountIsValid() ? 'opacity-100' : 'opacity-50'}`"
              @click="amountIsValid() ? continueToNext() : null"
              :variant="'secondary'"
            >
              Next
            </app-button>
          </div>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue"
  import {
    AppHeaderText,
    AppButton,
    AppKeyboard,
    AppNormalText,
    AppTitleCardContainer,
    AppCurrencySwitch,
  } from "@greep/ui-components"
  import { availableCurrencies } from "../../composable"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "WalletAddMoneyPage",
    components: {
      AppHeaderText,
      AppButton,
      AppKeyboard,
      AppNormalText,
      AppTitleCardContainer,
      AppCurrencySwitch,
    },
    setup() {
      const modelCurrencyValue = ref("NGN")
      const amount = ref("0")
      const maximumAmount = 10000

      const amountIsValid = () => {
        return (
          parseFloat(amount.value) > 0 &&
          parseFloat(amount.value) <= maximumAmount
        )
      }

      const continueToNext = () => {
        Logic.Common.GoToRoute("/add/method")
      }

      return {
        amount,
        Logic,
        maximumAmount,
        continueToNext,
        amountIsValid,
        modelCurrencyValue,
        availableCurrencies,
      }
    },
  })
</script>
