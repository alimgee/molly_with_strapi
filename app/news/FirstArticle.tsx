'use client';

import React from "react";
import { Articles } from "./data";

export const FirstArticle = ({ article }) => {
    if (!article) {
        return null;
    }

    return (
        <>
            <div className="card-text" ><h3 className="news-header" style={{fontFamily:"Roboto Mono"}}>{article.name} </h3></div>
            <div className="card-text mb-3"><span >{article.content}</span></div>
        </>
    );
};