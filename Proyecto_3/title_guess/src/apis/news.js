import React from "react";
import axios from "axios";
import Titleguess from "./titleguess";
import NewsSelector from "./newselector";
import Newslist from "./newslist";
import Readmore from "./readmore";
import { Link } from "react-router-dom";
import "./new.scss";

export default class news extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      value: "general",
      inputValue: "",
      country: "",
      isBoxVisible: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  newsFilteronChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  componentDidMount() {
    const country =
      this.props.country === "United States"
        ? "us"
        : this.props.country === "Japan"
        ? "jp"
        : this.props.country === "France"
        ? "fr"
        : this.props.country === "Italia"
        ? "it"
        : this.props.country === "Brasil"
        ? "br"
        : this.props.country === "Netherland"
        ? "nl"
        : "";
    this.setState({ country });
  }

  async getNews() {
    const url =
      this.state.value === "general"
        ? "http://newsapi.org/v2/top-headlines?" +
          "country=" +
          this.state.country +
          "&apiKey=15ef8d90cef04507b6704adb2194bdc9"
        : "http://newsapi.org/v2/top-headlines?" +
          "country=us&" +
          this.state.value +
          "&apiKey=15ef8d90cef04507b6704adb2194bdc9";
    const res = await axios.get(url);
    console.log(res);
    const news = res.data.articles;
    this.setState({ news });
  }

  render() {
    const filteredNews = this.state.news.filter((shortnew) => {
      return shortnew.title
        .toLowerCase()
        .includes(this.state.inputValue.toLowerCase());
    });

    return (
      <div>
        <h2 className="no-span">Custom News in {this.props.country}</h2>
        <div className="selector">
          <Link to="/">
            <button className="button"> Home </button>
          </Link>
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
          <Newslist
            inputValue={this.state.inputValue}
            newsFilteronChange={this.newsFilteronChange}
          ></Newslist>
        </div>
        <div>
          {filteredNews.map((obj, index) => {
            return (
              <div key={index} className="news">
                <div>
                  <h4>{obj.title}</h4>
                  <img src={obj.urlToImage} alt="" className="image" />
                  <Readmore description={obj.description}></Readmore>
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
