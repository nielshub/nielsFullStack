import React from "react";
import "./new.scss";

export default class Readmore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBoxVisible: false,
    };
  }

  toggleInfo = () => {
    this.setState((prevState) => ({ isBoxVisible: !prevState.isBoxVisible }));
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.toggleInfo();
          }}
          className="button"
        >
          Read more
        </button>
        <p className={`box ${this.state.isBoxVisible ? "" : "hidden"}`}>
          {this.props.description}
        </p>
      </div>
    );
  }
}
