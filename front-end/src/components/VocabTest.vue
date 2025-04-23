<template>
  <div>
      <!-- Display the current score and total number of words -->
      <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

      <!-- Form for submitting answers -->
      <form action="#" @submit.prevent="onSubmit">
          <!-- German word display (readonly) -->
          <div class="ui labeled input fluid">
              <div class="ui label">
                  <i class="germany flag"></i> German
              </div>
              <input type="text" readonly :disabled="testOver" :value="currWord.german"/>
          </div>
          <!-- English word input -->
          <div class="ui labeled input fluid">
              <div class="ui label">
                  <i class="united kingdom flag"></i> English
              </div>
              <input type="text" placeholder="Enter word..." v-model="english" :disabled="testOver" autocomplete="off" />
          </div>
          <!-- French word input -->
          <div class="ui labeled input fluid">
              <div class="ui label">
                  <i class="france flag"></i> French
              </div>
              <input type="text" placeholder="Enter word..." v-model="french" :disabled="testOver" autocomplete="off" />
          </div>

          <!-- Submit button -->
          <button class="positive ui button" :disabled="testOver">Submit</button>
      </form>

      <!-- Display results of the test -->
      <p :class="['results', resultClass]">
          <span v-html="result"></span>
      </p>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
      words: {
          type: Array,
          required: true
      }
  },
  data() {
      return {
          randWords: [...this.words.sort(() => 0.5 - Math.random())], // Shuffle words
          incorrectGuesses: [], // Track incorrect guesses
          result: '', // Result message to display
          resultClass: '', // CSS class for result message
          english: '', // English word input value
          french: '', // French word input value
          score: 0, // Score counter
          testOver: false // Flag to indicate if test is over
      };
  },
  computed: {
      // Get the current word for the test
      currWord() {
          return this.randWords.length ? this.randWords[0] : '';
      }
  },
  methods: {
      // Handle form submission
      onSubmit() {
          if (this.english === this.currWord.english && this.french === this.currWord.french) {
              // If both English and French translations are correct
              this.flash('Correct!', 'success', { timeout: 1000 });
              this.score += 1; // Increase score
          } else {
              // If answers are incorrect
              this.flash('Wrong!', 'error', { timeout: 1000 });
              this.incorrectGuesses.push(this.currWord.german); // Track incorrect guesses
          }

          // Clear input fields
          this.english = '';
          this.french = '';
          // Remove the current word from the list
          this.randWords.shift();

          // Check if the test is over
          if (this.randWords.length === 0) {
              this.testOver = true;
              this.displayResults(); // Display final results
          }
      },
      // Display results after the test is over
      displayResults() {
          if (this.incorrectGuesses.length === 0) {
              // If no incorrect guesses
              this.result = 'You got everything correct. Well done!';
              this.resultClass = 'success';
          } else {
              // If there were incorrect guesses
              const incorrect = this.incorrectGuesses.join(', ');
              this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
              this.resultClass = 'error';
          }
      }
  }
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>
