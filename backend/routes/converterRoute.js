const express = require('express');
require('dotenv').config();
const OpenAI = require('openai');
const converterRoute = express.Router();

const openai = new OpenAI({
    apiKey: process.env.openApiKey,
});


converterRoute.post('/convert', async (req, res) => {
    const {code, language} = req.body;
    try {
        const prompt_text = `Act as an expert code converter. Convert this code ${code} to ${language} language code and then generate it. Just generate the code only not the explanation.`;
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt_text }],
            model: "gpt-3.5-turbo",
        });

        res.status(200).send(chatCompletion.choices[0].message.content)
    } catch (error) {
        res.status(400).send({msg : error.message});
    }
})

converterRoute.post('/debug', async (req, res) => {
    const {code} = req.body;
    try {
        const prompt_text = `Act as an expert code debugger. Debug this code ${code}, if there is an error fix it and then generate it with proper explation.`;
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt_text }],
            model: "gpt-3.5-turbo",
        });

        res.status(200).send(chatCompletion.choices[0].message.content)
    } catch (error) {
        res.status(400).send({msg : error.message});
    }
})

converterRoute.post('/qualityCheck', async (req, res) => {
    const {code} = req.body;
    try {
        const prompt_text = `Act as an expert code quality checker. Check the quality of this code ${code} and give proper recommendations and feedback for it.`;
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt_text }],
            model: "gpt-3.5-turbo",
        });

        res.status(200).send(chatCompletion.choices[0].message.content)
    } catch (error) {
        res.status(400).send({msg : error.message});
    }
})

module.exports = converterRoute;