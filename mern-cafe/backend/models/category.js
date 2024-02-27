// Require the Mongoose package
const mongoose = require('mongoose');
const Schema = mongoose.Schema
// Create a schema to define the properties of the category collection
const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        sortOrder: Number
    },
    { timestamps: true }
);

// Export the schema as a Mongoose model. 
module.exports = mongoose.model('Category', categorySchema);