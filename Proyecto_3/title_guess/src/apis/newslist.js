import React from "react";
import "./NewsSelector.css"

export default function newslist(props){
    return(
        <div id="label">
            <label htmlFor = "search">Search news by words: </label>
            <input type = "text" value = {props.inputValue} onChange={props.newsFilteronChange} />
        </div>
    )
}