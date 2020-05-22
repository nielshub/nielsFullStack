import React from "react";

export default function NewsSelector(props) {
  return (
    <div>
      <form>
        <label>
          Pick the news topic:
          <select
            value={props.value}
            onChange={props.handleChange}
          >
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
