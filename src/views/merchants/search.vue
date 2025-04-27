<template>
  <app-wrapper>
    <subpage-layout title="Merchant Search">
      <!-- header seaction -->
      <section class="py-2">
        <!-- Search -->
        <div class="pb-4 px-4">
          <app-search
            placeholder="Search Merchant"
            @update:search="searchQuery = $event"
          />
        </div>

        <!-- filter section -->
        <div class="flex flex-wrap items-center gap-4 pb-2 w-full px-4">
          <app-tabs
            :tabs="tabs"
            v-model:activeTab="activeTab"
            customClass="!w-fit flex-1"
            type="badge"
          />

          <span
            class="h-9 w-9 rounded-full border flex items-center justify-center"
            @click="showFilterModal = true"
          >
            <app-icon name="filter" />
          </span>
        </div>
      </section>

      <div class="w-full flex flex-col px-4 border-y overflow-y-auto">
        <div class="pt-2 pb-3" v-if="searchQuery">
          <app-normal-text class="!text-sm !font-semibold !text-black">
            {{ filteredMerchants.length }} results for
            <span class="!text-purple"> “{{ searchQuery }}” </span>
          </app-normal-text>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <app-merchant
            v-for="(merchant, index) in filteredMerchants"
            :key="index"
            :merchant="merchant"
          />
        </div>
      </div>
    </subpage-layout>

    <!-- Filter Modal -->
    <app-modal
      v-if="showFilterModal"
      :close="
        () => {
          showFilterModal = false
        }
      "
      :hasTitle="true"
      title="Filters"
      contentClass=" !px-0"
    >
      <div class="w-full flex flex-col items-center">
        <div
          class="w-full px-4 pb-4 border-b-[4px] text-black flex flex-col items-center justify-center h-56 overflow-y-auto"
        >
          <app-multi-tabs-selector
            :tabs="tabs"
            v-model:selectedKeys="selectedFlterOptions"
            type="outlined"
          />
        </div>

        <div class="px-4 pt-4 w-full">
          <app-button
            :custom-class="`!bg-secondary !w-full !py-4 !px-8 !text-sm`"
            @click="showFilterModal = false"
            variant="secondary"
          >
            Apply ({{ selectedFlterOptions.length }})
          </app-button>
        </div>
      </div>
    </app-modal>
  </app-wrapper>
</template>

<script lang="ts">
  import { ref, computed } from "vue"
  import { defineComponent } from "vue"
  import {
    AppNormalText,
    AppButton,
    AppIcon,
    AppMerchant,
    AppTabs,
    AppSearch,
    AppModal,
    AppMultiTabsSelector,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "MerchantsSearchPage",
    components: {
      AppNormalText,
      AppButton,
      AppIcon,
      AppMerchant,
      AppTabs,
      AppSearch,
      AppModal,
      AppMultiTabsSelector,
    },
    setup() {
      const showFilterModal = ref(false)
      const searchQuery = ref("")
      const activeTab = ref("recents")
      const selectedFlterOptions = ref<string[]>([])

      const tabs = [
        { key: "all", label: "All" },
        { key: "bookstore", label: "Bookstore" },
        { key: "electronics", label: "Electronics" },
        { key: "groceries", label: "Groceries" },
        { key: "fashion", label: "Fashion" },
        { key: "health", label: "Health" },
        { key: "food", label: "Food" },
        { key: "logistics", label: "Logistics" },
        { key: "cafe", label: "Cafe" },
        { key: "clothing", label: "Clothing" },
        { key: "gadgets", label: "Gadgets" },
        { key: "books", label: "Books" },
        { key: "fitness", label: "Fitness" },
      ]

      const filteredMerchants = computed(() => {
        if (!searchQuery.value.trim()) return merchants
        return merchants.filter((merchant) =>
          merchant.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      })

      const merchants = [
        {
          id: 1,
          name: "Test Name",
          category: "Bookstore",
          imageUrl: "/images/merchant-logos/1.svg",
        },
        {
          id: 2,
          name: "City Electronics",
          category: "Electronics",
          imageUrl: "/images/merchant-logos/3.svg",
        },
        {
          id: 3,
          name: "Green Groceries",
          category: "Groceries",
          imageUrl: "/images/merchant-logos/2.svg",
        },
        {
          id: 4,
          name: "Quick Fashion",
          category: "Fashion",
          imageUrl: "/images/merchant-logos/2.svg",
        },
        {
          id: 5,
          name: "Mega Pharmacy",
          category: "Health",
          imageUrl: "/images/merchant-logos/3.svg",
        },
        {
          id: 6,
          name: "Fresh Bites",
          category: "Food",
          imageUrl: "/images/merchant-logos/1.svg",
        },
        {
          id: 7,
          name: "Speedy Courier",
          category: "Logistics",
          imageUrl: "/images/merchant-logos/3.svg",
        },
        {
          id: 8,
          name: "The Coffee House",
          category: "Cafe",
          imageUrl: "/images/merchant-logos/1.svg",
        },
        {
          id: 9,
          name: "Daily Wear",
          category: "Clothing",
          imageUrl: "/images/merchant-logos/2.svg",
        },
        {
          id: 10,
          name: "Tech World",
          category: "Gadgets",
          imageUrl: "/images/merchant-logos/1.svg",
        },
        {
          id: 11,
          name: "Book Haven",
          category: "Books",
          imageUrl: "/images/merchant-logos/3.svg",
        },
        {
          id: 12,
          name: "Fitness First",
          category: "Fitness",
          imageUrl: "/images/merchant-logos/2.svg",
        },
      ]

      return {
        Logic,
        filteredMerchants,
        tabs,
        activeTab,
        searchQuery,
        showFilterModal,
        selectedFlterOptions,
      }
    },
  })
</script>
