import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {ButtonGroup, Col, Row} from "react-bootstrap";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import CreateUserModal from "./CreateUserModal";
import CreateTaskModal from "./CreateTaskModal";
import ShowTable from './ShowTable'
import TableData from "./TableData";
import {useNavigate} from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show_m, setShow_m] = useState(false);
    const handleClose_m = () => setShow_m(false);
    const handleShow_m = () => setShow_m(true);

    const [data, setData] = useState([])
    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        const resp = await axios.get('https://crud-application-production.up.railway.app/api/v1/user/dashboard', {
            headers: {
                Authorization: localStorage.getItem('Token')
            }
        })
        setData(resp.data.data)
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Task Management System</Navbar.Brand>
                    <div>
                        <Button variant="outline-success" onClick={handleShow_m}>Create Task</Button>
                        <Button variant="outline-success" onClick={handleShow}>Create User</Button>
                        <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
                    </div>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    {data.length > 0 && data.map((dt, index) => {
                        return (
                            <Col>
                                <div className="card text-white text-center bg-primary mb-2 custom">
                                    <div className="card-header">{dt.title}</div>
                                    <div className="card-body">
                                        <h1 className="card-title">{dt.count}</h1>
                                    </div>
                                </div>
                            </Col>)
                    })}
                </Row>
            </Container>
            <CreateTaskModal handleClose_m={handleClose_m} show_m={show_m}/>
            <CreateUserModal handleClose={handleClose} show={show}/>

            <TableData/>

        </div>
    );
}

export default Dashboard;