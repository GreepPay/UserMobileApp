import { getPlatforms } from "@ionic/vue";
import { computed, reactive } from "vue";
import { Currency } from "@greep/ui-components/src/types";

export const availableCurrencies = reactive<Currency[]>([
  {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
    country_code: "NG",
    loading: false,
    card_payment: {
      min: 1000,
      max: 1000000,
      fee: "1.5",
    },
    payin_fees: [
      {
        type: "percentage",
        value: 0.5,
        min: 55,
        method: "bank_transfer",
      },
    ],
    payout_fees: [
      {
        type: "fixed",
        value: 100,
        min: 100,
        method: "bank_transfer",
      },
    ],
  },
  {
    code: "KES",
    name: "Kenyan Shilling",
    symbol: "KSh",
    country_code: "KE",
    loading: false,
    card_payment: {
      min: 100,
      max: 100000,
      fee: "2",
    },
    payin_fees: [
      {
        type: "percentage",
        value: 2,
        min: 1,
        method: "momo",
      },
    ],
    payout_fees: [
      {
        type: "percentage",
        value: 0.5,
        min: 200,
        method: "bank_transfer",
      },
      {
        type: "percentage",
        value: 2,
        min: 1,
        method: "momo",
      },
    ],
  },
  {
    code: "UGX",
    name: "Ugandan Shilling",
    symbol: "USh",
    country_code: "UG",
    loading: false,
    card_payment: {
      min: 1000,
      max: 1000000,
      fee: "2",
    },
    payin_fees: [
      {
        type: "percentage",
        value: 1,
        min: 1,
        method: "bank_transfer",
      },
      {
        type: "percentage",
        value: 1.5,
        min: 1,
        method: "momo",
      },
    ],
    payout_fees: [
      {
        type: "percentage",
        value: 0.5,
        min: 5000,
        method: "bank_transfer",
      },
      {
        type: "percentage",
        value: 1.5,
        min: 1,
        method: "momo",
      },
    ],
  },
  {
    code: "GHS",
    name: "Ghanaian Cedi",
    symbol: "₵",
    country_code: "GH",
    loading: false,
    card_payment: {
      min: 10,
      max: 10000,
      fee: "2",
    },
    payin_fees: [
      {
        type: "percentage",
        value: 2,
        min: 1,
        method: "momo",
      },
      {
        type: "percentage",
        value: 0.5,
        min: 1,
        method: "bank_transfer",
      },
    ],
    payout_fees: [
      {
        type: "percentage",
        value: 1.5,
        min: 1,
        method: "momo",
      },
    ],
  },
  {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
    country_code: "ZA",
    loading: false,
    card_payment: {
      min: 10,
      max: 10000,
      fee: "2",
    },
    payin_fees: [
      {
        type: "percentage",
        value: 2,
        min: 1,
        method: "bank_transfer",
      },
    ],
    payout_fees: [
      {
        type: "percentage",
        value: 0.5,
        min: 20,
        method: "momo",
      },
    ],
  },
  // {
  //   code: "AOA",
  //   name: "Angolan Kwanza",
  //   symbol: "Kz",
  // },
  {
    code: "ZMW",
    name: "Zambian Kwacha",
    symbol: "ZK",
    country_code: "ZM",
    loading: false,
    card_payment: {
      min: 10,
      max: 10000,
      fee: "2",
    },
    payin_fees: [
      {
        type: "percentage",
        value: 1,
        min: 1,
        method: "bank_transfer",
      },
      {
        type: "percentage",
        value: 2,
        min: 1,
        method: "momo",
      },
    ],
    payout_fees: [
      {
        type: "percentage",
        value: 0.5,
        min: 100,
        method: "bank_transfer",
      },
      {
        type: "percentage",
        value: 1.5,
        min: 1,
        method: "momo",
      },
    ],
  },
  {
    code: "TRY",
    name: "Turkish Lira",
    symbol: "₺",
    country_code: "TR",
    loading: false,
    card_payment: {
      min: 10,
      max: 10000,
      fee: "2",
    },
    payin_fees: [
      {
        type: "percentage",
        value: 1.5,
        min: 1,
        method: "bank_transfer",
      },
    ],
    payout_fees: [
      {
        type: "percentage",
        value: 0.75,
        min: 20,
        method: "bank_transfer",
      },
    ],
  },
  // {
  //   code: "ZWL",
  //   name: "Zimbabwean Dollar",
  //   symbol: "Z$",
  // },
]);

