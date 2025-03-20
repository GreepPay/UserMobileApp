<template>
  <app-wrapper>
    <subpage-layout title="Personal Info">
      <div class="p-5 space-y-4">
        <div
          class="relative mx-auto flex items-center justify-center space-x-2 h-[96px] w-[120px]"
        >
          <app-avatar
            src="/images/temps/profile-1.png"
            alt="Raymond"
            :size="96"
          />

          <div
            class="flex items-center border-[4px] border-white rounded-full justify-center absolute bottom-0 right-0 size-12 bg-black"
          >
            <app-icon name="linear-gallery" custom-class="size-6" />
          </div>
        </div>

        <div class="pt-4">
          <app-details :details="userDetails" />
        </div>
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
    AppAvatar,
    AppIcon,
    AppDetails,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "ProfilePersonalInfo",
    components: {
      BeneficiaryList,
      AppSearch,
      AppTitleCardContainer,
      AppNormalText,
      AppHeaderText, 
      AppButton,
      AppAvatar,
      AppIcon,
      AppDetails,
    },
    setup() {
      const amount = ref("1000")
      const transactions = reactive<
        {
          id: string | number
          title: string
          amount: number
          type: "redeemed"
          transactionType: "credit" | "debit"
          date: string
        }[]
      >([
        {
          id: 1,
          title: "Redeemed",
          amount: 33000,
          type: "redeemed",
          transactionType: "debit",
          date: "Today",
        },
        {
          id: 2,
          title: "Earned",
          amount: 54,
          type: "redeemed",
          transactionType: "credit",
          date: "Yesterday",
        },
        {
          id: 3,
          title: "Earned",
          amount: 500,
          type: "redeemed",
          transactionType: "credit",
          date: "2 Days Ago",
        },
        {
          id: 4,
          title: "Earned",
          amount: 500,
          type: "redeemed",
          transactionType: "debit",
          date: "Last Week",
        },
        {
          id: 5,
          title: "Redeemed",
          amount: 20,
          type: "redeemed",
          transactionType: "debit",
          date: "Last Month",
        },
      ])
      const userDetails = {
        "First & Last Name": "Raymond Ray",
        "Phone Number": "+234 802 222 4591",
        "Email Address": "draykintola@gmail.com",
        "State, Country": "Ibadan, Nigeria",
      }

      return {
        Logic,
        transactions,
        amount,
        userDetails,
      }
    },
  })
</script>
