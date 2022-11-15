import React, { useEffect, useState } from "react";
import {Picture} from "./components/Home";

export default function App() {
    const [photos, setPhotos] = useState([]);

    const api = "https://jsonplaceholder.typicode.com/photos"

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch(api + "?_limit=10")
            .then((response) => response.json())
            .then((data) => setPhotos(data))
            .catch((error) => console.log(error));
    };

    return (
        <div className="App">
            <h1>Photos</h1>
            <div className="form_body">
                {photos.map((photo) => (
                    <Picture
                        id={photo.id}
                        key={photo.id}
                        title={photo.title}
                        url={photo.url}
                        onEdit={"onEdit"}
                        onDelete={"onDelete"}
                    />
                ))}
            </div>
        </div>
    );
}