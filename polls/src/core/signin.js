import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
const { context } = require('../context/globalcontext')
const {Isloggedin }=require('../post/routes')
function Signin(props) {
    const Context = useContext(context)
    const { signin,state } = Context
 

    const [data, setData] = useState({
        _csrf:'',
        email: '',
        password:''
    })
    useEffect(() => { 
        
        setData(s => ({
            ...s,
            _csrf:state.csrf
        }))
        
          
    },[state.csrf])
    
    const submitForm = (e) => {
        e.preventDefault()
        
        signin(data)
        
    }
    const changeValue = (e) => {
        setData({
            ...data,
            [e.target.name]:e.target.value
        })        
    }
    if (state.isloggedin) {
        return (
            <Redirect to="/poll" /> 
)    }
    else
    return (
        <div>
            <form onSubmit={submitForm}>
                
          
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        onChange={changeValue}
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={changeValue}
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required />
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Signin;