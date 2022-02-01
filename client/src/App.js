import React, { Component } from 'react';
import { connect } from "react-redux";
import * as axios from 'axios';
import './App.css';
import Home from './pages/Home';
import Interface from './pages/Interface';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  state = {
    email:null,
    password:null,
  }
  componentDidMount(){
    this.check()
  }

  getUserForLogin = async () => {
    try {console.log("getUser",this.state )
        await axios.post(`http://www.localhost:5000/users/getUserForLogin`,this.state).then(response =>{
          console.log("getUserForLogin: ",response.data)
          if(response.data.isLogged)
              this.props.saveCurrentUser(response.data)  
              console.log("no local storage")
    })} catch (e) {console.log(e);}
    console.log("props:",this.props)
  }

  check=async() =>{
    console.log("start check")
    if(localStorage){
      let email= JSON.parse(localStorage.getItem('currentUserEmail'))
      let password= JSON.parse(localStorage.getItem('currentUserPassword'))
      await this.setState({ email:email, password:password,})
      console.log("setState:",this.state)
      this.getUserForLogin()
    }
  }

  render() {
    if (this.props.isLogged === true) {
      return (
       <div>
          <Interface  role={this.props.role} firstName={this.props.firstName} userId={this.props.userId} />
       </div>
      )
    }
    else{
      return (
        <div className="App">
          <Home/>
        </div>
      );
    } 
  }
}

const mapStateToProps = (state) => {
  return { isLogged: state.isLogged,
            role:state.role,
            userId:state.userId,
            firstName:state.firstName,
  };
}

const mapDispatchToProps = (dispatch) => {
  
  return  {
    saveCurrentUser(value) {
      dispatch({
          type: 'saveCurrentUser',
          payload: value
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

