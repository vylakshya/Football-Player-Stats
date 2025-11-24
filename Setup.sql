-- Create database
CREATE DATABASE IF NOT EXISTS player_stats_db;
USE player_stats_db;

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(10) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 99),
  club VARCHAR(100) NOT NULL,
  nation VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_position ON players(position);
CREATE INDEX idx_rating ON players(rating);
CREATE INDEX idx_nation ON players(nation);

-- Insert sample data
INSERT INTO players (name, position, rating, club, nation) VALUES
('Kylian Mbappé', 'ST', 91, 'Real Madrid', 'France'),
('Erling Haaland', 'ST', 91, 'Manchester City', 'Norway'),
('Kevin De Bruyne', 'CM', 91, 'Manchester City', 'Belgium'),
('Virgil van Dijk', 'CB', 90, 'Liverpool', 'Netherlands'),
('Thibaut Courtois', 'GK', 90, 'Real Madrid', 'Belgium'),
('Bruno Fernandes', 'CAM', 88, 'Manchester United', 'Portugal'),
('Mohamed Salah', 'RW', 89, 'Liverpool', 'Egypt'),
('Harry Kane', 'ST', 90, 'Bayern Munich', 'England'),
('Joshua Kimmich', 'CDM', 89, 'Bayern Munich', 'Germany'),
('Alisson Becker', 'GK', 89, 'Liverpool', 'Brazil'),
('Rodri', 'CDM', 91, 'Manchester City', 'Spain'),
('Jude Bellingham', 'CM', 90, 'Real Madrid', 'England'),
('Vinicius Junior', 'LW', 90, 'Real Madrid', 'Brazil'),
('Bukayo Saka', 'RW', 87, 'Arsenal', 'England'),
('Declan Rice', 'CDM', 87, 'Arsenal', 'England');

-- Verify data
SELECT * FROM players ORDER BY rating DESC;
