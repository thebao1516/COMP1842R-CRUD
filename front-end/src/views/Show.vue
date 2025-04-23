<template>
  <div>
    <h1>Show Word</h1>

    <!-- Display the German word -->
    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" readonly :value="word.german"/>
    </div>
    
    <!-- Display the English word -->
    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" readonly :value="word.english"/>
    </div>
    
    <!-- Display the French word -->
    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="france flag"></i> French
      </div>
      <input type="text" readonly :value="word.french"/>
    </div>
    
    <!-- Link to edit the word -->
    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
        Edit word
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'show',
  data() {
    return {
      word: ''
    };
  },
  async mounted() {
    // Fetch the word by ID when the component is mounted
    this.word = await api.getWord(this.$route.params.id);
  }
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>
