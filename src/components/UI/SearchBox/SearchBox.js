import { useState } from "react";
import classes from "./SearchBox.module.css";
function SearchBox(props){
    const [searchedText,setSearchedText]=useState('');
    function inputChangeHandler(event){
        setSearchedText(event.target.value);
        props.onInputChange(event.target.value);
    }
    return (
        <div>
            <input type="text" value={searchedText} onChange={inputChangeHandler} className={classes.inputBox} placeholder={props.placeholder}/>
        </div>
    );
}
export default SearchBox;