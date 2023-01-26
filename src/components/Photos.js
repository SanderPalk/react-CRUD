import axios from "axios";
import Stomp from 'stompjs';
import React from "react";
import PhotoFormModal from "./PhotoFormModal";
import HandleError from "./HandleError";
import Logs from "./Logs";
import "./Photos.css";

class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
        }
        this.deletePhotos =  this.deletePhotos.bind(this);
        this.editPhotos = this.editPhotos.bind(this);
        this.addPhotos = this.addPhotos.bind(this);
        this.getData = this.getData.bind(this);
    }

    addPhotos(photo) {this.setState({photos: this.state.photos.concat(photo)})}

    editPhotos(photo) {this.setState({photos: this.state.photos.map((photos => photos.id === photo.id ? photo : photos))})}

    deletePhotos(id) {this.setState({photos: this.state.photos.filter(photo => photo.id !== id)});}

    getData(Data) {this.setState({photos: Data.photos})}

    WebsocketLogic() {
        const SOCKET_URL = 'ws://localhost:8080/websocket';
        this.client = Stomp.client(SOCKET_URL);
        this.client.connect({}, () => {
            this.client.subscribe('/photos', message => {
                const json = JSON.parse(message.body)
                const method = json [0]
                const body = json[1]

                switch (method) {
                    case "POST":
                        this.addPhotos(body)
                        break;
                    case "PUT":
                        this.editPhotos(body)
                        break;
                    case "DELETE":
                        this.deletePhotos(body.id)
                        break;
                    default:
                        console.log("Something went wrong")
                        break;
                }
            })
        })
    }

    componentDidMount() {
        axios.get("http://localhost:8080/photos", {
            })
            .then(response => {
                this.setState({photos: response.data})
                localStorage.setItem('photos', JSON.stringify(response.data));
            }).catch(error => {
                HandleError(error)
        })
        this.WebsocketLogic()
    }

    componentWillUnmount() {
        this.client.disconnect();
    }

    handleDelete = (id) => {
        axios.delete("http://localhost:8080/photos/" + id, {
            auth: {
                username: 'admin',
                password: 'password'
            }}).catch(error => {
                HandleError(error.response)
        }).then(() => {
            window.location.reload();
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Manage photos</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>url</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.photos.map(photo =>
                        <tr key={photo.id}>
                            <td>{photo.id}</td>
                            <td>{photo.title}</td>
                            <td><img className="photo" src={photo.url} alt={photo.url}/></td>
                            <td className="d-flex justify-content-end"><PhotoFormModal photo={photo} editPhotos={this.editPhotos}></PhotoFormModal>
                                <button className="remove btn btn-danger btn-sm ms-3" onClick={()=> {
                                    this.handleDelete(photo.id)}}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <PhotoFormModal photos={this.state.photo} title={this.state.photo} addPhoto={this.addPhotos}/>
                <Logs></Logs>
            </div>
        );
    }
}

export default Photos;