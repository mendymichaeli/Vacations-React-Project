import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as axios from 'axios';


class Login extends Component {
 
  state = {
    email:null,
    password:null,
  }
  
  componentDidMount(){
    this.setState({email:'',password:'',})
    this.check()
  }

  getUserForLogin = async (e) => {
    await this.props.errorCurrentUser(null)
    try {console.log("getUser", )
        await axios.post(`http://www.localhost:5000/users/getUserForLogin`,this.state).then(response =>{
          console.log("getUserForLogin: ",response.data)
          if(response.data.isLogged){
            //get user details from local storage if logged in
              localStorage.setItem('currentUserPassword',JSON.stringify(this.state.password));
              localStorage.setItem('currentUserEmail',JSON.stringify(this.state.email));
              this.props.saveCurrentUser(response.data)
          }else{
            if(this.state.email){
              this.setState({email:'',password:'',})
              if(e==2) //active login
              this.props.errorCurrentUser("Username or password is incorrect!")
              console.log("email:",this.state)
            }   
          }   
    })} catch (e) {console.log("error or no local storage");}
    console.log("role:",this.props.role)
    console.log("email:",this.props.email)
  }
 
  //checking login in uplaod
  check=async() =>{
    console.log("check")
    if(localStorage){
      let email= JSON.parse(localStorage.getItem('currentUserEmail'))
      let password= JSON.parse(localStorage.getItem('currentUserPassword'))
      await this.setState({   
         email:email,
        password:password,
      })
      console.log("setState:",this.state)
      this.getUserForLogin(1)
    }
  }
//filling up the state
  onChange=(e)=> {
    this.props.errorCurrentUser(null)
    this.setState({ [e.target.name]: e.target.value })
    console.log({ [e.target.name]: e.target.value })
  }

  login=()=> {
    if (!this.state.email) {
      alert('email required!');
    }
    else if (!this.state.password) {
      alert('password required!');
    }
    else {
      this.getUserForLogin(2)
    }
  }


  render() {
    return (
      <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto mt-lg-5">
        <div className="logincard">
          <div className="card-body ">
            <h3>Login</h3>
            <div className="md-form d-flex align-items-center">
              <i className="fa fa-user prefix "></i>
              <input autoFocus onChange={(e) => this.onChange(e)} name="email" type="email" placeholder="Email" className="form-control loginIput" />
            </div>
            <hr />
            <div className="md-form d-flex align-items-center">
              <i className="fa fa-lock prefix "></i>
              <input onChange={(e) => this.onChange(e)} name="password" type="password" placeholder="Password" className="form-control loginIput" />
            </div>
            <div className="md-form text-danger">
             {this.props.msg} 
            </div> 
            <div className="text-center m-3">
              <button className="btn btn-primary" onClick={()=> this.login()}><Link to="/" id="linkB" >Login</Link></button>
              <hr />
              If you don't have an account yet ?
              <Link to="/register" id="linkB">    Sign up here!</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 

const mapStateToProps = (state) => {
  //debugger;
  return { isLogged: state.isLogged,
            role: state.role, 
            msg: state.msg,
            email: state.email 
          };
}

const mapDispatchToProps = dispatch => {
  return {
    saveCurrentUser(value) {
      dispatch({
          type: 'saveCurrentUser',
          payload: value
      })
    },
    errorCurrentUser(value) {
      dispatch({
          type: 'errorCurrentUser',
          payload: value
      })
    }
 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
