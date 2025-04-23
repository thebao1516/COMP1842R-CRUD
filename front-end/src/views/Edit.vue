<template>
    <div>
        <h1>Edit Word</h1>
        <!-- Use word-form component to edit a word -->
        <word-form @createOrUpdate="createOrUpdate" :word="this.word"></word-form>
    </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
    name: 'edit',
    components: {
        'word-form': WordForm
    },
    data() {
        return {
            word: {} // Initialize word object
        };
    },
    async mounted() {
        // Fetch the word to edit using the ID from the route params
        this.word = await api.getWord(this.$route.params.id);
    },
    methods: {
        // Handle create or update word
        createOrUpdate: async function(word) {
            await api.updateWord(word);
            this.flash('Word updated successfully!', 'success'); // Show success message
            this.$router.push(`/words/${word._id}`); // Redirect to the updated word page
        }
    }
};
</script>
