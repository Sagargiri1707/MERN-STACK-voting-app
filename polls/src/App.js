import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './css/bootstrap.css'
import './App.css';

import Body from './core/body'
import Header from './components/header'
import Footer from './components/footer'

import Poll from './core/poll'
import Dashboard from './core/dashboard'
import Signin from './core/signin'
import Signup from './core/signup'


import AddQuestion from './admin/addQuestion'
import DeleteQuestion from './admin/deleteQuestion'
import Bodycss from './module.css/body.module.css'

function App() {
  return (
    <>
        <div className={`App ${Bodycss.container}`}>
          <div className={`${Bodycss.body}`}>
            <Header />
              <Switch>
                  <Route path="/" exact component={Body}/>
                  <Route path="/poll" exact component={Poll}/>
                  <Route path="/dashboard" exact component={Dashboard}/>
                  <Route path="/signin" exact component={Signin}/>
                  <Route path="/signup" exact component={Signup} />
                  <Route path="/admin/addquestion" exact component={AddQuestion}/>
                  <Route path="/admin/deletequestion" exact component={DeleteQuestion}/>
              </Switch>

          </div>
          <Footer/>
        </div>
      
    </>
    );
}

export default App;
