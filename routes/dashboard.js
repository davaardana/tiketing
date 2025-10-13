const express = require('express');
const router = express.Router();
const db = require('../models/db'];
function auth(req,res,next){ if(!req.session.user) return res.redirect('/login'); next(); }

router.get('/', auth, (req,res)=>{
  const counts = db.all("SELECT status, COUNT(*) as cnt FROM tickets GROUP BY status");
  const monthly = db.all("SELECT substr(created_at,1,7) as ym, COUNT(*) as cnt FROM tickets GROUP BY ym ORDER BY ym DESC LIMIT 12");
  res.render('dashboard/index',{counts, monthly});
});

module.exports = router;
