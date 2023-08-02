

const OPENIA_KEY = "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";

const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()); // parse JSON requests
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));



const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);


app.post('/api/chat', async (req, res) => {
  const body = req.body
  const response = await fetch('https://api.openai.com/v1/chat/completions',{ 
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_KEY}`

        },
        body: JSON.stringify(data)
    })
  const json = await response.json()
  res.json(json)
  
});

app.post('/api/general', async (req, res) => {
  const body = req.body
  



const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: body.prompt}],
});
res.json(completion.data.choices[0].message.content);
  
});

app.post('/api/image', async (req, res) => {
  
})

app.post('/api/recipe', async (req, res) => {
  
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
