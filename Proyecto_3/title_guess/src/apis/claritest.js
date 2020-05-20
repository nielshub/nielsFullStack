/*const Clarifai = require('clarifai');
// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({apiKey: 'c7689fdaf01f4043ba7e6d238f5540ea'});
      
// Predict the contents of an image by passing in a URL.
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg')
  .then(response => {
    console.log(response);
    console.log(response.outputs.data);
  })
  .catch(err => {
    console.log(err);
  });

  /*const stub = ClarifaiStub.json();
    //const stub = ClarifaiStub.insecureGrpc();

    const metadata = new grpc.Metadata();
    metadata.set("authorization", "c7689fdaf01f4043ba7e6d238f5540ea");

    stub.PostModelOutputs(
      {
        model_id: "aaa03c23b3724a16a56b629203edc62c",
        inputs: [
          {
            data: {
              image: { url: this.state.imageUrl },
            },
          },
        ],
      },
      metadata,
      (err, response) => {
        if (err) {
          console.log("Error: " + err);
          return;
        }

        if (response.status.code !== 10000) {
          console.log(
            "Received failed status: " +
              response.status.description +
              "\n" +
              response.status.details
          );
          return;
        }

        for (const c of response.outputs[0].data.concepts) {
          console.log(c.name + ": " + c.value);
        }
      }
    );
  };
  var url =
 "http://newsapi.org/v2/top-headlines?" +
 "country=us&" +
 "apiKey=15ef8d90cef04507b6704adb2194bdc9";
var req = new Request(url);
fetch(req).then(function (response) {
 console.log(response.json());
});


  
  */
 import axios from "axios";
 const url =
 "http://newsapi.org/v2/top-headlines?" +
 "country=us&" +
 "apiKey=15ef8d90cef04507b6704adb2194bdc9";
const res = await axios.get(url);
//const users = res.data;
//this.setState({ users: users });
console.log(res.json());