'use strict'

const db = require('../db')

module.exports = {
    read: (req, res) =>{
        const sql = "select * from data_penduduk"
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil",
                data: result
            })
        })
    },

    add: (req, res) =>{
        const nama = req.body.nama
        const alamat = req.body.alamat
        const sql =  `insert into data_penduduk (nama, alamat) values ('${nama}','${alamat}')`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menambahkan data"
            })
        })
    },

    get: (req, res) =>{
        const id = req.params.id

        const sql =  `select * from data_penduduk where id = '${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                result
            })
        })
    },

    edit: (req, res) =>{
        const id = req.params.id
        const nama = req.body.nama
        const alamat = req.body.alamat
        const sql = `update data_penduduk set nama='${nama}',alamat='${alamat}' where id='${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil mengubah data"
            })
        })
    },

    delete: (req, res) =>{
        const id = req.params.id
        const sql = `delete from data_penduduk where id='${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menghapus data"
            })
        })
    }



   

    
}