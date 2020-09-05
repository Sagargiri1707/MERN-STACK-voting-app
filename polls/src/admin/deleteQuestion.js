import React, { useContext, useState } from 'react';

const {context}=require('../context/globalcontext')
function DeleteQuestion(props) {
    const Context = useContext(context)
    const { state,deletePoll } = Context
    
    const [id, setId] = useState({ data: [] })
    
    const DeletePost = (e) => {
        const data = document.getElementById(e.target.id)
        if (data.classList[2] === 'btn-warning')
            document.getElementById(e.target.id).className = "btn btn-raised btn-danger"
        else
            document.getElementById(e.target.id).className = "btn btn-raised btn-warning"
            
        if (id.data.filter(data => data !== e.target.value).length===id.data.length) {
            setId({
                ...id,
                data:[...id.data,e.target.value]
            }) 
        }
        else{
            setId({
                ...id,
                data: id.data.filter(data => data !== e.target.value)
            })
        }
    }
    const Submit = () => {
        deletePoll(id)
        
    }
    return (
        <div>
           
            <h1>DeleteQuestion</h1>
            <h5>(Click on the question to delete)</h5>
            {state.poll.length > 0 ?
                state.poll.map((data) => {
                    return (
                        <div key={data._id}>
                            <button
                                id={data._id}
                                className="btn btn-raised btn-warning"
                                style={{
                                    margin: '10px',
                                    minWidth:'90px'
                                }}
                                value={data._id}
                                onClick={DeletePost}
                            >{data.post}</button>
                        </div>
                    )
                })
                : <h2>loading</h2>}
                        <button onClick={Submit} className="btn btn-info">Delete Selected Question</button>

        </div>
    );
}

export default DeleteQuestion;