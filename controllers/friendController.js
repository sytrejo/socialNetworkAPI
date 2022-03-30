const { Friend, User } = require('../models');

module.exports = {
  // Get all friends
  getFriends(req, res) {
    Friend.find()
      .then((friend) => res.json(friend))
      .catch((err) => res.status(500).json(err));
  },
  // Get a friend
  getSingleFriend(req, res) {
    Friend.findOne({ _id: req.params.friendId })
      .select('-__v')
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No friend with that ID' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a friend  //can you use create???aren't you just referencing a friend that exists? 
  addFriend(req, res) {
    Friend.create(req.body)
      .then((friend) => res.json(friend))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a friend
  deleteFriend(req, res) {
    console.log("test")
    Friend.findOneAndDelete({ _id: req.params.friendId })
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No friend with that ID' })
          : User.deleteMany({ _id: { $in: friend.user } })
      )
      .then(() => res.json({ message: 'Friend and user deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a friend
  updateFriend(req, res) {
    Friend.findOneAndUpdate(
      { _id: req.params.friendId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No friend with this id!' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
};