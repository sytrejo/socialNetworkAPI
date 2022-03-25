const { Thoughts } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought  
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createReaction(req, res) {
    Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, {$push: {reactions: req.body}})
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {_id: req.params.reactionId}}})
    .then((thought) =>
      !thought ? res.status(404).json({ message: 'No such reaction exists' }) : res.status(200).json({message: 'Reaction deleted!', thought})
    ).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
}