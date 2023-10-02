<template>
  
    <!-- <img class="p-6 max-w-sm mx-auto" alt="Secret logo" src="./assets/secret-logo.svg"> -->
    <GoogleTranslateSelect
    default-language-code="en"
    default-page-language-code="en"
    :fetch-browser-language="false"
    trigger="click"
    @select="handleGoogleTranslateSelect"
  />
  <Quiz class="p-10 max-w-sm mx-auto bg-white flex items-center space-x-4"/>

</template>

<script>
import Quiz from './components/Quiz.vue'

const handleGoogleTranslateSelect = (language) => {
  console.log(language)
}

export default {
  name: 'App',
  data: () => ({
    defaultLanguageCode: 'en',
    defaultPageLanguageCode: 'en',
    handleGoogleTranslateSelect: handleGoogleTranslateSelect
  }),
  components: {
    Quiz
  },
  methods: {
    languageSelectedHandler(info) {
      console.log(info);
    },
  }
}
</script>

<style lang="scss">
</style>
