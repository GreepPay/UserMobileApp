<template>
  <app-wrapper>
    <subpage-layout title="Send Money">
      <div class="w-full flex flex-col items-center h-full">
        <!-- Search -->
        <div class="w-full px-4">
          <app-text-field
            :has-title="false"
            type="search"
            placeholder="Search"
            ref="search"
            name="search"
            v-model="searchQuery"
            :custom-class="`!border-[1.5px] ${
              searchQuery.length > 0 ? '!border-[#10BB76]' : '!border-[#E0E2E4]'
            }  !rounded-[99px] px-4 !py-3 !bg-transparent`"
            :input-style="`!text-sm`"
          >
            <template #inner-prefix>
              <app-icon name="search-normal" custom-class="h-[22px]" />
            </template>

            <template #inner-suffix v-if="searchIsLoading">
              <app-loading class="!text-primary" />
            </template>
          </app-text-field>
        </div>

        <!-- Tabs -->
        <div class="w-full px-4 pt-3" v-if="searchQuery.length == 0">
          <app-tabs :tabs="tabs" v-model:activeTab="activeTab" />
        </div>

        <!-- Filtered List -->
        <div class="w-full px-4 pt-2">
          <app-beneficiary-list
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
            class="!py-4"
            variant="secondary"
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
  AppBeneficiaryList,
  AppTabs,
  AppTextField,
  AppIcon,
  AppLoading,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";
import { reactive } from "vue";
import { watch } from "vue";
import { onMounted } from "vue";

interface BeneficiaryType {
  id: string | number;
  name: string;
  image: string;
  description: string;
}

export default defineComponent({
  name: "SelectBeneficiaryPage",
  components: {
    AppButton,
    AppBeneficiaryList,
    AppTabs,
    AppTextField,
    AppIcon,
    AppLoading,
  },
  middlewares: {
    fetchRules: [
      {
        domain: "Beneficiary",
        property: "ManyBeneficiaries",
        method: "GetBeneficiaries",
        params: [
          {
            first: 40,
            page: 1,
          },
        ],
        requireAuth: true,
        ignoreProperty: false,
        silentUpdate: true,
      },
    ],
  },
  setup() {
    const searchQuery = ref("");
    const activeTab = ref("recents");
    const selectedBeneficiary = ref<BeneficiaryType>();
    const SearchedUsers = ref(Logic.User.SearchedUsers);

    const searchIsLoading = ref(false);

    const beneficiaries = reactive<
      {
        id: string;
        image: string;
        name: string;
        description: string;
        isBeneficiary: boolean;
      }[]
    >([]);

    const tabs = [
      { key: "recents", label: "Recents" },
      { key: "beneficiaries", label: "Beneficiaries" },
    ];

    const searchUsers = async () => {
      if (searchQuery.value.length > 0) {
        // Perform search
        searchIsLoading.value = true;
        await Logic.User.SearchForUsers(searchQuery.value);
        searchIsLoading.value = false;
      }
    };

    // Computed property to filter beneficiaries based on active tab and search query
    const filteredBeneficiaries = computed(() => {
      if (searchQuery.value.length > 0) {
        return beneficiaries;
      }
      return beneficiaries.filter((user) => {
        const matchesTab =
          activeTab.value === "recents" ||
          (activeTab.value === "beneficiaries" && user.isBeneficiary);
        return matchesTab;
      });
    });

    const setBeneficiaries = () => {
      beneficiaries.length = 0;

      SearchedUsers.value?.forEach((user) => {
        let greepUserType = "Greep";

        if (user.profile?.user_type == "Customer") {
          greepUserType = "Greep User";
        } else if (user.profile?.user_type == "Business") {
          greepUserType = "Greep Merchant";
        } else if (user.profile?.user_type == "Rider") {
          greepUserType = "Greep Rider";
        }

        beneficiaries.push({
          name: `${user.first_name} ${user.last_name}`,
          id: user.uuid || "",
          image: user.profile?.profile_picture || "/images/profile-image.svg",
          description: greepUserType,
          isBeneficiary: false,
        });
      });
    };

    watch(searchQuery, () => {
      Logic.Common.debounce(() => {
        searchUsers();
      });
    });

    watch(SearchedUsers, () => {
      setBeneficiaries();
    });

    const continueToNext = () => {
      Logic.Common.GoToRoute(
        `/send/enter-amount?beneficiary=${
          selectedBeneficiary.value?.id
        }&amount=${0}&currency=${
          Logic.Auth.AuthUser?.profile?.default_currency || "USD"
        }`
      );
    };

    onMounted(() => {
      Logic.User.watchProperty("SearchedUsers", SearchedUsers);
      setBeneficiaries();
    });

    return {
      Logic,
      continueToNext,
      activeTab,
      tabs,
      filteredBeneficiaries,
      selectedBeneficiary,
      searchQuery,
      searchIsLoading,
    };
  },
});
</script>
