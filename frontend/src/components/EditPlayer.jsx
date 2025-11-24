import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';

const EditPlayer = ({ player, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: 'ST',
    rating: 75,
    club: '',
    nation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = 'http://localhost:3000/api';

  const positions = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST', 'CF'];

  // Populate form with player data
  useEffect(() => {
    if (player) {
      setFormData({
        name: player.name,
        position: player.position,
        rating: player.rating,
        club: player.club,
        nation: player.nation
      });
    }
  }, [player]);

  const handleSubmit = async () => {
    setError('');
    
    // Validation
    if (!formData.name.trim() || !formData.club.trim() || !formData.nation.trim()) {
      setError('All fields are required');
      return;
    }

    if (formData.rating < 1 || formData.rating > 99) {
      setError('Rating must be between 1 and 99');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/players/${player.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update player');
      }

      // Success
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error on change
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <Edit2 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Edit Player</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block text-sm text-purple-300 mb-2">Player Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g., Cristiano Ronaldo"
            disabled={loading}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-purple-300 mb-2">Position *</label>
            <select
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-purple-300 mb-2">Overall Rating *</label>
            <input
              type="number"
              value={formData.rating}
              onChange={(e) => handleChange('rating', parseInt(e.target.value) || 0)}
              min="1"
              max="99"
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-purple-300 mb-2">Club *</label>
          <input
            type="text"
            value={formData.club}
            onChange={(e) => handleChange('club', e.target.value)}
            placeholder="e.g., Manchester United"
            disabled={loading}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm text-purple-300 mb-2">Nation *</label>
          <input
            type="text"
            value={formData.nation}
            onChange={(e) => handleChange('nation', e.target.value)}
            placeholder="e.g., Portugal"
            disabled={loading}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Player'}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlayer;
