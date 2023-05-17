import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";

function CreateTaskModal({handleClose_m, show_m}) {
    const [user, setUser] = useState([])
    const {register, handleSubmit, watch,reset, formState: {errors}} = useForm();

    useEffect(()=>{
        getAlluser()
    },[])

    const getAlluser = async () => {
        const resp = await axios.get('https://crud-application-production.up.railway.app/api/v1/user?is_disable=false',{
            headers: {
                Authorization: localStorage.getItem('Token')
            }
        })
        setUser(resp.data.data)
    }

    const onSubmit = async (data) => {
        try {
            const resp = await axios.post('https://crud-application-production.up.railway.app/api/v1/task/create-task', data, {headers: {Authorization: localStorage.getItem('Token')}})
            handleClose_m()
            reset()
            toast.success(resp.data.message)
        } catch (e) {
            toast.error(e.response.data.message)
        }
    }
    return (
        <>
            <Modal show={show_m} onHide={handleClose_m}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mt-1">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Title"
                                {...register('title', {
                                    required: true
                                })}
                            />
                            {errors.title && <span className={'error'}>title is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <label>Description</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter description"
                                {...register('description', {
                                    required: true
                                })}
                            />
                            {errors.name && <span className={'error'}>name is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <label>Date</label>
                            <input
                                type="datetime-local"
                                className="form-control mt-1"
                                placeholder="Enter date"
                                {...register('due_date', {
                                    required: true
                                })}
                            />
                            {errors.date && <span className={'error'}>date is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <label>Select User</label>
                            <select className="form-control mt-1"
                                    placeholder="Enter user"
                                    {...register('user_id', {
                                        required: true
                                    })}>
                                <option>Select user</option>
                                {user.map((dt)=>{
                                    return(
                                        <option value={dt?._id}>
                                            {dt.name}
                                        </option>
                                    )
                                })}
                            </select>
                            {errors.password && <span className={'error'}>password is required</span>}
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateTaskModal