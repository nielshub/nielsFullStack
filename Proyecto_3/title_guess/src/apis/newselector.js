import React from "react";
import "./NewsSelector.css";

export default class NewsSelector extends React.Component {
 
  render() {
    return (
      <form>
        <label>
          Pick the news topic:
          <select
            value={this.props.value}
            onChange={()=>this.props.handleChangeSelector}
          >
            <option value="">General</option>
            <option value="Business">Business</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Science">Science</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
          </select>
        </label>
      </form>
    );
  }
}
