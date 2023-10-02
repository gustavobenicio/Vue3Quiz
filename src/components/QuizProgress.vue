<template>
    <div class="flex flex-col items-center m-2">
      <h1 class="text-2xl font-bold text-gray-900">Quiz Responses </h1>
      <div class="p-1 mx-auto flex items-center justify-center">
         
        <div v-for="answer in answersTemplate" 
              :key="answer"
            class="m-2 w-2 h-2 rounded"
            :class="{'bg-gray-200' : answer === undefined, 'bg-green-600' : answer === true, 'bg-red-600' : answer === false}"
        >
        </div>
      </div>
      <h3 class="text-xl font-bold text-gray-800"> {{ answersTemplate.filter(el => el === true).length }} / {{ answersTemplate.length }} </h3>
    </div>
</template>

<script>
export default {
  name: 'QuizProgress',
  props: {
    answersTemplate: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped lang="scss"> 

</style>