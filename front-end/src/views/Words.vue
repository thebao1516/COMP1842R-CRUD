<template>
  <div>
    <h1>Words</h1>

    <!-- Search input for filtering words -->
    <div class="ui fluid input">
      <input type="text" v-model="searchQuery" placeholder="Search words..." />
    </div>
    
    <!-- Button to export the filtered words to CSV -->
    <button @click="exportToCSV" class="ui button primary">Export to CSV</button>

    <!-- Display a list of word cards -->
    <div class="word-list">
      <div class="word-card" v-for="(word, i) in paginatedWords" :key="i">
        <h3><strong>English:</strong> {{ word.english }}</h3>
        <p><strong>German:</strong> {{ word.german }}</p>
        <p><strong>French:</strong> {{ word.french }}</p>
        <div class="actions">
          <!-- Links for showing and editing the word -->
          <router-link :to="{ name: 'show', params: { id: word._id }}">Show</router-link>
          <router-link :to="{ name: 'edit', params: { id: word._id }}">Edit</router-link>
          <!-- Link for deleting the word, with a confirmation dialog -->
          <a @click.prevent="onDestroy(word._id)">Delete</a>
        </div>
      </div>
    </div>

    <!-- Pagination controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/helpers";

export default {
  name: "words",
  data() {
    return {
      words: [], // Array to hold the list of words
      searchQuery: "", // Query for searching words
      currentPage: 1, // Current page number for pagination
      wordsPerPage: 10, // Number of words per page
    };
  },
  computed: {
    // Filters words based on the search query
    filteredWords() {
      const query = this.searchQuery.toLowerCase();
      return this.words.filter(
        (word) =>
          word.english.toLowerCase().includes(query) ||
          word.german.toLowerCase().includes(query) ||
          word.french.toLowerCase().includes(query)
      );
    },
    // Calculates total number of pages for pagination
    totalPages() {
      return Math.ceil(this.filteredWords.length / this.wordsPerPage);
    },
    // Returns a subset of words for the current page
    paginatedWords() {
      const start = (this.currentPage - 1) * this.wordsPerPage;
      const end = start + this.wordsPerPage;
      return this.filteredWords.slice(start, end);
    },
  },
  methods: {
    // Deletes a word after confirmation
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deleteWord(id);
      this.flash("Word deleted successfully!", "success");
      this.words = this.words.filter((word) => word._id !== id);
    },
    // Moves to the previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // Moves to the next page
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
   
    exportToCSV() {
  // Create Header (column names)
  const headers = ["English", "German", "French"];
  const rows = this.filteredWords.map(word => [ // Create Rows
    word.english,
    word.german,
    word.french,
  ]);

  // Create Content + Unicode BOM
  let csvContent = "\uFEFF" + headers.join(",") + "\n"
    + rows.map(e => e.join(",")).join("\n");

  // Create link to download
  const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "vocab.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
},

  },
    
  
  async mounted() {
    // Fetch words from the API when the component is mounted
    this.words = await api.getWords();
    this.words.reverse();
  },
  
};
</script>

<style scoped>
/* Styling for the word list grid */
.word-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* Styling for individual word cards */
.word-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styling for word card headings */
.word-card h3 {
  margin-top: 0;
  color: #34495e;
}

/* Styling for action links */
.actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.actions a {
  color: #3498db;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
}

.actions a:hover {
  color: #2980b9;
}

/* Styling for pagination controls */
.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.pagination button:hover {
  background-color: #2980b9;
}

.pagination span {
  font-weight: bold;
}
</style>
