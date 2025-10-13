const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const DB_FILE = path.join(__dirname,'..','data','database.sqlite');
const dir = path.dirname(DB_FILE);
if (!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});

const db = new Database(DB_FILE);

function init(){
  db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, role TEXT, last_activity TEXT
  )`).run();
  db.prepare(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, address TEXT, sid TEXT
  )`).run();
  db.prepare(`CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT, no_ticket TEXT UNIQUE, customer_id INTEGER, lokasi TEXT, problem TEXT, tindakan TEXT, status TEXT, created_by INTEGER, created_at TEXT
  )`).run();
  db.prepare(`CREATE TABLE IF NOT EXISTS attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT, ticket_id INTEGER, filename TEXT
  )`).run();

  const admin = db.prepare('SELECT * FROM users WHERE email = ?').get('admin@mosaik.local');
  if(!admin){
    db.prepare('INSERT INTO users (name,email,password,role,last_activity) VALUES (?,?,?,?,?)')
      .run('Super Admin','admin@mosaik.local', bcrypt.hashSync('admin123',10),'admin', new Date().toISOString());
    db.prepare('INSERT INTO users (name,email,password,role,last_activity) VALUES (?,?,?,?,?)')
      .run('Manager','manager@mosaik.local', bcrypt.hashSync('manager123',10),'manager', new Date().toISOString());
    db.prepare('INSERT INTO users (name,email,password,role,last_activity) VALUES (?,?,?,?,?)')
      .run('NOC','noc@mosaik.local', bcrypt.hashSync('noc123',10),'tech', new Date().toISOString());
    console.log('Seeded default users');
  }
  console.log('Database ready');
}

module.exports = {
  init,
  run(sql, params=[]){ return db.prepare(sql).run(params); },
  get(sql, params=[]){ return db.prepare(sql).get(params); },
  all(sql, params=[]){ return db.prepare(sql).all(params); }
};
