<template>
    <img class="px-1 py-0 max-w-sm mx-auto w-36 object-scale-down h-18" alt="quiz" src="../assets/quiz-logo.webp">
  
    <QuizProgress v-if="question != undefined || answersTemplate != undefined" :answersTemplate="answersTemplate" />

    <QuizQuestion v-if="question != undefined" :question="question " :answers="answers" @emit-result="result"/>

    <div  v-if="question === undefined" class="flex justify-center">
      No more Questions  
    </div>
      
</template>


<script>
import QuizProgress from '../components/QuizProgress.vue'
import QuizQuestion from './QuizQuestion.vue';
const api = 'https://opentdb.com/api.php?category=27&difficulty=easy';

export default {
  name: 'myQuiz',
  components: {
    QuizProgress, QuizQuestion
  },
  data() {
    return {
      questionsAmount : 5,
      currentQuestion: 0,
      answersTemplate: [],
      questions : undefined,
      question : undefined,
      answers : undefined,
      correctAnswer : undefined,
    }
  },
  created() {
    this.questionsAmount  = 5;
    this.currentQuestion =-1;
    this.answersTemplate = Array.apply(undefined, Array(this.questionsAmount)).map(function () {});
    this.getQuestions(this.questionsAmount);
  },
  methods: 
  {
    getQuestions(amount) {
      this.axios.get(api + '&amount='+ amount).then(response => {
          this.questions = response.data.results;
          this.nextQuestion();
      })
    },

    nextQuestion() {
        this.currentQuestion++;
        this.question = this.questions[this.currentQuestion].question
        this.answers = this.questions[this.currentQuestion].incorrect_answers.map(element => {
          return this.buildAnswer(element)
        });
        this.correctAnswer = this.questions[this.currentQuestion].correct_answer;
        this.answers.push(this.buildAnswer(this.questions[this.currentQuestion].correct_answer))
        this.shuffleArray(this.answers);
    },

    buildAnswer(answer) {
      return {
        text: answer,
      }
    },

    shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
    },

    result(selectedAnswer) {
      if (selectedAnswer == this.correctAnswer) {
        alert("Correct!");
        this.answersTemplate[this.currentQuestion] = true;
      } else {
        this.answersTemplate[this.currentQuestion] = false;
        alert("Wrong! the correct is " + this.correctAnswer);
      }
      if (this.currentQuestion < this.questionsAmount-1) {
        this.nextQuestion();
      } else {
        this.question = undefined;
        alert("OVER!");
      }
    }

  }
}
</script>

<style scoped lang="scss">

</style>
