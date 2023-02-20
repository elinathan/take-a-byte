const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

const weatherApiKey = process.env.WEATHER_API_KEY;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/weather/:zip', (req, res) => {
    const zip = req.params.zip;
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&limit=1&appid=${weatherApiKey}`)
        .then(response => response.json())
        .then(data => {
            res.status(200).send(data);
            console.log(data);
        })
        .catch(error => console.error(error));
});

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/api/loc-fun-fact/:city', async (req, res) => {
    const city = req.params.city;
    if (city.length < 1 || city.length > 100) {
        res.status(400).send("City must be between 1 and 100 characters");
    }

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Complete the phrase People in ${city} are most likely to with in 1-2 sentences. Be sure to repeat the phrase so the response can be interpreted on its own. Be specific and creative.`,
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        res.status(200).send(response.data.choices[0].text);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the fun fact");
    }
    
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});