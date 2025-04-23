const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

exports.list_all_words = (req, res) => {
  Vocab.find({}, (err, words) => {
    if (err) res.send(err);
    res.json(words);
  });
};

exports.create_a_word = (req, res) => {
  const newWord = new Vocab(req.body);
  newWord.save((err, word) => {
    console.log(err);
    if (err) {
      if (err.code === 11000) {
        // Duplicate key error
        res.status(400).send({ message: 'Duplicate word entry. The combination of words must be unique.' });
      } else {
        res.send(err);
      }
    } else {
      res.json(word);
    }
  });
};

exports.read_a_word = (req, res) => {
  Vocab.findById(req.params.wordId, (err, word) => {
    if (err) res.send(err);
    res.json(word);
  });
};

exports.update_a_word = (req, res) => {
  Vocab.findOneAndUpdate(
    { _id: req.params.wordId },
    req.body,
    { new: true, runValidators: true },
    (err, word) => {
      if (err) {
        if (err.code === 11000) {
          // Duplicate key error
          res.status(400).send({ message: 'Duplicate word entry. The combination of words must be unique.' });
        } else {
          res.send(err);
        }
      } else {
        res.json(word);
      }
    }
  );
};

exports.delete_a_word = (req, res) => {
  Vocab.deleteOne({ _id: req.params.wordId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'Word successfully deleted',
      _id: req.params.wordId
    });
  });
};
