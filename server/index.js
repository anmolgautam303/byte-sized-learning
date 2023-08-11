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
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k-0613",
      messages: [{role: "user", content: prompt}],
      temperature: .8,
    });

    res.status(200).json({ result: chatCompletion?.data?.choices[0]?.message?.content });
  } catch (error) {
    console.error('error anmol', error);
    res.status(500).json({ error: error });
  }
});

// Start the server
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
