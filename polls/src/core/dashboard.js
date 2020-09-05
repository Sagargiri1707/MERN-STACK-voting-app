import React, { useContext, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
const {context}=require('../context/globalcontext')
function Dashboard(props) {
    const Context = useContext(context)
    const { state } = Context   
    if (!state.user)
        return <Redirect to="/signin"/>
    else
    return (
        <div>
            
            {
                state.results.length>0 ?
                    state.results.map((data,id) => {
                        return (
                            <div key={id} style={{ border: '2px solid black', margin: '20px' }}>     
                                <h2 style={{borderBottom:'2px solid black'}}>
                                    Post name:{data.post}
                                </h2>
                                {
                                    data
                                        .contenders
                                        .map((da) => {
                                            return (
                                                <div key={da._id}>
                                                    <p>Contender:{da.option}</p>
                                                    <p>Votes:{da.votes}</p>
                                                </div>
                                                
                                            )
                                            
                                    })
                                }

                            </div>   
                            
                            
                    )  
                    })
                :
                    <>Loading</>
            }
        </div>
    );
}

export default withRouter (Dashboard);