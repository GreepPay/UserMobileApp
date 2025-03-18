<template>
  <app-wrapper>
    <subpage-layout title="Add Beneficiary">
      <div class="w-full flex flex-col items-center py-5 space-y-2 h-full">
        <!-- Search -->
        <div class="px-5 w-full">
          <app-search
            placeholder="Search User/Merchant"
            @update:search="searchQuery = $event"
          />
        </div>

        <!-- Filtered List -->
        <div class="px-2 w-full">
          <beneficiary-list
            v-model="selectedBeneficiary"
            :dataItems="beneficiaries"
            :imageSize="48"
          />
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { ref, computed } from "vue"
  import { defineComponent } from "vue"
  import { BeneficiaryList, AppSearch } from "@greep/ui-components"

  export default defineComponent({
    name: "WalletPaymentMethod",
    components: {
      BeneficiaryList,
      AppSearch,
    },
    setup() {
      const searchQuery = ref("")
      const selectedBeneficiary = ref(null)

      // Dummy data (Add isBeneficiary to filter)
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

      return {
        searchQuery,
        beneficiaries,
        selectedBeneficiary,
      }
    },
  })
</script>
