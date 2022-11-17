import React from "react";


function listItem(props){


    return <li className="ListItem">user:{props.user} score:{props.score}</li>
}

export default listItem;