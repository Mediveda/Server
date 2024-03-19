// routes/search.js
const User = require('../../models/user');


// Search endpoint
exports.Search = async (req, res) => {
  const userId = req.params.id;
  const searchQuery = req.query.q;

  if (!searchQuery) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Search medicines for the user
    const medicines = user.stock.filter(item => {
      return item.medecineName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (medicines.length === 0) {
      return res.json({ message: 'No medicines found matching the search query for the user' });
    }

    return res.json({ medicines });
  } catch (error) {
    console.error('Error searching medicines:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};