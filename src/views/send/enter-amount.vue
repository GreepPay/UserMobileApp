<template>
  <app-wrapper>
    <subpage-layout title="Transfer">
      <div class="w-full flex flex-col items-center p-5 pt-1 space-y-4 h-full">
        <div class="w-full">
          <div
            class="flex items-center space-x-3 py-3 px-4 cursor-pointer rounded-[32px] border-black border-y-[1.5px] border-b-0 border-x-[3px]"
          >
            <app-avatar
              src="images/temps/profile-2.png"
              alt="name"
              :size="52"
            />

            <div class="flex flex-col py-1">
              <app-header-text
                customClass="!text-base leading-6 !text-gray-two"
              >
                Timms Closet Ventures
              </app-header-text>
              <app-normal-text customClass="!text-sm !text-gray-two">
                Greep Merchant
              </app-normal-text>
            </div>
          </div>

          <app-title-card-container customClass="py-4">
            <div class="flex flex-col justify-center items-center w-full">
              <app-currency-switch
                :model-value="modelCurrencyValue"
                default-currency="USD"
              />

              <div
                class="w-full flex flex-col items-center justify-center pt-4"
              >
                <app-normal-text
                  custom-class="!text-white !font-normal !font-sm pb-1  text-center"
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
        </div>

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
              @click="continueToNext"
              :custom-class="`!py-4 ${
                amountIsValid() ? 'opacity-100' : 'opacity-50'
              }`"
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
    AppAvatar,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "SendMoneyEnterAmountPage",
    components: {
      AppHeaderText,
      AppButton,
      AppKeyboard,
      AppNormalText,
      AppTitleCardContainer,
      AppCurrencySwitch,
      AppAvatar,
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

      const beneficiaries = ref([
        {
          id: 1,
          image: "images/temps/profile-1.png",
          name: "Samwell Taiwo",
          description: "Greep User",
          isBeneficiary: false,
        },
        {
          id: 2,
          image: "images/temps/profile-2.png",
          name: "Jane Smith",
          description: "Greep Merchant",
          isBeneficiary: true,
        },
        {
          id: 3,
          image: "images/temps/profile-1.png",
          name: "John Doe",
          description: "Greep User",
          isBeneficiary: false,
        },
        {
          id: 4,
          image: "images/temps/profile-2.png",
          name: "Sarah Johnson",
          description: "Greep Merchant",
          isBeneficiary: true,
        },
      ])

      const continueToNext = () => {
        Logic.Common.GoToRoute("/send/confirm")
      }

      return {
        amount,
        Logic,
        maximumAmount,
        continueToNext,
        amountIsValid,
        modelCurrencyValue,
      }
    },
  })
</script>
