import React,{useState, useContext,useEffect} from 'react';
const { context } = require('../context/globalcontext')
const {Redirect} =require('react-router-dom')
function Signup(props) {
    const Context = useContext(context)
    const { signup,state } = Context
    
    const [data, setData] = useState({
        _csrf:'',
        name: '',
        email: '',
        password: '',
        password2:''
    })    
   
    useEffect(() => { 
        setData(s => ({
            ...s,
            _csrf:state.csrf
        }))
        
          
    },[state.csrf])
    

    const submitForm = (e) => {
        e.preventDefault()        
        
        
        signup(data)
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
        )
    }
    else
    return (
        <div>
            
            <form onSubmit={submitForm} >
               
            <div className="form-group" >
                    <label htmlFor="name">Name</label>
                    <input onChange={changeValue} type="text" name="name" className="form-control" id="name" placeholder="Name " required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input onChange={changeValue} type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Password</label>
                    <input onChange={changeValue} type="password" name="password" className="form-control" id="password" placeholder="Password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwords">Enter password again</label>
                    <input onChange={changeValue} type="password" name="password2" className="form-control" id="password2" placeholder="Enter Password again"  />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
        </div>
    );
}

export default Signup;