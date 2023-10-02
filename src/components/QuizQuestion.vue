<template>
    <div class="container mx-auto flex flex-col ">
      
      <div class="m-2">
        <h2 class=" block text-lg font-medium text-gray-800" v-html="this.question">
        </h2>
      </div>
      <div class="responses-container">    
        <div v-for="response in answers" 
            :key="response.text" 
            class="response-button"
            :class="{'response-selected' : response.isSelected}"
            @click="toggleActive(response)"
          >
          <input type="radio" v-if="false"  name="1" id="1" v-model="picked">
          <label v-html="response.text" for="1"></label>
        </div>
    
      </div>
    
      <div class="submit-buttons-container">
        <button class="submit-confirm-button" 
          :disabled="answers.filter(el => el.isSelected).length == 0"
          :class="{'enabled' : (answers.filter(el => el.isSelected).length > 0)}"
          @click="submitAnswer()"
        > 
          Enviar 
        </button>
        
        <button class="submit-jump-button"> 
          Pular 
        </button>
      </div>  
    </div>
</template>

<script>

export default {
    name: 'QuizQuestion',
    props: {
        question: {
            type: String,
            required: true
        },
        answers: {
            type: Array,
            required: true
        }
    },
    methods: {
        toggleActive: function(item){
            if(item.isSelected ) {
            item.isSelected = false;
            } else {
                this.answers.forEach(element => {
                element.isSelected = false;
                });
                item.isSelected = true;
            }
        }
        ,
        submitAnswer(){
            console.log(JSON.stringify(this.answers));
            var selectedAnswer = this.answers.find(element => element.isSelected);
            // console.log("-> Child: " + selectedAnswer.text);
            this.$emit("emit-result",selectedAnswer.text)
        }
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {

  .responses-container {
    @apply container mx-auto grid sm:gap-4 sm:grid-cols-1 md:grid-cols-2 sm:p-2 ;
  }

  .response-button {
    @apply bg-gradient-to-br from-blue-100 to-blue-200;
    @apply px-6 py-4 text-base font-semibold sm:rounded-xl sm:shadow-md flex items-center  ;
  }

  .response-selected {
    @apply response-button bg-gradient-to-br from-blue-400 to-blue-500;
    @apply text-white;
    // text-shadow: 0.1px 0.1px 0 grayscale($color:green);
  }

  .submit-buttons-container {
    @apply container mx-auto grid gap-2 sm:grid-cols-1 md:grid-cols-2 sm:p-4 py-2;
  }
  .submit-confirm-button {
  @apply sm:p-4 p-4 text-sm text-green-200 font-semibold rounded-full border border-green-200 ;

  }
  .enabled {
      @apply border-green-500 text-green-600 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2;
    }

  .submit-jump-button {
    @apply px-4 py-4 text-sm text-orange-600 font-semibold rounded-full border border-orange-500 hover:text-white hover:bg-orange-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2;
  }
}

</style>
