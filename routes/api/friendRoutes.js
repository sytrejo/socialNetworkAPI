const router = require('express').Router();
const {
  getFriends,
  getSingleFriend,
  addFriend,
  deleteFriend,
  updateFriend
} = require('../../controllers/friendController.js');


router.route('/').get(getFriends).post(addFriend);

router
  .route('/:friendId')
  .get(getSingleFriend)
  .put(updateFriend)
  .delete(deleteFriend);

module.exports = router;