import React from "react";
import QuestionCard from "./questionCard";

function Category(props){
    const clues = [];
    for (let i = 0; i < 5; i++){
        clues.push(<QuestionCard scoreUpdater={props.scoreUpdater}/>)
    }


    return <div className="category">{clues}</div>
}

export default Category;