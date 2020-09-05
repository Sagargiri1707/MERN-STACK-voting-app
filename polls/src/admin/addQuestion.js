import React, { useState, useContext } from 'react';
const { context}=require('../context/globalcontext')
function AddQuestion(props) {
    const [option, setOption] = useState('')
    const [options, setOptions] = useState({
        post: '',
        contenders: []
    })

    const { AddPoll }=useContext(context)
    const changeValue = (e) => {
        setOption(
            e.target.value
        )        
    }
    const AddOption = (e) => {
        
        const contenders = document.getElementById('addoptions').value
        if (contenders)
        {
            setOptions(
            {
                ...options,
                contenders:[...options.contenders,contenders]
            })
            setOption('')
        }
    }
    const deleteOption = (e) => {
        
        setOptions({
            ...options,
            contenders:[...options.contenders.filter(option=> option!==e.target.value)]
        })
    }
    const submitForm = (e) => {
        e.preventDefault()
        AddPoll(options)
        setOption('')
        setOptions({
            post: '',
            contenders: []
        })
    }
    const changeQuestion = (e) => {        
        setOptions({
            ...options,
            post: e.target.value
        })
    }
    return (
    <form onSubmit={submitForm}>
            
        <span>
          <label>
          Enter the post name:

          </label>
                <input
                    type="text"
                    id="Post"
                    value={options.post}
                    onChange={changeQuestion}
                    placeholder="Question"
                    required
                /><br />
            </span>
            
            <br /><br />
            <span>
                <input
                    id="addoptions"
                    name="options"
                    value={option}
                    placeholder="enter the contenders"
                    onChange={changeValue} />
                <button
                    type='button'
                    className="btn btn-primary "
                    style={{ margin: '10px' }}
                    onClick={AddOption}
                >
                +
            </button>
            </span >
            <ul>
                {options.contenders.map((data, index) => {
                    return(
                    <li key={index} style={{margin:'10px'}}>
                            <span>{data}
                                <button
                                    type="button"
                                    value={data}
                                    onClick={deleteOption}
                                    className="btn btn-sm btn-danger"
                                    style={{marginLeft:'10px'}}
                                >
                                    X
                                </button></span>
                    </li>)
                })}
            </ul>
        <br/>
          <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    
    );
}

export default AddQuestion;