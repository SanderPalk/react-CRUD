import React, { useState } from "react";

export const Picture = ({ title, url, id, onEdit, onDelete }) => {
    const [isEdit, setIsEdit] = useState(false);

    const handleOnEditSubmit = (evt) => {
        evt.preventDefault();
        onEdit(id, evt.target.title.value, evt.target.url.value);
        setIsEdit(!isEdit);
    };

    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div>
            {isEdit ? (
                <form onSubmit={handleOnEditSubmit}>
                    <input placeholder="Title" name="title" defaultValue={title} />
                    <input placeholder="Url" name="url" defaultValue={url} />
                    <button onSubmit={handleOnEditSubmit}>Save</button>
                </form>
            ) : (
                <div className="photo">
                    <span className="title">{title}</span>
                    <img className="image" src={url} width={"10%"} height={"10%"}/>
                    <div>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};
