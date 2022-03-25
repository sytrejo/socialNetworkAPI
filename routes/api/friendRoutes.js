const router = require('express').Router();
const {
  getFriends,
  getSingleFriend,
  addFriend,
  deleteFriend,
  updateFriend
} = require('../../controllers/friendController.js');

// /api/friends
router.route('/').get(getFriends).post(addFriend);

// /api/courses/:friendId
router
  .route('/:friendId')
  .get(getSingleFriend)
  .put(updateFriend)
  .delete(deleteFriend);

module.exports = router;