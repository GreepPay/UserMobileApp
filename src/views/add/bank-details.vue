<template>
  <app-wrapper>
    <subpage-layout title="Mobile Money Details">
      <app-form-wrapper
        ref="formComponent"
        :parent-refs="parentRefs"
        class="w-full flex flex-col items-center justify-start h-full px-4 pt-2"
      >
        <!-- <div class="pb-4 w-full">
          <app-text-field
            :has-title="false"
            type="text"
            placeholder="First Name"
            ref="firstName"
            name="First Name"
            use-floating-label
            v-model="formData.firstName"
            :rules="[FormValidations.RequiredRule]"
          >
          </app-text-field>
        </div>

        <div class="pb-4 w-full">
          <app-text-field
            :has-title="false"
            type="text"
            placeholder="Last Name"
            ref="lastName"
            name="Last Name"
            use-floating-label
            v-model="formData.lastName"
            :rules="[FormValidations.RequiredRule]"
          >
          </app-text-field>
        </div> -->

        <div class="pb-4 w-full">
          <app-select
            :placeholder="'Select Provider'"
            :hasTitle="false"
            :paddings="'py-4 !px-3'"
            :options="providers"
            ref="provider"
            use-floating-label
            v-model="formData.provider"
            auto-complete
          >
          </app-select>
        </div>

        <div class="pb-4 w-full">
          <app-text-field
            :has-title="false"
            type="tel"
            placeholder="Mobile Number"
            ref="mobileNumber"
            name="Mobile Number"
            use-floating-label
            v-model="formData.mobileNumber"
            :rules="[FormValidations.RequiredRule]"
          >
          </app-text-field>
        </div>

        <!-- <div class="pb-4 w-full">
          <app-select
            :placeholder="'Reason For Sending'"
            :hasTitle="false"
            :paddings="'py-4 !px-3'"
            :options="reasonsForSending"
            ref="reason"
            v-model="formData.reason"
            use-floating-label
            auto-complete
          >
          </app-select>
        </div> -->
      </app-form-wrapper>

      <!-- Bottom button -->
      <div
        class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
        :style="`
          ${getBottomPadding}
        `"
      >
        <div class="w-full">
          <app-button
            variant="secondary"
            :custom-class="`!w-full !py-4`"
            @click="continueToNext"
          >
            Next
          </app-button>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import {
  AppFormWrapper,
  AppTextField,
  AppSelect,
  AppButton,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";
import { availableCurrencies, getBottomPadding } from "../../composable";
import { ref } from "vue";
import { onMounted } from "vue";
import { onIonViewWillEnter } from "@ionic/vue";

const defaultCountryCode = availableCurrencies.filter(
  (item) => item.code == Logic.Auth.AuthUser?.profile?.default_currency
)[0];

export default defineComponent({
  components: {
    AppFormWrapper,
    AppTextField,
    AppSelect,
    AppButton,
  },
  props: {},
  name: "MobileMoneyBankDetailsPage",
  middlewares: {
    fetchRules: [
      {
        domain: "Wallet",
        property: "OnRampNetwork",
        method: "GetOnRampNetwork",
        params: ["GH"],
        requireAuth: true,
        ignoreProperty: false,
      },
      {
        domain: "Wallet",
        property: "OnRampChannels",
        method: "GetOnRampChannels",
        params: [defaultCountryCode?.country_code],
        requireAuth: true,
        ignoreProperty: false,
      },
    ],
  },
  setup() {
    const FormValidations = Logic.Form;

    const OnRampChannels = ref(Logic.Wallet.OnRampChannels);
    const OnRampNetwork = ref(Logic.Wallet.OnRampNetwork);

    const formComponent = ref();

    const selectedMethod = ref("");
    const selectedCurrency = ref(defaultCountryCode.code);

    const formData = reactive({
      provider: "",
      mobileNumber: "",
    });

    const providers = reactive([
      { key: "mtn", value: "MTN" },
      { key: "airtel", value: "Airtel" },
      { key: "glo", value: "Glo" },
      { key: "9mobile", value: "9Mobile" },
    ]);

    const reasonsForSending = [
      { key: "bills", value: "Paying Bills" },
      { key: "gift", value: "Sending as a Gift" },
      { key: "business", value: "Business Transaction" },
      { key: "personal", value: "Personal Use" },
    ];

    const continueToNext = () => {
      const state = formComponent.value.validate();

      if (state) {
        // Save purchase data to localstorage
        let purchaseData: any = localStorage.getItem("purchaseData");

        if (purchaseData) {
          purchaseData = JSON.parse(purchaseData);
          purchaseData.momoDetails = {
            networkId: formData.provider,
            mobileNumber: formData.mobileNumber,
          };
          localStorage.setItem("purchaseData", JSON.stringify(purchaseData));

          Logic.Common.GoToRoute("/add/confirm");
        }
      }
    };

    const setPageDefaults = () => {
      selectedCurrency.value =
        Logic.Auth.AuthUser?.profile?.default_currency ||
        defaultCountryCode.code;

      selectedMethod.value =
        Logic.Common.route?.query?.channelId?.toString() || "";

      providers.length = 0;
      OnRampNetwork.value?.forEach((item) => {
        if (item.status == "active" && item.accountNumberType == "phone") {
          providers.push({
            key: item.id,
            value: item.name,
          });
        }
      });

      if (providers.length > 0) {
        formData.provider = providers[0].key;
      }
    };

    onIonViewWillEnter(() => {
      setPageDefaults();
    });

    onMounted(() => {
      Logic.Wallet.watchProperty("OnRampChannels", OnRampChannels);
      Logic.Wallet.watchProperty("OnRampNetwork", OnRampNetwork);
      setPageDefaults();
    });

    return {
      FormValidations,
      Logic,
      formData,
      reasonsForSending,
      providers,
      continueToNext,
      formComponent,
      getBottomPadding,
    };
  },
  data() {
    return {
      parentRefs: [],
    };
  },
  mounted() {
    const parentRefs: any = this.$refs;
    this.parentRefs = parentRefs;
  },
});
</script>
