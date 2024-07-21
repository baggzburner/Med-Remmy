const express = require("express");
const router = express.Router();
const db = require("../models/connection")

// Import db if not already imported
// const db = require('../path/to/db'); // Replace with your db connection

// View prescriptions
router.get('/prescriptions', (req, res) => {
  const userId = req.session.user.id; // Assuming you have session middleware set up
  const sql = 'SELECT * FROM prescriptions WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) throw err;
    res.render('prescriptions', { prescriptions: results });
  });
});

// Add prescription
router.post('/prescriptions/add', (req, res) => {
  const { medication_name, dosage } = req.body;
  const userId = req.session.user.id; // Assuming you have session middleware set up
  const sql = 'INSERT INTO prescriptions (user_id, medication_name, dosage, time) VALUES (?, ?, ?)';
  db.query(sql, [userId, medication_name, dosage], (err, result) => {
    if (err) throw err;
    console.log('Prescription added');
    res.redirect('/prescriptions');
  });
});

// Edit prescription
router.post('/prescriptions/edit/:id', (req, res) => {
  const { medication_name, dosage } = req.body;
  const prescriptionId = req.params.id;
  const sql = 'UPDATE prescriptions SET medication_name = ?, dosage = time = ? WHERE id = ?';
  db.query(sql, [medication_name, dosage, prescriptionId], (err, result) => {
    if (err) throw err;
    console.log('Prescription updated');
    res.redirect('/prescriptions');
  });
});

// Delete prescription
router.get('/prescriptions/delete/:id', (req, res) => {
  const prescriptionId = req.params.id;
  const sql = 'DELETE FROM prescriptions WHERE id = ?';
  db.query(sql, [prescriptionId], (err, result) => {
    if (err) throw err;
    console.log('Prescription deleted');
    res.redirect('/prescriptions');
  });
});

// Default route (if needed)
router.get('/', (req, res) => {
  res.render("prescriptions");
});

module.exports = router;
