import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {ButtonGroup, Card, Col, ListGroup, Row} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function DashboardUser() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [update, setUpdate] = useState(0)
    useEffect(() => {
        getAlltask()
    }, [update])
    const getAlltask = async () => {
        const {_id} = JSON.parse(localStorage.getItem('User'))
        console.log(_id)
        const resp = await axios.get(`https://crud-application-production.up.railway.app/api/v1/task?user_id=${_id}`, {
            headers: {
                Authorization: localStorage.getItem('Token')
            }
        })

        setData(resp.data.data)
    }

    const completeTask = async (task_id) => {
        try {
            const resp = await axios.get(`https://crud-application-production.up.railway.app/api/v1/task/complete/${task_id}`, {
                headers: {
                    Authorization: localStorage.getItem('Token')
                }
            })

            toast.success(resp.data.message)
            setUpdate(update + 1)
        } catch (e) {
            toast.error(e.response.data.message)
        }
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
                        <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
                    </div>
                </Container>
            </Navbar>
            <h1 className={'text-center m-1'}>User Task</h1>

            <Container>
                <Row>

                    {data.length > 0 && data.map((dt) => {
                        return (
                            <Col lg={3}>
                                <Card style={{width: '18rem'}} className={'m-2 text-center'}>
                                    <Card.Body>
                                        <Card.Title>{dt.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{dt.status}</Card.Subtitle>
                                        <Card.Text>
                                            {dt.description}
                                        </Card.Text>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Due Date {dt.due_date}</ListGroup.Item>
                                            <ListGroup.Item><Button
                                                disabled={dt.status === 'completed' || dt.status === 'expired'}
                                                onClick={(e) => {
                                                    completeTask(dt._id).then(r => {
                                                    })
                                                }}>Complete</Button></ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}

                </Row>
            </Container>
        </div>
    )
}

export default DashboardUser