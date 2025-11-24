const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all players
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM players ORDER BY rating DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

// GET single player by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM players WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ error: 'Failed to fetch player' });
  }
});

// POST new player
router.post('/', async (req, res) => {
  const { name, position, rating, club, nation } = req.body;
  
  // Validation
  if (!name || !position || !rating || !club || !nation) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (rating < 1 || rating > 99) {
    return res.status(400).json({ error: 'Rating must be between 1 and 99' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO players (name, position, rating, club, nation) VALUES (?, ?, ?, ?, ?)',
      [name, position, rating, club, nation]
    );
    
    res.status(201).json({
      id: result.insertId,
      name,
      position,
      rating,
      club,
      nation,
      message: 'Player created successfully'
    });
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Failed to create player' });
  }
});

// PUT update player
router.put('/:id', async (req, res) => {
  const { name, position, rating, club, nation } = req.body;
  const { id } = req.params;
  
  // Validation
  if (!name || !position || !rating || !club || !nation) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (rating < 1 || rating > 99) {
    return res.status(400).json({ error: 'Rating must be between 1 and 99' });
  }
  
  try {
    const [result] = await pool.query(
      'UPDATE players SET name = ?, position = ?, rating = ?, club = ?, nation = ? WHERE id = ?',
      [name, position, rating, club, nation, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    res.json({
      id: parseInt(id),
      name,
      position,
      rating,
      club,
      nation,
      message: 'Player updated successfully'
    });
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ error: 'Failed to update player' });
  }
});

// DELETE player
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM players WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({ error: 'Failed to delete player' });
  }
});

module.exports = router;
