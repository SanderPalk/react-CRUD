import React, { useEffect, useState } from "react";
import {AddPicture} from "./components/AddPicture";
import {Picture} from "./components/Home";

export default function App() {
    const [photos, setPhotos] = useState([]);

    const api = "https://jsonplaceholder.typicode.com/photos/"

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch(api + "?_limit=10")
            .then((response) => response.json())
            .then((data) => setPhotos(data))
            .catch((error) => console.log(error));
    };

    const onAdd = async (title, url) => {
        await fetch( api, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                url: url,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (response.status !== 201) {
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setPhotos((comments) => [...comments, data]);
            })
            .catch((error) => console.log(error));
    };

    const onEdit = async (id, title, url) => {
        await fetch(api + {id}, {
            method: "PUT",
            body: JSON.stringify({
                title: title,
                url: url,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (response.status !== 200) {
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                // setUsers((users) => [...users, data]);
                const updatedPhotos = photos.map((photo) => {
                    if (photo.id === id) {
                        photo.title = title;
                        photo.url = url;
                    }

                    return photo;
                });

                setPhotos((photos) => updatedPhotos);
            })
            .catch((error) => console.log(error));
    };

    const onDelete = async (id) => {
        await fetch(api + {id}, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.status !== 200) {
                    return;
                } else {
                    setPhotos(
                        photos.filter((photo) => {
                            return photo.id !== id;
                        })
                    );
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="App">
            <h1>Photos</h1>
            <AddPicture onAdd={onAdd}/>
            <div className="form_body">
                {photos.map((photo) => (
                    <Picture
                        id={photo.id}
                        key={photo.id}
                        title={photo.title}
                        url={photo.url}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}