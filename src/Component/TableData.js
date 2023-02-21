import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ShowTable from "./ShowTable";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";

function TableData(){

    const [col, setCol] = useState([])
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const disableUser = async (id) => {
        try {
            const resp = await axios.post(`https://crud-application-production.up.railway.app/api/v1/user/disable-user/${id}`,{},{
                headers: {
                    Authorization: localStorage.getItem('Token')
                }
            })
            toast.success(resp.data.message)
        } catch (e) {
            toast.error(e.response.data.message)
        }


    }

    const getAlluser = async () => {
        const resp = await axios.get('https://crud-application-production.up.railway.app/api/v1/user',{
            headers: {
                Authorization: localStorage.getItem('Token')
            }
        })
        setData(resp.data.data)
        setCol([
            {name: 'Name', selector: row => row.name,},
            {name: 'Username', selector: row => row.username},
            {name: 'Age', selector: row => row.age,},
            {name: 'Role', selector: row => row.role_id},
            {name: 'Disable User', selector: row => <Button disabled={row.is_disable} onClick={(e)=>{
                    disableUser(row._id)
                }}>Disable</Button>}
        ])

        setTitle('Users')

    }

    const getAlltask = async () => {
        const resp = await axios.get('https://crud-application-production.up.railway.app/api/v1/task',{
            headers: {
                Authorization: localStorage.getItem('Token')
            }
        })

        setData(resp.data.data)
        setCol([
            {name: 'Title', selector: row => row.title},
            {name: 'Description', selector: row => row.description},
            {name: 'Status', selector: row => row.status},
            {name: 'Due Date', selector: row => row.due_date},
            // {name: "Assigned To", selector: row => row.user_id.name}
        ])

        setTitle('Tasks')
    }

    return(
        <div className={'m-5'}>
            <ToastContainer />
            <ButtonGroup aria-label="Basic example">
                <Button variant="outline-primary" onClick={getAlluser}>Users</Button>
                <Button variant="outline-primary" onClick={getAlltask}>Tasks</Button>
            </ButtonGroup>
            <ShowTable title={title} columns={col} data={data}/>
        </div>
    )
}

export default TableData