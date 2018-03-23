
/* GIPHY API stuff
const API_KEY = "RoMUu687BtJVR4cojdzftjA3HxuczkMc";


function sendApiRequest(userQuery) {
    // Changing the quotes to backtics is supremely important.
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${userQuery}&limit=25&offset=0&rating=G&lang=en`)
    .then(function(data) {
      return data.json()
    })
    .then(function(json) {
      console.log(json)
      // Pass the JSON on to the next function.
    })
}

sendApiRequest("teacher");

*/
/* Google Vision Code */
/*
const API_KEY = "AIzaSyC_ZCWi9mAkDLRESchfFGpGI5bKvTCPxj4";
const url = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
let json =
{
 "requests": [
  {
   "features": [
    {
     "type": "LABEL_DETECTION"
    }
   ],
   "image": {
    "source": {
     "imageUri": "https://mathymcmatherson.github.io/anniewebsitestatic/images/annie16.jpg"
    }
   }
  }
 ]
};
*/

/* from: https://blog.terrenceryan.com/index.php/working-with-cloud-vision-api-from-javascript/ */
/*
$.ajax({
    type: 'POST',
    url: "https://vision.googleapis.com/v1/images:annotate?key=" + API_KEY,
    dataType: 'json',
    crossDomain: true,
    data: JSON.stringify(json),

    success: function(data, textStatus, jqXHR) {
      displayJSON(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('ERRORS: ' + textStatus + ' ' + errorThrown);
    }
  });
*/

/* attempt at fetch from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch */
/*
fetch(url, {
  method: 'POST', // or 'PUT'
  mode: 'no-cors',
  body: JSON.stringify(json),
  headers: new Headers({
    'Content-Type': 'application/json'
    //'Access-Control-Allow-Origin': '*',
    //"X-Requested-With":"XMLHttpRequest"
  })
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
*/
