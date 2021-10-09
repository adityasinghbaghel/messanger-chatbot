const express = require('express');
const app = express();
const PORT = 3000 ;
const bodyParser = require('body-parser');
const local_token = "83756456564";
const axios = require('axios').default;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.get('/' , function(req,res){
    console.log(req.query);
    const challenge = req.query["hub.challenge"];
    const token = req.query["hub.verify_token"];
    console.log(token , local_token)
    if(local_token == token){
        res.send(challenge);
    } else{
        res.send("failed");
    }
})

app.post('/' ,(req,res) => {
    // console.log(JSON.stringify(req.body));
    const body = req.body;
    body.entry.forEach(entry => {
        if(entry["messaging"]){
            entry.messaging.forEach(messaging => {
                //
                respond(messaging.sender , messaging.message.text)
            })
        }
    });
    res.send("ok");
})
function respond(sender ,text){
    console.log(sender ,text);

    const access_token = "EAAPNBtGfHxMBADXCguZCI4ZAiMZBIuZADkCTY87QdpOSHR2kPmoIq7LZCZAmZAt2hKCqyjzQwKNZAS9ZB3ItWBFnZAgFw8wix98ivvbhJEjuFuIlmq8E9GnvZCy3A7P1qjwNqZArkkh1iBmiJ6G01rwQ73qY1vvgPlLMIZBucZC0ZBDoc1CYmLCwvPaqnvr"
    const url = `https://graph.facebook.com/v12.0/me/messages?access_token=${access_token}`
    
    var message = {
        
        "recipient": sender,
        "message": {
          "text": text  + "  by the echo bot"
        }
      }

    axios.post(url , message)
        .then((response) => {
            console.log("Responded");
        });
}

app.listen(PORT ,() => {
    console.log(`Example app http://localhost:${PORT}`)
}) 