
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
var token = ""

const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/', function(req, res) {


(async() => {
    if (req.body.auth == true){
    characterAI.unauthenticate()
    token = await characterAI.authenticateAsGuest();
    }
    const characterId = "v3lyisRb7INyd5BUdUKEKS1-MUTBom9dY9qV9-2ioTE"
    const chat = await characterAI.createOrContinueChat(characterId);
    const response = await chat.sendAndAwaitResponse(req.body.msg, true)

  res.send({
    'Answer': response.text,
  });
})();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
