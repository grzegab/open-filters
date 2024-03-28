const {createServer} = require("node:http");
const dotenv = require("dotenv");
const OpenAI = require("openai");

// Load .env && .env.local if exists
dotenv.config();
dotenv.config({path: `.env.local`, override: true});

const openaiH = new OpenAI({apiKey: process.env.OPEN_AI});

const headers = {
  "Access-Control-Allow-Origin": "*", /* @dev First, read about security */
  "Access-Control-Allow-Methods": "OPTIONS, POST",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": 2592000, // 30 days
  "Content-Type": "application/json"
};

const setFilters = async (message) => {
  if (message === "" || message === undefined) {
    message = "Use random filter settings"
  }

  const setFilterMessages = [
    {
      role: "user",
      content: "You are a assistant that helps set up filters. Possible filters are: name, last name, email, sex, children count, has computer, has car, has fish, earning per year, earning more or less than selector, years of service, years of service more or less than selector"
    },
    {
      role: "user",
      content: "For provided text you will response with all filters with selected options. response as json"
    },
    {role: "user", content: "I want to filter out people older than 18 that have a car"},
    {role: "system", content: "{\"car\": true, \"age\": {\"selector\": \"more than\", \"value\": \"18\"}}"},
    {role: "user", content: "Select people who have car and earning more than 50000"},
    {role: "system", content: "{\"car\": true, \"earnings\": {\"selector\": \"more than\", \"value\": \"50000\"}}"},
    {role: "user", content: "Select people who do not have car and have children"},
    {role: "system", content: "{\"car\": false, \"children\": true}"},
    {role: "user", content: "I want to filter out people younger than 12 who has earning more than 2000"},
    {
      role: "system",
      content: "{\"age\": {\"selector\": \"less than\", \"value\": \"12\"}}, \"earnings\": {\"selector\": \"more than\", \"value\": \"2000\"}}"
    },
    {role: "user", content: message},
  ]

  const completion = await openaiH.chat.completions.create({
    messages: setFilterMessages,
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0]
}

const getDescription = async (message) => {
  const setFilterMessages = [
    {
      role: "user",
      content: "I will provide options selected by web form. Try to describe those selections in full sentence."
    },
    {role: "user", content: message},
  ]

  const completion = await openaiH.chat.completions.create({
    messages: setFilterMessages,
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0]
}

const server = createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else if (req.url === "/setFilters" && req.method === "POST") {
    let body = ""
    req.on("data", (data) => {
      body += data
    })

    req.on("end", () => {
      let bodyObj = JSON.parse(body)
      setFilters(bodyObj.message).then((dataDesc) => {
        if (dataDesc["message"] === undefined || dataDesc["message"]["content"] === undefined) {
          res.writeHead(500, headers);
          res.end(JSON.stringify({error: "Error communicating OpenAI"}));
        }
        res.writeHead(200, headers);
        res.end(JSON.stringify({data: dataDesc["message"]["content"]}));
      });
    });
  } else if (req.url === "/getFilters" && req.method === "POST") {
    let body = ""
    req.on("data", (data) => {
      body += data
    })

    req.on("end", () => {
      let bodyObj = JSON.parse(body)

      getDescription(JSON.stringify(bodyObj.message)).then((dataDesc) => {
        if (dataDesc["message"] === undefined || dataDesc["message"]["content"] === undefined) {
          res.writeHead(500);
          res.end(JSON.stringify({error: "Error communicating OpenAI"}));
        }
        res.writeHead(200, headers);
        res.end(JSON.stringify({body: dataDesc["message"]["content"]}))
      });
    });
  } else {
    res.writeHead(404, headers);
    res.end(JSON.stringify({error: "Resource not found"}));
  }
});

server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
});