// --------------- Express Server -------------------

var express = require('express');
var path = require('path');
var url = require('url');
var bodyParser = require('body-parser');
var request = require('request');
var rp = require('request-promise');

var InvalidAddressError = require('./server-errors/InvalidAddressError')
var LobServerError = require('./server-errors/LobServerError');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

// And run the server
app.listen(3000, function () {
  console.log('Server running on port ' + 3000);
});


const GOOGLE_CIVIC_URL = "https://www.googleapis.com/civicinfo/v2/representatives";
const GOOGLE_API_KEY = "AIzaSyDsv8GAsoHnmDJ0zHbVQ8tHvbipjcfWeQI";
const LOB_API_KEY = "test_f2c1b21157a448f054f7f1c31b2bbe8f952";




app.post('/sendLetter', (req, res) => {
  var senderInfo = req.body;

  letterToGovernor(senderInfo)
    .then(({url}) => {
      res.status(200);
      res.send({url});
    })
    .catch(InvalidAddressError, e => {
      res.status(404).send({ error: "Invalid input address." });
    })
    .catch(LobServerError, e => {
      res.status(500).send({ error: "Lob server is experiencing issues." });
    });

});


function letterToGovernor (senderInfo) {
  return getGovernorInfo(senderInfo)
      .then(convertToLetter);
}

/**
 * Arg: senderInfo object, which includes location information and message fields gotten from front-end.
 * Return: A letter object which contains both senderInfo and receiverInfo,
 * where receiverInfo is the information of the governor corresponding to senderInfo location.
 */

function getGovernorInfo (senderInfo) {
  var address = encodeURIComponent(senderInfo.address1+" "+senderInfo.address2+" "+senderInfo.city+" "+senderInfo.state+" "+senderInfo.zipcode);
  const googleAPIoptions = {
    method: 'GET',
    uri: GOOGLE_CIVIC_URL + "?levels=administrativeArea1&address=" + address + "&key=" + GOOGLE_API_KEY
  }
  return rp(googleAPIoptions)
    .then(representativeInfo => {
      let representativeParsed = JSON.parse(representativeInfo);
      return {receiverInfo: representativeParsed.officials[0], senderInfo};
    })
    .catch(({error}) => {
      let errorParsed = JSON.parse(error);
      if (errorParsed.error.code == 404){
        throw new InvalidAddressError(errorParsed.error.message);
      }
    });
}

/**
 * Arg: An object that contains information about receiver and sender.
 * Return: An URL gotten from LOB that links to PDF of the letter.
 *
 */

function convertToLetter ({receiverInfo, senderInfo}) {
  let Lob = require('lob')(LOB_API_KEY);
  return Lob.letters.create({
    description: 'Lob letter',
    to: {
      name: receiverInfo.name,
      address_line1: receiverInfo.address[0].line1,
      address_city: receiverInfo.address[0].city,
      address_state: receiverInfo.address[0].state,
      address_zip: receiverInfo.address[0].zip,
      address_country: 'US',
    },
    from: {
      name: senderInfo.name,
      address_line1: senderInfo.address1 + " " + senderInfo.address2,
      address_city: senderInfo.city,
      address_state: senderInfo.state,
      address_zip: senderInfo.zipcode,
      address_country: 'US',
    },
    file: '<html style="padding-top: 3in; margin: .5in;">{{message}}</html>',
    data: {
      message: senderInfo.message
    },
    color: true
  }, function (err, res) {
      if (!err){
        var url = res['url'];
        return url;
      }
      else{
        // for now, categorize every error from lob as 500
        throw new LobServerError(err);
      }
    });
}


// --------------- Webpack Dev Server ----------------

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    "*": "http://localhost:3000"
  }
}).listen(3001, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:3001/');
});
