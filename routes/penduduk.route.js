'use strict' //hanya menjalankan data di file ini saja

const express = require('express')
const pendudukController = require('../controllers/penduduk.controller')
const router =  new express.Router();

router.get("/", pendudukController.read)
router.post("/", pendudukController.add)
router.get("/:id", pendudukController.get)
router.put("/:id", pendudukController.edit)
router.delete("/:id", pendudukController.delete)

module.exports = router