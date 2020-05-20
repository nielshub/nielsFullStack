import React from "react";
import "./titleguess.css";


export default class TitleGuess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagelist: [],
    };
  }

  writeList = (response) => {
    const shortresponse = response.slice(0,7)
    const list = shortresponse.map((obj, index) => {
    return <li key={index}><strong>{obj.name}</strong> with a {(obj.value.toFixed(2))*100}%</li>;
    });
    this.setState({ imagelist: list });
  };

  clarifai = () => {
    const Clarifai = require("clarifai");
    // Instantiate a new Clarifai app by passing in your API key.
    const app = new Clarifai.App({
      apiKey: "c7689fdaf01f4043ba7e6d238f5540ea",
    });
    app.models
      .predict(Clarifai.GENERAL_MODEL, this.props.imageUrl)
      .then((response) => {
        console.log(response);
        console.log(response.outputs[0].data.concepts);
        this.writeList(response.outputs[0].data.concepts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className = "analyzeimage">
        <button className="button" color="red" onClick={() => this.clarifai()}>Analyze image</button>
        <div>
          <ul>{this.state.imagelist}</ul>
        </div>
      </div>
    );
  }
}
