import React,{createContext,useState, useEffect} from 'react';
const {
    addpoll, deletepoll,
    submitpoll, Isloggedin,
    getpolls, Signup, Signin,
    GetCsrf, getUser, logout
} = require('../post/routes')


const context=createContext()

function Globalcontext(props) {
    const [state, setState] = useState({
        poll: [],
        results: [],
    })
    useEffect(() => {
        Isloggedin()
            .then(res => {
                console.log(res.data);
                
                setState(s => ({
                    ...s,
                    user:res.data.user,
                    isloggedin:res.data.auth
            }))
            })
        getUser()
            .then(res => {
                console.log(res.data,12);
                
                setState(s => ({
                    ...s,
                    user:res.data
            }))
        })
    }, [state.isloggedin])
    
    useEffect(() => {
       
        GetCsrf()
            .then(res => {
                setState(s => ({
                ...s,
                csrf:res.data.csrf
            }))
        })
    }, [])
    
    useEffect(() => { 
       
        getpolls()
            .then(res => {
                console.log(res,12123);
                
                setState(s=>({
                    ...s,
                    poll: res.data.poll,
                    results:res.data.results
                }))
        })
   
    }, [state.poll.length])

    const AddPoll = (data) => {
        addpoll(data)
            .then(res => {
                setState({
                    ...state,
                    poll:[...state.poll,res.data]
                })
        
        })
    }
    const submitPoll = (data) => {
        submitpoll(data)
            
        getpolls()
        .then(res => {
            console.log(res,);
            
            setState(s=>({
                ...s,
                poll: res.data.poll,
                results:res.data.results
            }))
    })
    }
    const deletePoll = (data) => {
        deletepoll(data)
            .then(res => {
                setState({
                    ...state,
                    poll:res.data
            })
        })
    }
    const signup = (data) => {
        Signup(data)
            .then(res => {
                console.log(res.data);

        })        
    }

    const signin = (data) => {
        Signin(data)
            .then(res => {                    
                    setState(s => ({
                        ...s,
                        user:res.data.user,
                        isloggedin: res.data.auth,
                        poll: res.data.poll,
                        results:res.data.results
                }))
            })
            .catch((err)=> {
        console.log(err);
        
            })
    }
    const logOut = () => {
        logout()
            .then(res => {
                                    
                    setState(s => ({
                        ...s,
                        user:null,
                        isloggedin:false
                }))
                            
            })
            
    }
    
    return (
        <context.Provider value={{
            state,
            AddPoll,
            submitPoll,
            getpolls,
            deletePoll,
            signup,
            signin,
            logOut
        }}>
            {props.children}
        </context.Provider>
    );
}

export { context, Globalcontext };