import { getPlatforms } from "@ionic/vue"
import { computed, reactive } from "vue"
import { Currency } from "@greep/ui-components/src/types"

export const availableCurrencies = reactive<Currency[]>([
  {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
  },
  {
    code: "KES",
    name: "Kenyan Shilling",
    symbol: "KSh",
  },
  {
    code: "UGX",
    name: "Ugandan Shilling",
    symbol: "USh",
  },
  {
    code: "GHS",
    name: "Ghanaian Cedi",
    symbol: "₵",
  },
  {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
  },
  {
    code: "AOA",
    name: "Angolan Kwanza",
    symbol: "Kz",
  },
  {
    code: "ZMW",
    name: "Zambian Kwacha",
    symbol: "ZK",
  },
  {
    code: "ZWL",
    name: "Zimbabwean Dollar",
    symbol: "Z$",
  },
])

export const safeAreaInsetTop = computed(() => {
  // Replace this with your actual platform detection logic
  const isAndroid = getPlatforms()[0] === "android"

  const topInset = Number(
    String(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--safe-area-inset-top"
      )
    ).replace("px", "")
  )

  return isAndroid && topInset === 0 ? 20 : topInset
})

export const safeAreaInsetBottom = computed(() => {
  // Replace this with your actual platform detection logic
  const isAndroid = getPlatforms()[0] === "android"

  const bottomInset = Number(
    String(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--safe-area-inset-bottom"
      )
    ).replace("px", "")
  )

  return isAndroid && bottomInset === 0 ? 20 : bottomInset
})

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
      { key: "voter", value: "Voter’s Card" },
      { key: "passport", value: "International Passport" },
    ],
  },
  {
    country: "Kenya",
    isoCode: "KE",
    currency: "KES",
    idVerificationMethods: [
      { key: "nid", value: "National ID" },
      { key: "passport", value: "International Passport" },
      { key: "kra_pin", value: "Kenya KRA PIN" },
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
      { key: "digital_address", value: "Ghana Digital Address" },
    ],
  },
  {
    country: "South Africa",
    isoCode: "ZA",
    currency: "ZAR",
    idVerificationMethods: [
      { key: "sa_id", value: "South African National ID" },
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
      { key: "credit_check", value: "Credit Check" },
    ],
  },
])
