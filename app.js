const express = require('express');
const path = require('path');
const bodyParser  = require('body-parser');
const Twilio = require('twilio');
const fetch = require('node-fetch');
const dotenv = require('dotenv')

//set up config file
dotenv.config();

const client = new Twilio(process.env.accountSid, process.env.authToken);

//set up app
const app = express();

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const PORT = 3001;

app.get('/', (req, res) => {
    res.send("GUI comming soon");
});
let cryptoText = "";
fetch('https://api.coinmarketcap.com/v2/ticker/1/')
.then(res => res.json())
.then(data => {
    const phoneNumbers = [process.env.ARUSH_MOB]; 
    phoneNumbers.map(phoneNumber => {
        
        if ( !validE164(phoneNumber) ) {
            throw new Error('number must be E164 format!')
        }
        const result = 
            data.data.name + 
            '\nprice: ' + data.data.quotes.USD.price + 
            ' \n%_1H: ' + data.data.quotes.USD.percent_change_1h + '%' +  
            ' \n%_24H: ' + data.data.quotes.USD.percent_change_24h + '%' +
            '\n%_7d: ' + data.data.quotes.USD.percent_change_7d + '%'; 
        
        const textContent = {
            body: result,
            to: phoneNumber,
            from: process.env.twilioNumber
        }
    
        client.messages.create(textContent)
        .then((message) => console.log(message.to))
    })
});

// Validate E164 format
function validE164(num) {
    return /^\+?[1-9]\d{1,14}$/.test(num)
}



app.listen(PORT, () => console.log(`app is listening on PORT: ${PORT}`));