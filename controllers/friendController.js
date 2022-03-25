const { Friend, User } = require('../models');

module.exports = {
    //Get aall friends
    getFriends(req, res){
        Friend.find()
        .then((friend) => res.json(friend))
        .catch((err) => res.status(500).json(err));
    },

    //Get a friend
    getOneFriend(req, res){
        Friend.findOne({_id: req.params.friendId})
        .select('-__V')
        .then((friend) => 
        !friend
        ? res.status(404).json({message: 'No friend with that ID' })
        : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Add a friend
    addFriend(req, res){
        Friend.creatte(req.body)
            .then((friend) => res.json(friend))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
        });
    },

    // Update friends
    updateFriend(req, res){
        Friend.findOneAndUpdate(
            { _id: req.params.friendId},
            {$set: req.body },
            { runValidators: true, new: true }
        )
        .then((friend) => 
        !friend
        ? res.status(404).json({message: 'No friend with this id!'})
        : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
    },

};