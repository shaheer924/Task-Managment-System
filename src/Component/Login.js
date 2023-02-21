import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './../App.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


function Login(){
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try{
            const resp = await axios.post('https://crud-application-production.up.railway.app/api/v1/user/login',data)
            localStorage.setItem('Token', `Bearer ${resp.data.token}`)
            localStorage.setItem('User', JSON.stringify(resp.data.data))
            toast.success(resp.data.message)
            setTimeout(()=>{
                if(resp.data.data.role_id === 'admin'){
                    navigate('/dashboard')
                } else {
                    navigate('dashboard-user')
                }

            },1000)
        }catch (e) {
            toast.error(e.response.data.message)
        }

    }
    return(
        <div className="Auth-form-container">
            <ToastContainer />
            <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            {...register('username', {
                                required: true
                            })}
                        />
                        {errors.username && <span className={'error'}>username is required</span>}
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
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Note: Please login with your username and password
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login