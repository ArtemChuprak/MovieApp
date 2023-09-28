import React from "react";


const   SearchArea = (props) => {
return (
    <form className="searchForm" action="" onKeyUp={props.handleSubmit}>
    <input className="searchInput" type="text"  placeholder="Type to search..."  onChange={props.handleChange} ></input>

</form>
)

}


export default SearchArea;