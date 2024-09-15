import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
import fs from 'fs';

// TODO: Define route to serve index.html  

const searchHistoryPath = path.join(__dirname, '/Users/colbyjanel/bootcamp/Challenge-9-WeatherDashboard/Develop 3/searchHistory.json');

// HTML route to serve index.html
router.get('*', (_req: Express.Request, res: Express.Response) => {
    (res as any).sendFile(path.join(__dirname, '/Users/colbyjanel/bootcamp/Challenge-9-WeatherDashboard/Develop 3/client/index.html'));
});

// API route to get search history
router.get('/api/weather/history', (_req: Express.Request, res) => {
    fs.readFile(searchHistoryPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read search history' });
        }
        res.json(JSON.parse(data));
        return; // Add a return statement here
    });
});

// API route to save a new city and return weather data
router.post('/api/weather', (req, res) => {
    const { city } = req.body;
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    fs.readFile(searchHistoryPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read search history' });
        }

        const searchHistory = JSON.parse(data);
        const newEntry = { id: uuidv4(), city };

        searchHistory.push(newEntry);

        fs.writeFile(searchHistoryPath, JSON.stringify(searchHistory, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save search history' });
            }
        
            // Fetch weather data for the city (you need to implement this function)
            fetchWeatherData(city)
                .then(weatherData => res.json(weatherData))
                .catch(() => res.status(500).json({ error: 'Failed to fetch weather data' }));
        
            return; // Add a return statement here
        });
        
        return; // Add a return statement here
    });

    return; // Add a return statement here
});

// Function to fetch weather data (you need to implement this)
async function fetchWeatherData(city: string) {
    // Implement your logic to fetch weather data from an API
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9f5a6aa2daa522156cf86b3e7ded068a
`).then(response => response.json());
    return {}; // Placeholder
}

export default router;
