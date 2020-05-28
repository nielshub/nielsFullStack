import React from "react";
import { connect } from "react-redux";
import { changeValue } from "../store";
import "./NewsSelector.css";

class NewsSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "general" };
  }
  handleChange = (event) => {
    this.props.changeValue({ value: event.target.value })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label id="label">
            <b>Pick the news topic: </b>
            <select value={this.props.value.value} onChange={this.handleChange}>
              <option value="general">General</option>
              <option value="category=business">Business</option>
              <option value="category=entertainment">Entertainment</option>
              <option value="category=health">Health</option>
              <option value="category=science">Science</option>
              <option value="category=sports">Sports</option>
              <option value="category=technology">Technology</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeValue: (value) => dispatch(changeValue(value)),
});
const mapStateToProps = (state) => {
  return { value: state.value };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsSelector);
