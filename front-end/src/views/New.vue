<template>
    <div>
        <h1>Add New Word</h1>
        <!-- Use word-form component to create a new word -->
        <word-form @createOrUpdate="createOrUpdate" :word="this.word"></word-form>
    </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
    name: 'new-word',
    components: {
        'word-form': WordForm
    },
    data() {
        return {
            word: {} // Initialize word object
        };
    },
    methods: {
        // Handle create or update word
        createOrUpdate: async function(word) {
            await api.createWord(word);
            this.flash('Word added successfully!', 'success'); // Show success message
            this.$router.push('/words'); // Redirect to the words list
        }
    }
};
</script>
