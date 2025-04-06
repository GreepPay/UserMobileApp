<template>
  <app-wrapper>
    <subpage-layout title="Send Money">
      <div class="w-full flex flex-col items-center pt-3 h-full">
        <!-- Search -->
        <div class="w-full px-6">
          <app-search
            placeholder="Search User/Merchant"
            @update:search="searchQuery = $event"
          />
        </div>

        <!-- Tabs -->
        <div class="w-full px-3 py-3">
          <app-tabs :tabs="tabs" v-model:activeTab="activeTab" />
        </div>

        <!-- Filtered List -->
        <div class="w-full px-1">
          <beneficiary-list
            v-model="selectedBeneficiary"
            :dataItems="filteredBeneficiaries"
          />
        </div>
      </div>

      <!-- Bottom Button -->
      <div
        class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
        style="
          padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
        "
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
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import {
  AppButton,
  BeneficiaryList,
  AppSearch,
  AppTabs,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";

export default defineComponent({
  name: "SelectBeneficiaryPage",
  components: {
    AppButton,
    BeneficiaryList,
    AppSearch,
    AppTabs,
  },
  setup() {
    const searchQuery = ref("");
    const activeTab = ref("recents");
    const selectedBeneficiary = ref(null);

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
    ]);

    const tabs = [
      { key: "recents", label: "Recents" },
      { key: "beneficiaries", label: "Beneficiaries" },
    ];

    // Computed property to filter beneficiaries based on active tab and search query
    const filteredBeneficiaries = computed(() => {
      return beneficiaries.value.filter((user) => {
        const matchesSearch = user.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
        const matchesTab =
          activeTab.value === "recents" ||
          (activeTab.value === "beneficiaries" && user.isBeneficiary);
        return matchesSearch && matchesTab;
      });
    });

    const continueToNext = () => {
      Logic.Common.GoToRoute("/send/enter-amount");
    };

    return {
      Logic,
      continueToNext,
      activeTab,
      tabs,
      filteredBeneficiaries,
      selectedBeneficiary,
      searchQuery,
    };
  },
});
</script>
