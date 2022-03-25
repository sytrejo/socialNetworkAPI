const { Schema, model } = require('mongoose');
const friendSchema = require('./Friends').schema;
const thoughtsSchema = require('./Thoughts').schema;

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, 
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      //validation of email address using Mongoose's matching validation
    },
    thoughts: [thoughtsSchema],//array of thought ids
    friends: [friendSchema]//array of user ids of friends
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Creating a virtual property `friendCount`
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;