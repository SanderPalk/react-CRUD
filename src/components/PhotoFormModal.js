import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import errorHandling from "./HandleError";
import HandleError from "./HandleError";

function PhotoFormModal(props) {
    const [show, setShow] = useState(false);
    const [state, setState] = React.useState({
        title: "",
        url: "",
    })

    function handleChange(evt)  {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    function updatePhoto() {
        const api = "http://localhost:8080/photos/" + props.photo.id
        let updatedPost = { ...state };
        updatedPost.id = props.photo.id
        updatedPost.title = !!state.title ? state.title : props.photo.title
        updatedPost.url = !!state.url ? state.url : props.photo.url
        updatedPost.thumbnail = props.photo.thumbnail
        updatedPost.albumId = props.photo.albumId
        axios.put(api, updatedPost, {
            auth: {
                username: 'admin',
                password: 'password'
            }
        }).then(() => {
            window.location.reload();
        })
    }

    function savePhoto() {
        const api = "http://localhost:8080/photos"
        axios.post(api, state, {
            auth: {
                username: 'admin',
                password: 'password'
            }
        }).then(() => {
            window.location.reload();
        })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if(props.photo) {
        return (
            <>
                <Button className="btn-dark" onClick={handleShow}>
                    Edit Photo
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Edit Photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="title">Title: </label>
                        <input type="text" className="form-control" id="title" name="title" value={state.title} onChange={handleChange} placeholder={props.photo.title}></input>
                        <label htmlFor="url">URL: </label>
                        <input type="text" className="form-control" id="url" name="url" value={state.url} onChange={handleChange} placeholder={props.photo.url}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={updatePhoto}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } else {
        return (
            <>
                <Button className="btn-dark" onClick={handleShow}>
                    Add New Photo
                </Button>
                <Modal show={show} className="photoModal" onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Add Photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="title">Title: </label>
                        <input type="text" className="form-control" id="title" name="title"  onChange={handleChange} placeholder="title"></input>
                        <label htmlFor="url">URL: </label>
                        <input type="text" className="form-control" id="url" name="url" onChange={handleChange} placeholder="URL"></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={savePhoto}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default PhotoFormModal;
