import React, { Component } from 'react';
import { connect } from "react-redux";
/* import { RegisterRequest } from '../State/actions' */
import { Link } from 'react-router-dom';
import * as axios from 'axios';


class Register extends Component {
  state = {
    firstName: '',
    sureName: '',
    email: '',
    password: '',
    role:0,
    
  }

  createUsers = async()=> {
    console.log("state:",this.state)
    console.log();
        try {await axios.post(`http://www.localhost:5000/users/createUsers`,this.state).then(response => {
            console.log(response.data);
            if(response.data){
              alert(response.data.message);
              this.props.history.push("/login"); 
            }      
    })} catch (e) {console.log();}
  }
 

  render() {
    return (
      <div className="col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto mt-lg-5">
        <div className="card">
          <div className="card-body">
            <h3>Register</h3>
            <div className="md-form">
              <input onChange={(e) => this.onChange(e)} name="firstName" type="text" placeholder="First Name" className="form-control" />
            </div>
            <hr />
            <div className="md-form">
              <input onChange={(e) => this.onChange(e)} name="sureName" type="text" placeholder="Last Name" className="form-control" />
            </div>
            <hr />
            <div className="md-form">
              <input onChange={(e) => this.onChange(e)} name="email" type="text" placeholder="Email" className="form-control" />
            </div>
            <hr />
            <div className="md-form">
              <input onChange={(e) => this.onChange(e)} name="password" type="password" placeholder="Password" className="form-control" />
            </div>
            <div className="text-center m-3">
              <button className="btn btn-primary" onClick={()=> this.register()}>Sign up</button>
              <hr />
              {this.props.email}
              If you're already registered,
             <Link to="/" id="linkB"> Sign in here!</Link>
            </div>
          </div>
        </div>
      </div>

    );
  }

  onChange=(e)=> {
    this.setState({ [e.target.name]: e.target.value })
    console.log({ [e.target.name]: e.target.value })
    console.log("props",this.props.email)
    console.log("props",this.props.role)

  }

  //async 
  register=()=> {
    let mandatory = this.state;
    if (mandatory.firstName === '') {
      alert('First Name required!')
    }
    else if (mandatory.sureName === '') {
      alert('Last Name required!')
    }
    else if (mandatory.email === '') {
      alert('email required!')
    }
    else if (mandatory.password === '') {
      alert('Password required!')
    }
    else {
      
      this.createUsers()
     
      
    }
  }
}
const mapStateToProps = (state) => {
  return { msg: state.msg,
            email: state.email,
            role: state.role };
    
}

const mapDispatchToProps = dispatch => {
  return {
    registerRequest: function (data) {
      return dispatch(data);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

