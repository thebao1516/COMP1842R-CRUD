<template>
  <form action="#" @submit.prevent="onSubmit">
      <!-- Show error message if there are missing fields -->
      <p v-if="errorsPresent" class="error">Please fill out all fields!</p>

      <!-- Input for German word -->
      <div class="ui labeled input fluid">
          <div class="ui label">
              <i class="germany flag"></i> German
          </div>
          <input type="text" placeholder="Enter word..." v-model="word.german" />
      </div>

      <!-- Input for English word -->
      <div class="ui labeled input fluid">
          <div class="ui label">
              <i class="united kingdom flag"></i> English
          </div>
          <input type="text" placeholder="Enter word..." v-model="word.english" />
      </div>
      
      <!-- Input for French word -->
      <div class="ui labeled input fluid">
          <div class="ui label">
              <i class="france flag"></i> French
          </div>
          <input type="text" placeholder="Enter word..." v-model="word.french" />
      </div>

      <!-- Submit button -->
      <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'word-form',
  props: {
      word: {
          type: Object,
          required: false,
          default: () => ({
              english: '',
              german: '',
              french: ''
          })
      }
  },
  data() {
      return {
          errorsPresent: false // Flag to indicate if there are validation errors
      };
  },
  methods: {
      // Handle form submission
      onSubmit() {
          // Check if any fields are empty
          if (!this.word.english || !this.word.german || !this.word.french) {
              this.errorsPresent = true; // Show error message
          } else {
              // Emit event to create or update the word
              this.$emit('createOrUpdate', this.word);
          }
      }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
