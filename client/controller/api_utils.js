const GOOGLE_API_KEY = "AIzaSyDsv8GAsoHnmDJ0zHbVQ8tHvbipjcfWeQI";
const GOOGLE_CIVIC_URL = "https://www.googleapis.com/civicinfo/v2/representatives";

var APIUtils = {

  sendLetter: (senderInfo, cb) => {
    $.ajax({
      url: "/sendLetter",
      dataType: 'json',
      type: 'POST',
      data: senderInfo,
      success: function(data) {
        cb(data['url']);
      },
      error: function(err) {
        //console.log(err);
        cb(null, JSON.parse(err.responseText).error);
      }
    });
  }

}

module.exports = APIUtils;
