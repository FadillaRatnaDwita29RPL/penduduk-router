'use strict'

const db = require('../db')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = '#$@^%$^%*&%$$@&'

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

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

        const {
            nama_lengkap,
            alamat,
            email,
            password,

        } = req.body
        if (!nama_lengkap, !email || !password) {
            res.status(402).json({
                message: "nama lengkap, email dan password harus diisi!"
            })
        }
        return db.query('insert into data_penduduk set ?', {
            nama_lengkap,
            alamat,
            email,
            password: hashPassword(password)
        }, (err, result) => {
            if (err) {
                return res.status(500).json({
                    err
                })
            }
            return res.json({
                message: 'registrasi berhasil',
                data: result
            })
        })
        // const nama = req.body.nama
        // const alamat = req.body.alamat
        // const sql =  `insert into data_penduduk (nama, alamat) values ('${nama}','${alamat}')`
        // db.query(sql, (err, result) =>{
        //     if(err) throw err
        //     res.json({
        //         message: "Berhasil menambahkan data"
        //     })
        // })
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
        const password = req.body.password
        const email = req.body.email
        const pw = hashPassword(password)
        const sql = `update data_penduduk set nama_lengkap='${nama}',alamat='${alamat}', password='${pw}', email='${email}' where id='${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil mengubah data"
            })
        })
    },

    deletePenduduk: (req, res) =>{
        const id = req.params.id
        const sql = `delete from data_penduduk where id='${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menghapus data"
            })
        })
    }, 

    login: (req, res) => {
        const {
            email, 
            password
        } = req.body
        
        if( !email || !password) res.status(402).json({message: "email dan password harus diisi."})

        return db.query('select * from data_penduduk where email = ?', email , (err, result)=>{
            if(err) return res.status(500).json({err})

            const user = result[0]
            if(typeof user === 'undefined')return res.status(401).json({message: "user tidak ditemukan"})
            if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: "email atau password tidak sesuai"})

            const token = jwt.sign({data: user}, secret)

            return res.json({message: 'login berhasil. silahkan menggunakan token dibawah ini untuk mengakses endpoint private lain', token})
        })

    }




   

    
}