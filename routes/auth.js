const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcryptjs');

router.get('/login', (req,res)=> res.render('auth/login',{error:null}));
router.post('/login',(req,res)=>{
  const {email,password} = req.body;
  try{
    const user = db.get('SELECT * FROM users WHERE email = ?', [email]);
    if(!user) return res.render('auth/login',{error:'Email tidak ditemukan'});
    if(!bcrypt.compareSync(password, user.password)) return res.render('auth/login',{error:'Password salah'});
    req.session.user = {id:user.id,name:user.name,email:user.email,role:user.role};
    db.run('UPDATE users SET last_activity = ? WHERE id = ?', [new Date().toISOString(), user.id]);
    res.redirect('/dashboard');
  }catch(err){
    console.error(err);
    res.render('auth/login',{error:'Server error'});
  }
});

router.get('/logout',(req,res)=>{ req.session.destroy(()=>res.redirect('/login')); });

router.get('/register',(req,res)=> res.render('auth/register',{error:null}));
router.post('/register',(req,res)=>{
  const {name,email,password,role} = req.body;
  try{
    const hash = bcrypt.hashSync(password,10);
    db.run('INSERT INTO users (name,email,password,role,last_activity) VALUES (?,?,?,?,?)', [name,email,hash, role||'tech', new Date().toISOString()]);
    res.redirect('/login');
  }catch(err){
    console.error(err);
    res.render('auth/register',{error:'Gagal registrasi (email mungkin terpakai)'});
  }
});

router.get('/profile',(req,res)=>{
  if(!req.session.user) return res.redirect('/login');
  const user = db.get('SELECT * FROM users WHERE id = ?', [req.session.user.id]);
  res.render('auth/profile',{user});
});

router.post('/profile/password',(req,res)=>{
  if(!req.session.user) return res.redirect('/login');
  const {oldpass,newpass} = req.body;
  const user = db.get('SELECT * FROM users WHERE id = ?', [req.session.user.id]);
  if(!user) return res.redirect('/login');
  if(!bcrypt.compareSync(oldpass, user.password)) return res.render('auth/profile',{user, error:'Password lama salah'});
  db.run('UPDATE users SET password = ? WHERE id = ?', [bcrypt.hashSync(newpass,10), user.id]);
  res.render('auth/profile',{user, success:'Password diubah'});
});

module.exports = router;
