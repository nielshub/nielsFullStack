import React from "react";
import "./App.css";
import News from "./apis/news";
import Home from "./apis/home";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const topics = [
  {
    name: "Country",
    id: "country",
    description: "Choose news from different countries",
    resources: [
      {
        name: "Types",
        id: "type",
        description: "6 key countries. US / FR / IT / NL / BR / JP",
      },
      {
        name: "News Category",
        id: "category",
        description: "Only works for US news. For toher countries only can get info from general category",
      },
      {
        name: "Lenguage",
        id: "lenguage",
        description:
          "The news are written in the proper lenguage of the country",
      },
    ],
  },
  {
    name: "Analyze image",
    id: "analyze",
    description:
      "Click the button analyze image to apply the clarifai algorithm to the image and obtain different values for each case",
    resources: [
      {
        name: "Percentatge Value",
        id: "value",
        description:
          "Get a percentatge of probability that word is contained in the image",
      },
      {
        name: "Clarifai",
        id: "clarifai",
        description: "It is an API from the clarifai company",
      },
    ],
  },
  {
    name: "Search Bar",
    id: "searchbar",
    description: "Add key words to run a fast filter through the news list",
    resources: [
      {
        name: "Key words",
        id: "words",
        description: "Filter for the exact words",
      },
      {
        name: "Word order",
        id: "order",
        description:
          "Order is important for a correct search. If possible just use one word to do a better filtering",
      },
    ],
  },
];

function Resource({ match }) {
  const topic = topics
    .find(({ id }) => id === match.params.topicId)
    .resources.find(({ id }) => id === match.params.subId);

  return (
    <div>
      <h3>{topic.name}</h3>
      <p>{topic.description}</p>
    </div>
  );
}

function Topic({ match }) {
  const topic = topics.find(({ id }) => id === match.params.topicId);

  return (
    <div>
      <h2>{topic.name}</h2>
      <p>{topic.description}</p>

      <ul>
        {topic.resources.map((sub) => (
          <li key={sub.id}>
            <Link to={`${match.url}/${sub.id}`}>{sub.name}</Link>
          </li>
        ))}
      </ul>

      <hr />

      <Route path={`${match.path}/:subId`} component={Resource} />
    </div>
  );
}

function Topics({ match }) {
  return (
    <div>
      <h1>Info topics</h1>
      <Link to="/">
        <button className="button">Home</button>
      </Link>

      <ul>
        {topics.map(({ name, id }) => (
          <li key={id}>
            <Link to={`${match.url}/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>

      <hr />

      <Route path={`${match.path}/:topicId`} component={Topic} />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Route exact strict path="/" render={() => <Home />}></Route>
        <Route
          path="/us"
          render={() => <News country="United States" />}
        ></Route>
        <Route
          exact
          strict
          path="/jp"
          render={() => <News country="Japan" />}
        ></Route>
        <Route
          exact
          strict
          path="/fr"
          render={() => <News country="France" />}
        ></Route>
        <Route
          exact
          strict
          path="/it"
          render={() => <News country="Italia" />}
        ></Route>
        <Route
          exact
          strict
          path="/br"
          render={() => <News country="Brasil" />}
        ></Route>
        <Route
          exact
          strict
          path="/nl"
          render={() => <News country="Netherland" />}
        ></Route>
        <Route path="/topics" component={Topics}></Route>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
