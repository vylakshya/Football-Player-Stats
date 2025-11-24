import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Search, Filter } from 'lucide-react';

const PlayerList = ({ onEdit }) => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [filters, setFilters] = useState({ position: 'all', minRating: 0, nation: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:3000/api';

  // Fetch players
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/players`);
      const data = await res.json();
      setPlayers(data);
      setFilteredPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...players];
    
    if (filters.position !== 'all') {
      filtered = filtered.filter(p => p.position === filters.position);
    }
    
    if (filters.minRating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.minRating);
    }
    
    if (filters.nation !== 'all') {
      filtered = filtered.filter(p => p.nation === filters.nation);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.club.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPlayers(filtered);
  }, [filters, searchTerm, players]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this player?')) return;
    
    try {
      await fetch(`${API_BASE}/players/${id}`, { method: 'DELETE' });
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 90) return 'bg-yellow-500/20 text-yellow-300';
    if (rating >= 85) return 'bg-green-500/20 text-green-300';
    if (rating >= 80) return 'bg-blue-500/20 text-blue-300';
    return 'bg-gray-500/20 text-gray-300';
  };

  const positions = [...new Set(players.map(p => p.position))];
  const nations = [...new Set(players.map(p => p.nation))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading players...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Players" value={players.length} />
        <StatCard 
          label="Avg Rating" 
          value={(players.reduce((sum, p) => sum + p.rating, 0) / players.length || 0).toFixed(1)} 
        />
        <StatCard label="Top Rating" value={Math.max(...players.map(p => p.rating), 0)} />
        <StatCard label="Filtered" value={filteredPlayers.length} />
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
        <div className="flex items-center gap-2 mb-4 text-white">
          <Filter className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-purple-300 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name or club..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-purple-300 mb-2">Position</label>
            <select
              value={filters.position}
              onChange={(e) => setFilters({ ...filters, position: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Positions</option>
              {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-purple-300 mb-2">Min Rating</label>
            <input
              type="number"
              value={filters.minRating}
              onChange={(e) => setFilters({ ...filters, minRating: parseInt(e.target.value) || 0 })}
              placeholder="0"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-purple-300 mb-2">Nation</label>
            <select
              value={filters.nation}
              onChange={(e) => setFilters({ ...filters, nation: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Nations</option>
              {nations.map(nation => <option key={nation} value={nation}>{nation}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Player Table */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Position</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Club</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Nation</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-purple-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{player.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {player.position}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRatingColor(player.rating)}`}>
                      {player.rating}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{player.club}</td>
                  <td className="px-6 py-4 text-gray-300">{player.nation}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onEdit(player)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors mr-2"
                    >
                      <Edit2 className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
    <p className="text-purple-300 text-sm mb-1">{label}</p>
    <p className="text-white text-3xl font-bold">{value}</p>
  </div>
);

export default PlayerList;
