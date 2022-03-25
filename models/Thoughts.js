const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true, 
      max: 280,
    },
    username: {
      type: String, 
      required: true, 
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate
      // getter method to format the timestamp on query
    },
  
  },
  {
    toJSON: {
      virtuals: true,
      getters: true, 
    },
  }
);

function formatDate(createdAt){
  return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a"); 
}

// thought model schema
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1, 
      max: 280, 
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate
    },
    username: {
      type: String,
      required: true, 
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: true,
  }
);

// virtual property `reactionCount`
thoughtsSchema.virtual('reactionCount').get(function () {
  if (this.reactions) return this.reactions.length;
  else return 0;
});

const Thoughts = model('thoughts', thoughtsSchema);
module.exports = Thoughts;