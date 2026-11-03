const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bookSchema = new Schema({
    title: {
        type: String,
        required:true
    },
   auther: {
    type: String,
    required: true
   },
    
   publishedYear: {
    type: Date,
    required: true
   },
   genre: {
    type: String,
    required: true
   }

},{timestamps: true});

module.exports = mongoose.model('Book',bookSchema);
