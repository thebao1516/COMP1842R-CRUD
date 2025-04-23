    import axios from 'axios';
    import Vue from 'vue';
    import VueFlashMessage from 'vue-flash-message';
    import 'vue-flash-message/dist/vue-flash-message.min.css'
// Configure Vue to use flash messages
    Vue.use(VueFlashMessage, {
        messageOptions: {
            timeout:3000,
            pauseOnInteract:true
        }
    });

    const baseURL = "http://localhost:3000/words/";
// Utility function to handle errors in API calls
const handleError = fn => async (...params) => {
    try {
        return await fn(...params);
    } catch (error) {
        console.log(error); // log vẫn giữ
        throw error; // rất quan trọng để component bắt được
    }
};

    export const api = {
        // Get a single word by ID
        getWord: handleError(async id => {
            const res = await axios.get(baseURL + id);
            return res.data;
        }),
        // Get all words
        getWords: handleError(async () => {
            const res = await axios.get(baseURL);
            return res.data;
        }),
         // Delete a word by ID
        deleteWord: handleError(async id => {
            const res = await axios.delete(baseURL + id);
            return res.data;
        }),
         // Create a new word
        createWord: handleError(async payload => {
            const res = await axios.post(baseURL, payload);
            return res.data;
        }),
         // Update an existing word
        updateWord: handleError(async payload => {
            const res = await axios.put(baseURL + payload._id, payload);
            return res.data;
        }),
    };
