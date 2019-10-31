const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/'));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
})

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req,res) => {
  let fname = req.body.first
  let lname = req.body.last;
  let email = req.body.email;

  let data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  }

  let jsonData = JSON.stringify(data);

  let options = {
    url : "https://us5.api.mailchimp.com/3.0/lists/e622cfc0bc",
    method: "POST",
    headers: {
      "Authorization" : "Moid bcc7f1a21011b6ad7f50cbf94c6a5b7d-us5"
    },
    body: jsonData
  }

  request(options, (error,response,body) => {
    if(error) {
      res.sendFile(__dirname + "/failure.html")
    }
    else {
      if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
      }
      else {
        res.sendFile(__dirname + "/failure.html")
      }
    }

  })

})

// bcc7f1a21011b6ad7f50cbf94c6a5b7d-us5
//id=e622cfc0bc
