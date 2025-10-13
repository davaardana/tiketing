const express = require('express');
const router = express.Router();
const db = require('../models/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname,'..','public','uploads');
if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir,{recursive:true});

const storage = multer.diskStorage({
  destination:(req,file,cb)=> cb(null, uploadDir),
  filename:(req,file,cb)=> cb(null, Date.now()+'-'+Math.round(Math.random()*1e9)+path.extname(file.originalname))
});
const upload = multer({storage, limits:{fileSize:5*1024*1024}});

function auth(req,res,next){ if(!req.session.user) return res.redirect('/login'); next(); }

function generateTicketNo(){
  const date = new Date(); const ymd = date.toISOString().slice(0,10).replace(/-/g,'');
  const rows = db.all('SELECT no_ticket FROM tickets WHERE no_ticket LIKE ?', [ymd+'-%']);
  const seq = String(rows.length + 1).padStart(3,'0');
  return `${ymd}-${seq}`;
}

router.get('/', auth, (req,res)=>{
  const tickets = db.all('SELECT t.*, c.name as customer_name FROM tickets t LEFT JOIN customers c ON c.id = t.customer_id ORDER BY t.id DESC');
  res.render('tickets/index',{tickets});
});

router.get('/new', auth, (req,res)=>{
  if(req.session.user.role === 'tech') return res.send('Akses ditolak: teknisi tidak dapat membuat tiket.');
  const customers = db.all('SELECT * FROM customers ORDER BY name');
  res.render('tickets/new',{customers, error:null});
});

router.post('/create', auth, upload.array('photos',5), (req,res)=>{
  if(req.session.user.role === 'tech') return res.send('Akses ditolak');
  const {customer_id, lokasi, problem, tindakan} = req.body;
  try{
    const no_ticket = generateTicketNo();
    const created_at = new Date().toISOString();
    const info = db.run('INSERT INTO tickets (no_ticket,customer_id,lokasi,problem,tindakan,status,created_by,created_at) VALUES (?,?,?,?,?,?,?,?)',
      [no_ticket, customer_id||null, lokasi, problem, tindakan, 'open', req.session.user.id, created_at]);
    const ticketId = info.lastInsertRowid;
    if(req.files && req.files.length){
      for(const f of req.files) db.run('INSERT INTO attachments (ticket_id, filename) VALUES (?,?)', [ticketId, path.basename(f.path)]);
    }
    res.redirect('/tickets');
  }catch(err){ console.error(err); res.send('Gagal membuat tiket'); }
});

router.get('/view/:id', auth, (req,res)=>{
  const id = req.params.id;
  const ticket = db.get('SELECT t.*, c.name as customer_name, c.sid as customer_sid FROM tickets t LEFT JOIN customers c ON c.id = t.customer_id WHERE t.id = ?', [id]);
  if(!ticket) return res.send('Ticket not found');
  const files = db.all('SELECT * FROM attachments WHERE ticket_id = ?', [id]);
  res.render('tickets/view',{ticket, files});
});

router.post('/status/:id', auth, (req,res)=>{
  const id = req.params.id; const {status} = req.body;
  db.run('UPDATE tickets SET status = ? WHERE id = ?', [status, id]);
  res.redirect('/tickets');
});

module.exports = router;
