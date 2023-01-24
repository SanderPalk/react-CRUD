import React from "react";

export const AddPicture = ({ onAdd }) => {
    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        onAdd(evt.target.title.value, evt.target.url.value);
        evt.target.title.value = "";
        evt.target.url.value = "";
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <h3>Add picture</h3>
            <input placeholder="Title" name="title" />
            <input placeholder="Url" name="url" />
            <button onSubmit={handleOnSubmit}>Add</button>
            <hr />
        </form>
    );
};