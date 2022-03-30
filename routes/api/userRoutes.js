const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
  addThought, 
  removeThought
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friend/:friendId').post(addFriend);

///api/users/:userId/
router.route('/:userId').put(updateUser);

// /api/users/:userId/friend/:friendId
router.route('/:userId/friend/:friendId').delete(removeFriend);


module.exports = router;