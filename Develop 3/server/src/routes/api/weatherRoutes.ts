const router = express.Router();
// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

import express from 'express';
import axios from 'axios';

const searchHistory: string[] = [];

// POST Request with city name to retrieve weather data
router.post('/', async (req: express.Request, res: express.Response) => {
    const { city } = req.body;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const weatherData = response.data;

        // Save city to search history
        searchHistory.push(city);

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve weather data' });
    }

    return; // Add a return statement here
});

// GET search history
router.get('/history', async (_, res) => {
    res.json(searchHistory);
});

// DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    const { id } = req.params;
    const index = parseInt(id, 10);

    if (isNaN(index) || index < 0 || index >= searchHistory.length) {
        return res.status(400).json({ error: 'Invalid index' });
    }

    searchHistory.splice(index, 1);
    res.json({ message: 'City removed from search history' });

    return res; // Add a return statement here
});

export default router;