export const getPayoutFee = (
  currencyCode: string,
  method: string,
  amount: number
) => {
  const currency = availableCurrencies.find((c) => c.code === currencyCode);
  if (!currency) return undefined;
  const fee = currency.payout_fees?.find((fee) => fee.method === method);
  if (!fee) return undefined;

  if (fee.type === "percentage") {
    const calculatedFee = (amount * fee.value) / 100;
    return Math.max(calculatedFee, fee.min);
  } else if (fee.type === "fixed") {
    return Math.max(fee.value, fee.min);
  }

  return undefined;
};

export const getPayinFee = (
  currencyCode: string,
  method: string,
  amount: number
) => {
  const currency = availableCurrencies.find((c) => c.code === currencyCode);
  if (!currency) return undefined;
  const fee = currency.payin_fees?.find((fee) => fee.method === method);
  if (!fee) return undefined;

  if (fee.type === "percentage") {
    const calculatedFee = (amount * fee.value) / 100;
    return Math.max(calculatedFee, fee.min);
  }

  return undefined;
};

export const safeAreaInsetTop = computed(() => {
  // Replace this with your actual platform detection logic
  const isAndroid = getPlatforms()[0] === "android";

  const topInset = Number(
    String(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--safe-area-inset-top"
      )
    ).replace("px", "")
  );

  return isAndroid && topInset === 0 ? 20 : topInset;
});

export const safeAreaInsetBottom = computed(() => {
  // Replace this with your actual platform detection logic
  const isAndroid = getPlatforms()[0] === "android";

  const bottomInset = Number(
    String(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--safe-area-inset-bottom"
      )
    ).replace("px", "")
  );

  return isAndroid && bottomInset === 0 ? 20 : bottomInset;
});

export const getBottomPadding = computed(() => {
  // Replace this with your actual platform detection logic
  const isAndroid = getPlatforms()[0] === "android";

  return isAndroid
    ? "padding-bottom: calc(env(safe-area-inset-bottom) + 45px) !important;"
    : "padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;";
});

export const supportedCountries = reactive([
  {
    country: "Nigeria",
    isoCode: "NG",
    currency: "NGN",
    idVerificationMethods: [
      { key: "bvn", value: "Bank Verification Number (BVN)" },
      // { key: "phone", value: "Phone Number" },
      { key: "nin", value: "National Identification Number (NIN)" },
      { key: "dl", value: "Driver’s License" },
      // { key: "vin", value: "Voter’s Card" },
      { key: "passport", value: "International Passport" },
    ],
  },
  {
    country: "Kenya",
    isoCode: "KE",
    currency: "KES",
    idVerificationMethods: [
      { key: "id", value: "National ID" },
      { key: "passport", value: "International Passport" },
      { key: "kra", value: "Kenya KRA PIN" },
    ],
  },
  {
    country: "Uganda",
    isoCode: "UG",
    currency: "UGX",
    idVerificationMethods: [
      { key: "nin", value: "National Identification Number (NIN)" },
    ],
  },
  {
    country: "Ghana",
    isoCode: "GH",
    currency: "GHS",
    idVerificationMethods: [
      { key: "passport", value: "International Passport" },
      { key: "dl", value: "Driver’s License" },
      { key: "voter", value: "Voter’s ID" },
      { key: "tin", value: "Taxpayer Identification Number (TIN)" },
      { key: "ssnit", value: "Social Security Number (SSNIT ID)" },
      { key: "address", value: "Ghana Digital Address" },
    ],
  },
  {
    country: "South Africa",
    isoCode: "ZA",
    currency: "ZAR",
    idVerificationMethods: [
      { key: "national_id", value: "South African National ID" },
    ],
  },
  {
    country: "Angola",
    isoCode: "AO",
    currency: "AOA",
    idVerificationMethods: [
      { key: "national_id", value: "Angola National ID" },
    ],
  },
  {
    country: "Zambia",
    isoCode: "ZM",
    currency: "ZMW",
    idVerificationMethods: [
      { key: "nrc", value: "National Registration Card (NRC)" },
    ],
  },
  {
    country: "Zimbabwe",
    isoCode: "ZW",
    currency: "ZWL",
    idVerificationMethods: [
      { key: "national_id", value: "Zimbabwe National ID" },
      // { key: "credit_check", value: "Credit Check" },
    ],
  },
]);
