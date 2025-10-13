const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models/db');

const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const customerRoutes = require('./routes/customers');
const reportRoutes = require('./routes/reports');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'tiketing-secret', resave:false, saveUninitialized:false }));

app.use(function(req,res,next){
  res.locals.currentUser = req.session.user;
  next();
});

app.use('/', authRoutes);
app.use('/tickets', ticketRoutes);
app.use('/customers', customerRoutes);
app.use('/reports', reportRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', (req,res)=> res.redirect('/dashboard'));

db.init();

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
