const express = require('express');
const router = express.Router();
const db = require('../models/db');
const PDFDocument = require('pdfkit');

function auth(req,res,next){ if(!req.session.user) return res.redirect('/login'); next(); }

router.get('/', auth, (req,res)=>{
  res.render('reports/index', {});
});

router.get('/export', auth, (req,res)=>{
  const type = req.query.type || 'tickets';
  const format = req.query.format || 'csv';
  const from = req.query.from || null;
  const to = req.query.to || null;
  const status = req.query.status || null;

  const whereClauses = [];
  const params = [];
  if(from){ whereClauses.push('date(created_at) >= date(?)'); params.push(from); }
  if(to){ whereClauses.push('date(created_at) <= date(?)'); params.push(to); }
  if(status){ whereClauses.push('status = ?'); params.push(status); }

  const where = whereClauses.length ? ('WHERE '+whereClauses.join(' AND ')) : '';

  if(type === 'customers'){
    const rows = db.all('SELECT * FROM customers '+where+' ORDER BY name', params);
    if(format === 'csv'){
      let csv = 'id,name,sid,phone,address\n';
      for(const r of rows) csv += `${r.id},"${r.name.replace(/"/g,'""')}","${r.sid}","${r.phone}","${(r.address||'').replace(/"/g,'""')}"\n`;
      res.setHeader('Content-Type','text/csv'); res.setHeader('Content-Disposition','attachment; filename=customers.csv'); return res.send(csv);
    } else {
      const doc = new PDFDocument({margin:30, size:'A4'});
      res.setHeader('Content-Type','application/pdf'); res.setHeader('Content-Disposition','attachment; filename=customers.pdf');
      doc.fontSize(18).text('Customers Report', {align:'center'}); doc.moveDown();
      rows.forEach(r=>{ doc.fontSize(12).text(`${r.name} (${r.sid})`); doc.fontSize(10).text(`Phone: ${r.phone} - ${r.address}`); doc.moveDown(); });
      doc.pipe(res); doc.end();
    }
  } else {
    const sql = 'SELECT t.*, c.name as customer_name, c.sid as customer_sid FROM tickets t LEFT JOIN customers c ON c.id = t.customer_id '+where+' ORDER BY t.id DESC';
    const rows = db.all(sql, params);
    if(format === 'csv'){
      let csv = 'id,no_ticket,customer,customer_sid,lokasi,problem,tindakan,status,created_at\n';
      for(const r of rows) csv += `${r.id},${r.no_ticket},"${(r.customer_name||'').replace(/"/g,'""')}","${(r.customer_sid||'').replace(/"/g,'""')}","${(r.lokasi||'').replace(/"/g,'""')}","${(r.problem||'').replace(/"/g,'""')}","${(r.tindakan||'').replace(/"/g,'""')}",${r.status},${r.created_at}\n`;
      res.setHeader('Content-Type','text/csv'); res.setHeader('Content-Disposition','attachment; filename=tickets.csv'); return res.send(csv);
    } else {
      const doc = new PDFDocument({margin:30, size:'A4'});
      res.setHeader('Content-Type','application/pdf'); res.setHeader('Content-Disposition','attachment; filename=tickets.pdf');
      doc.fontSize(18).text('Tickets Report', {align:'center'}); doc.moveDown();
      rows.forEach(r=>{
        doc.fontSize(12).text(`${r.no_ticket} - ${r.status} - ${r.created_at}`);
        doc.fontSize(11).text(`Customer: ${r.customer_name || '-'} (${r.customer_sid || '-'})`);
        doc.fontSize(10).text(`Lokasi: ${r.lokasi}`);
        doc.fontSize(10).text(`Problem: ${r.problem}`);
        doc.fontSize(10).text(`Tindakan: ${r.tindakan}`);
        doc.moveDown();
      });
      doc.pipe(res); doc.end();
    }
  }
});

module.exports = router;
