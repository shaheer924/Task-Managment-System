import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

function CreateUserModal({handleClose, show}) {
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const resp = await axios.post('https://crud-application-production.up.railway.app/api/v1/user/create-user', data,
                {headers: {
                    Authorization: localStorage.getItem('Token')
                }}
                )
            toast.success(resp.data.message)
            handleClose()
            reset()
        } catch (e) {
            toast.error(e.response.data.message)
        }
    }
    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mt-1">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Username"
                                {...register('username', {
                                    required: true
                                })}
                            />
                            {errors.username && <span className={'error'}>username is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter name"
                                {...register('name', {
                                    required: true
                                })}
                            />
                            {errors.name && <span className={'error'}>name is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <label>Age</label>
                            <input
                                type="number"
                                className="form-control mt-1"
                                placeholder="Enter age"
                                {...register('age', {
                                    required: true
                                })}
                            />
                            {errors.age && <span className={'error'}>age is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                {...register('password', {
                                    required: true
                                })}
                            />
                            {errors.password && <span className={'error'}>password is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter confirm password"
                                {...register('confirm_password', {
                                    required: true
                                })}
                            />
                            {errors.confirm_password && <span className={'error'}>confirm password is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <label>Role</label>
                            <select
                                className="form-control mt-1"
                                placeholder="Enter role"
                                {...register('role_id', {
                                    required: true
                                })}
                            >
                                <option>select role</option>
                                <option value={'admin'}>admin</option>
                                <option value={'child'}>child</option>

                            </select>
                            {errors.role_id && <span className={'error'}>role id is required</span>}
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

export default CreateUserModal