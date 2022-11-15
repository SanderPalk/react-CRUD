import React, { useState } from "react";

export const Picture = ({ title, url}) => {
    return (
        <div>
            <div className="photo">
                <span className="title">{title}</span>
                <img src={url} width={"10%"} height={"10%"}/>
            </div>
        </div>
    );
};
