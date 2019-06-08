import express from 'express';
var router = express.Router();

import jwt from 'express-jwt';

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlAdmin = require('../controllers/admin');
var ctrlCourse = require('../controllers/course');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// admin
router.get('/users', auth, ctrlAdmin.getAllUsers);
router.get('/users/:id', auth, ctrlAdmin.getUserById);
router.post('/users/edit/:id', auth, ctrlAdmin.editUser);
router.get('/users/delete/:id', auth, ctrlAdmin.deleteUser);


//course
router.get('/course', auth, ctrlCourse.getAllCourses);
router.post('/course', auth, ctrlCourse.addCourse);
router.get('/course/:id', auth, ctrlCourse.getCourseById);
router.post('/course/edit/:id', auth, ctrlCourse.editCourse);
router.get('/course/intructor/:id', auth, ctrlCourse.getAllCoursesByInstrctor)

export default router;