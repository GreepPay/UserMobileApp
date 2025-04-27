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
          >
            <app-icon name="filter" />
          </span>
        </div>
      </section>

      <div class="w-full flex flex-col px-4 border-y overflow-y-auto">
        <div class="py-2" v-if="searchQuery">
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
  </app-wrapper>
</template>

<script lang="ts">
  import { ref, computed } from "vue"
  import { defineComponent } from "vue"
  import {
    AppNormalText,
    // AppButton,
    AppIcon,
    AppMerchant,
    AppTabs,
    AppSearch,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "MarketsPage",
    components: {
      AppNormalText,
      // AppButton,
      AppIcon,
      AppMerchant,
      AppTabs,
      AppSearch,
    },
    setup() {
      const searchQuery = ref("")
      const activeTab = ref("recents")

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
        if (!searchQuery.value.trim()) return merchants.value
        return merchants.value.filter((merchant) =>
          merchant.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      })

      const merchants = ref([
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
      ])

      return {
        Logic,
        filteredMerchants,
        tabs,
        activeTab,
        searchQuery,
      }
    },
  })
</script>
