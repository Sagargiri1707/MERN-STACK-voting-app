import React, { useContext, useState } from 'react';
import { Redirect,Link } from 'react-router-dom';
const {context} =require('../context/globalcontext')
function Poll(props) {
    const Context = useContext(context)
    const { state ,submitPoll} = Context
    const [result,setResult]=useState({poll:[]})
    
    const submitData = () => {
        submitPoll(result.poll)
    }
    const selectPoll = (e) => {
        const data={
            quesId: e.target.name,
            ansId: e.target.value,
            userId:state.user._id
        }
        
        setResult({
            ...result,
            poll:[...result.poll.filter(da=>da.quesId!==data.quesId),data]
        })
    }
    
    if (!state.user)
        return <Redirect to="/signin"/>
    return (
        <>
        {state.isloggedin?<div>
            
            {
                state.poll.length>0 ?
                    state.poll.map((data, id) => {
                        return ( 
                            <div key={id}>
                                <div><h4>{data.post}</h4>  </div>
                                <span className="options" onChange={selectPoll}>
                                    {
                                        data.contenders.map((option, id) => {
                                            return(
                                                <label 
                                                    key={id}
                                                    style={{
                                                        paddingLeft: '20px'
                                                    }}>
                                                    
                                                    <h5>{option.option}</h5>
                                                    <input
                                                        type="radio"
                                                        name={data._id}
                                                        value={option._id}
                                                        ks="ss"
                                                    />
                                                    <span
                                                        className="checkmark" />
                                                </label>
                                            )
                                        })
                                    }
                                    
                                </span>
                               
                            </div>
                        )
                    })
                    :
                    <h2>looks like you have attented all the polls....</h2>
                    
            }
                {
                    state.isloggedin && state.poll.length > 0 ?
                    <Link to="/dashboard"
                    className="btn btn-raised btn-outline-info"
                    onClick={submitData}
                        >Submit</Link>
                        :<></>
                }
                            
            </div>:<>Loading...</>    
    }
            </>
    );
}

export default Poll;