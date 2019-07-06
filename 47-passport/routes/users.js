var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/new', { user: new User() });
});

router.get('/show', async function(req, res, next) {
  console.log(req.query);

  const user = await User.findOne({
    email: req.query.user.email,
  });
  res.render('users/show', { user });
});

router.post('/delete_account', async function(req, res, next) {
  req.user.remove();
  req.logout();
  res.redirect('/');
});

router.get('/show_form', function(req, res, next) {
  res.render('users/show_form');
});


router.get('/:user_id', async function(req, res, next) {
  try {
    const id = new ObjectID(req.params.user_id);
    const user = await User.findOne(id);
    res.render('users/show', { user });
  } catch (err) {
    next(err);
  }
});


router.post('/', async function(req, res, next) {
  const user = new User(req.body);
  try {
    await user.save();
  } catch (err) {
    return res.render('users/new', { user });
  }

  req.login(user, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });  
});

module.exports = router;
