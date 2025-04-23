const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vocabSchema = new Schema(
  {
    english: {
      type: String,
      required: 'English word cannot be blank'
    },
    german: {
      type: String,
      required: 'German word cannot be blank'
    },
    french: {
      type: String,
      required: 'French word cannot be blank'
    }
  },
  { collection: 'vocab' }
);

// Tạo index kết hợp để đảm bảo bộ 3 từ là duy nhất
vocabSchema.index({ english: 1, german: 1, french: 1 }, { unique: true });

module.exports = mongoose.model('Vocab', vocabSchema);
