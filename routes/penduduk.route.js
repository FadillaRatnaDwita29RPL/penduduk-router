'use strict' //hanya menjalankan data di file ini saja

const express = require('express')
const pendudukController = require('../controllers/penduduk.controller')
const router =  new express.Router();
const {checkToken} = require("../authorization/token_validation")
// const {
//     read,
//     add, 
//     get, 
//     edit,
//     deletePenduduk 
// } = require('../controllers/penduduk.controller')

// router.route('/:id').get(get).delete(deletePenduduk).put(edit)
// router.route('/').get(read).post(checkToken,add)

router.get("/:id",checkToken, pendudukController.get)
router.put("/:id",checkToken, pendudukController.edit)
router.delete("/:id",checkToken, pendudukController.deletePenduduk)

router.get("/",checkToken, pendudukController.read)
router.post("/", pendudukController.add)
router.post("/login", pendudukController.login)

module.exports = router