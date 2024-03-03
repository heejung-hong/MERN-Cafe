const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  // options objects here
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) { // source document and return value
      delete ret.password;
      return ret; // return document that was modified
    }
  }
});

// hashing is not reversible.  The password will be hashed and compare the hashes for validation.
// SALT is appended to the hash to prevent hacking.
// mongoose middleware, a pre-saved hook.  Save operator
userSchema.pre('save', async function(next) { // next argument called
  // this keyword is the user document
  if (!this.isModified('password')) return next(); 
  // Replace the password with the computed hash instead
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
})

module.exports = mongoose.model('User', userSchema);