import VueCurrencyFilter from 'vue-currency-filter'

export default ({ Vue }) => {
  Vue.use(VueCurrencyFilter,
    [{
    name:'currency',
    symbol: '$',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'back',
    symbolSpacing: true,
    avoidEmptyDecimals: undefined,
  },
  {
    name:'currencyPorc',
    symbol: '%',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'back',
    symbolSpacing: true,
    avoidEmptyDecimals: undefined,
  }])
  Vue.use(VueCurrencyFilter)
}
