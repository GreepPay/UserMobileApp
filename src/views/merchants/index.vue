<template>
  <app-wrapper>
    <subpage-layout title="Profile">
      <!-- Featured Merchant -->
      <div class="w-full flex flex-col px-4 py-4 border-b-[4px] border-[4px]">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-gray-800 !text-sm">
            Featured
          </app-normal-text>

          <app-normal-text class="text-primary"> See all </app-normal-text>
        </div>

        <div class="py-2 border-y-2">
          <template v-if="merchants">
            <div
              class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
            >
              <app-merchant
                v-for="(merchant, index) in merchants"
                :key="index"
                :merchant="merchant"
              />
            </div>
          </template>
          <div v-else class="py-4 !pt-2">
            <app-empty-state
              title="No Featured Merchant available"
              description="See all Featured Merchants"
            />
          </div>
        </div>
      </div>

      <!-- Boutiques Merchant -->
      <div class="w-full flex flex-col px-4 border-b-[4px] border-[4px]">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-gray-800 !text-sm">
            Boutiques
          </app-normal-text>

          <app-normal-text class="text-primary"> See all </app-normal-text>
        </div>

        <div class="py-2 border-y-2">
          <template v-if="merchants">
            <div
              class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
            >
              <app-merchant
                v-for="(merchant, index) in merchants"
                :key="index"
                :merchant="merchant"
              />
            </div>
          </template>
          <div v-else class="py-4 !pt-2">
            <app-empty-state
              title="No Featured Merchant available"
              description="See all Featured Merchants"
            />
          </div>
        </div>
      </div>

      <!-- Supermarket Merchant -->
      <div class="w-full flex flex-col px-4 border-b-[4px] border-[4px]">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-gray-800 !text-sm">
            Supermarket
          </app-normal-text>

          <app-normal-text class="text-primary"> See all </app-normal-text>
        </div>

        <div class="py-2 border-y-2">
          <template v-if="merchants">
            <div
              class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
            >
              <app-merchant
                v-for="(merchant, index) in merchants"
                :key="index"
                :merchant="merchant"
              />
            </div>
          </template>
          <div v-else class="py-4 !pt-2">
            <app-empty-state
              title="No Featured Merchant available"
              description="See all Featured Merchants"
            />
          </div>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { ref, reactive, onMounted } from "vue"
  import { defineComponent } from "vue"
  import {
    AppTitleCardContainer,
    AppNormalText,
    AppButton,
    AppIcon,
    AppImageLoader,
    AppMerchant,
  } from "@greep/ui-components"
  export default defineComponent({
    name: "MerchantsPage",
    components: {
      AppTitleCardContainer,
      AppNormalText,
      AppButton,
      AppIcon,
      AppImageLoader,
      AppMerchant,
    },
    setup() {
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
        merchants,
      }
    },
  })
</script>
