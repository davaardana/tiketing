const express = require('express');
const router = express.Router();
const db = require('../models/db');

function auth(req,res,next){ if(!req.session.user) return res.redirect('/login'); next(); }

router.get('/', auth, (req,res)=>{
  const q = req.query.q || '';
  let customers = q ? db.all('SELECT * FROM customers WHERE name LIKE ? OR sid LIKE ? ORDER BY name', ['%'+q+'%','%'+q+'%']) : db.all('SELECT * FROM customers ORDER BY name');
  res.render('customers/index',{customers, q});
});

router.get('/add', auth, (req,res)=> res.render('customers/add',{error:null}));
router.post('/add', auth, (req,res)=>{
  const {name, sid, phone, address} = req.body;
  try{ db.run('INSERT INTO customers (name,sid,phone,address) VALUES (?,?,?,?)', [name,sid,phone,address]); res.redirect('/customers'); }
  catch(err){ console.error(err); res.render('customers/add',{error:'Gagal simpan'}); }
});

router.get('/search', auth, (req,res)=>{
  const q = req.query.q || '';
  const rows = db.all('SELECT id,name,sid,address FROM customers WHERE name LIKE ? OR sid LIKE ? LIMIT 20', ['%'+q+'%','%'+q+'%']);
  res.json(rows);
});

module.exports = router;
