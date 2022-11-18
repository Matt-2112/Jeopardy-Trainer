import React from "react";


function listItem(props){


    return <li className="ListItem">{props.user}:      Score:   {props.score}$</li>
}

export default listItem;