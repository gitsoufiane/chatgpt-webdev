const OPENAI_KEY = "";

const price = 0.0002/1000;

const messages = [
    {role:"system",content:'you are a taxes expert'},
];
let totalTokens = 0;

async function sendChat() {
    const prompt = document.querySelector("#prompt").value;
    document.querySelector("#prompt").value = "";
    messages.push({role:'user',content:prompt})
    document.querySelector('ul').innerHTML += `<li><b>${prompt}</b></li>`
   
    // TODO make query and parse results
    const data = {
        "model": 'gpt-3.5-turbo',
        temperature: 0,
        stream: true, //use stream to read the data in the response
        messages
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions',{ 
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_KEY}`

        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    const message = json.choices[0].message
    messages.push(message)

    document.querySelector('ul').innerHTML += `<li>${message.content}</li>`


    document.querySelector("#prompt").value = "";
    document.querySelector("input").focus();
}

