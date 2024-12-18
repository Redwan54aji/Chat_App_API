//import express from 'express';
const express = require('express')
const route = express.Router();
const {
    loginUser,
    logoutUser,
    sigupUser
} = require('../controller/auth.controoller')
route.post("/login", loginUser)
route.post('/logout', logoutUser)
route.post('/signup', sigupUser)

module.exports = route;