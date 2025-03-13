<template>
  <div class="w-full flex flex-col items-center p-5 space-y-4 h-full">
    <!-- Search -->
    <app-search
      placeholder="Search User/Merchant"
      @update:search="searchQuery = $event"
    />

    <!-- Tabs -->
    <app-tabs :tabs="tabs" v-model:activeTab="activeTab" />

    <!-- Filtered List -->
    <beneficiary-list
      v-model="selectedBeneficiary"
      :dataItems="filteredBeneficiaries"
    />
  </div>

  <!-- Bottom Button -->
  <div
    class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
    style="padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important"
  >
    <div class="w-full flex flex-col">
      <app-button
        @click="continueToNext"
        :disabled="!selectedBeneficiary"
        class="!bg-secondary !py-4"
      >
        Next
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, computed } from "vue"
  import { defineComponent } from "vue"
  import {
    AppButton,
    BeneficiaryList,
    AppSearch,
    AppTabs,
  } from "@greep/ui-components"

  export default defineComponent({
    name: "WalletPaymentMethod",
    components: {
      AppButton,
      BeneficiaryList,
      AppSearch,
      AppTabs,
    },
    emits: ["next"],
    setup(_, { emit }) {
      const searchQuery = ref("")
      const activeTab = ref("recents")
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

      const tabs = [
        { key: "recents", label: "Recents" },
        { key: "beneficiaries", label: "Beneficiaries" },
      ]

      // Computed property to filter beneficiaries based on active tab and search query
      const filteredBeneficiaries = computed(() => {
        return beneficiaries.value.filter((user) => {
          const matchesSearch = user.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
          const matchesTab =
            activeTab.value === "recents" ||
            (activeTab.value === "beneficiaries" && user.isBeneficiary)
          return matchesSearch && matchesTab
        })
      })

      const continueToNext = () => {
        emit("next")
      }

      return {
        searchQuery,
        activeTab,
        tabs,
        filteredBeneficiaries,
        selectedBeneficiary,
        continueToNext,
      }
    },
  })
</script>
