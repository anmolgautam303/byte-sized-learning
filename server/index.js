const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { openApiKey } = require("./keys");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: openApiKey,
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;

  try {
    // Generate a response with ChatGPT
    const completion = await openai.createCompletion({
      engine: 'text-davinci-002',
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
    });
    // res.send(completion.data.choices[0].text);
    res.json({ text: completion.data.choices[0].text });
  } catch (error) {
    console.error('error anmol', error);
    res.status(500).json({ error: error });
  }
});

// Start the server
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
