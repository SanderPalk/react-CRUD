import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {Table} from "react-bootstrap";


function Logs() {
    const [fullscreen, setFullscreen] = useState(true)
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        handleGET();
    }, []);

    const handleGET = () => {
        axios.get("http://localhost:8080/api/v1/logs", {
            auth: {
                username: "admin",
                password: "password"
            }
        }).then(response => {setLogs(logs.concat(response.data));})
    }

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    return (
        <>
            <Button className="mx-2 btn btn-info btn-sm" onClick={() => handleShow(true)}>
                Logs
            </Button>
            <Modal className="logTable" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>API logs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table className="table">
                        <thead>
                        <tr>
                            <th>Time</th>
                            <th>Method</th>
                            <th>Item ID</th>
                            <th>New info</th>
                            <th>Old info</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.slice(-20).map((log, index) =>
                            <tr className="LogTable" key={index}>
                                <td>{log.time}</td>
                                <td>{log.method}</td>
                                <td>{log.itemId}</td>
                                <td>
                                    {log.body}
                                </td>
                                <td>
                                    {log.hasOwnProperty('oldBody') && log.oldBody}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Logs;