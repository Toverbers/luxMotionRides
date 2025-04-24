const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
require('dotenv').config();


// Your Google API key and Place ID
const GOOGLE_API_KEY = 'AIzaSyAWAiOyldj2I1xfkBifO63Fjna6MrT_q_4'; // Replace with your key
//const PLACE_ID = 'ChIJzwzzE7TZTRARyhmfBCuqhaE'; // Replace with your place ID
const PLACE_ID = 'ChIJyYaRVOVNjUERT6FCmIS8La4'; // Replace with your place ID

router.get('/reviews', async (req, res) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${GOOGLE_API_KEY}`;

    const response = await axios.get(url);

    if (response.data && response.data.result && response.data.result.reviews) {
      res.json(response.data.result.reviews);
    } else {
      res.status(404).json({ error: 'No reviews found' });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});



module.exports = router;