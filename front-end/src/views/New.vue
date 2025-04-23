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
        async createOrUpdate(word) {
            try {
                await api.createWord(word);
                this.flash('Word added successfully!', 'success');
                this.$router.push('/words');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message); // Hiển thị thông báo từ server
                } else {
                    console.error('Unknown error:', error);
                    alert('An error occurred while adding the word.');
                }
            }
        }
    }
};
</script>
