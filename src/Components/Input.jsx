import React from "react";
import '../App.css';

const Input = (props) =>{
    return (
        <div>
             <input onChange={props.onChange}value={props.inputValue} type="text" placeholder="search movie"  ></input>
             <button onClick={props.onSearch}>search</button>
        </div>
    )
}

export default Input; 