import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
const { context } = require('../context/globalcontext')
function Header(props) {
    const Context = useContext(context)
    const {state ,logOut}=Context
    return (
        <div style={{ backgroundColor: 'antiquewhite' }} >
            
            <nav className={`mb-5`} >
                <h1 className="navbar-brand" style={{fontSize:'40px'}}>
                    Mern Voting App
                </h1>
                <div>

                    { !state.isloggedin&&
                        <Link to="/signin">

                        <span className="btn btn-outline-danger" >
                            Login
                        </span>
                        </Link>
                    }
                    {state.isloggedin &&
                        <>
                        <div>
                            <Link to="/dashboard"> Dashboard</Link>
                            <Link to="/poll">Polls</Link>
                        </div>
                        <div>
                        <span className="btn btn-info">Name:{state.user.name}</span>

                        <Link to="/signin">
                        
                        <span className="btn btn-outline-danger" onClick={logOut}>
                            Logout
                        </span>
                            </Link>
                            </div>
                        </>
                    }
                </div>
                
            </nav>
        </div>
        
    );
}

export default Header;