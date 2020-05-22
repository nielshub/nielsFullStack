import React from "react";
import axios from "axios";
import Titleguess from "./titleguess";
import NewsSelector from "./newselector";
import "./new.css";

export default class news extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      value: "general",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async getNews() {
    const url =
      this.state.value === "general"
        ? "http://newsapi.org/v2/top-headlines?" +
          "country=us&" +
          "apiKey=15ef8d90cef04507b6704adb2194bdc9"
        : "http://newsapi.org/v2/top-headlines?" +
          "country=us&" +
          this.state.value +
          "&apiKey=15ef8d90cef04507b6704adb2194bdc9";
    const res = await axios.get(url);
    const news = res.data.articles;
    this.setState({ news });
  }

  render() {
    return (
      <div>
        <div className="selector">
          <NewsSelector
            value={this.state.value}
            handleChange={this.handleChange}
          ></NewsSelector>
          <div>
            <button
              onClick={() => {
                this.getNews();
              }}
              className="button"
            >
              Get News
            </button>
          </div>
        </div>
        <div>
          {this.state.news.map((obj, index) => {
            return (
              <div key={index} className="news">
                <div>
                  <h4>{obj.title}</h4>
                  <img src={obj.urlToImage} alt="" className="image" />
                </div>
                <div className="analyzeimage">
                  <Titleguess imageUrl={obj.urlToImage}></Titleguess>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
