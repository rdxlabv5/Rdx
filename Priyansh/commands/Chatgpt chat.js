// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

let chatOn = false;

app.use(bodyParser.json());

app.post('/toggle-chat', (req, res) => {
    const status = req.body.status;

    if (status === 'on') {
        chatOn = true;
        res.send('Chat is ON');
    } else if (status === 'off') {
        chatOn = false;
        res.send('Chat is OFF');
    } else {
        res.status(400).send('Use "on" or "off"');
    }
});

app.post('/chat', async (req, res) => {
    if (!chatOn) {
        return res.send({ reply: 'Chat is turned off.' });
    }

    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const reply = response.data.choices[0].message.content.trim();
        res.send({ reply });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send({ error: 'Error talking to ChatGPT' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
