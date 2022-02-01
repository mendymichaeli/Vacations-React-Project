import React, { Component } from 'react';
import { connect } from "react-redux";
import ModalEdit from './admin/Modal'; 
import * as axios from 'axios';
import io from 'socket.io-client'; 
const socket = io('http://localhost:5000'); 

class Vacation extends Component {

    state = {
        buttonClick: false,   
    }
    globalUrl="http://localhost:5000/"

    componentDidMount() {
           socket.on('vacationsChanged', (msg) => { this.getAllVacations()})
           this.checkFollow(); 
    }
    getAllVacations = async () => {
        try {await axios.get(`http://www.localhost:5000/admin/getAllVacations`).then(response => { 
            this.props.getAllVacations(response.data);})} catch (e) {console.log(e);}
    }
    updateVacation = async(val) =>{
        try {await axios.post(`http://www.localhost:5000/admin/updateVacation`,val).then(response => {   
            if (response.data[0] == 1)
            socket.emit('vacationsChanged','hello')})} catch (e) {console.log(e);}
    }
    checkFollow = async() =>{
        try {await axios.post(`http://www.localhost:5000/users/checkFollow`,this.props).then(response=> { 
            console.log("checkFollow:",response.data)
            if (response.data.id !=null || response.data.id>0 )
            this.setState({ buttonClick:true})})} catch (e) {console.log(e);}
    }
    followVacation = async(val) =>{
        console.log(val)
        try {await axios.post(`http://www.localhost:5000/users/followingVacations`,val).then(response => { 
            console.log("followVacation:",response.data)
           
        if (response.data[0] >0)
            socket.emit('vacationsChanged','hello')})} catch (e) {console.log(e);}
    }
    UnfollowVacation = async(val) =>{
        console.log(val)
        try {await axios.post(`http://www.localhost:5000/users/UnfollowVacation`,val).then(response => {
            console.log("followVacation:",response.data)   
        if (response.data[0] == 1)
            socket.emit('vacationsChanged','hello')})} catch (e) {console.log(e);}
            
    }
    deleteVacation = async (id) => {
        try {await axios.get(`http://www.localhost:5000/admin/deleteVacation?id=` + id).then(response => {
            if (response.data.status == 1)
            socket.emit('vacationsChanged','hello')})} catch (e) {console.log(e);}
    }
    follow() {
        this.setState(function (prevState) {
            return { buttonClick: !prevState.buttonClick };
        });
        if (!this.state.buttonClick) {
            this.followVacation(this.props);
        }else{
            this.UnfollowVacation(this.props);
        }
        
              
    }   
    render() {
        let imageUrl= this.globalUrl+this.props.v.image;
        return (
            <div className="row ">
            <div className="col s12 m7">
              <div className="card my-card">
                <div className="card-image">
                <img className="card-image" src={imageUrl} alt="image"></img>
                <h3 className="card-title text-center"><strong>{this.props.v.destination}</strong></h3>
                </div>
                <div className="card-content">
                  <span className="text-center vacDescription">{this.props.v.description}</span>
                  <p className="text-center vacation-dates"> From : { this.props.v.startDate}</p>
                  <p className="text-center vacation-dates">To : {this.props.v.endDate}</p> 
                </div>
                <p className="price text-center"><i className="fa fa-usd"></i>{this.props.v.price}</p>
                <div className="card-action">
                { 
                                this.props.role === 1
                            ?
                                //for admin
                                <div className="waves-effect waves-light ml-2 adminAction">
                                   <div className="row ">
                                   <i className="btn red lighten-2 material-icons ml-3 " onClick={()=>this.deleteVacation(this.props.v.id)}>delete</i>
                                    <ModalEdit forModal={this.props.v} btnEdit={this.updateVacation} />
                                   </div>
                                    <div className="followers">
                                    {
                                        this.props.v.followers>0
                                    ?
                                        <p>{this.props.v.followers}  followers  <i className="fa fa-eye"></i></p> 
                                    :
                                        <p>No followers</p> 
                                    }
                                    </div>
                                </div>
                            :    
                                //for users
                                <a className="waves-effect waves-light btn lighten-2 d-flex align-items-center" onClick={()=>this.follow()}  >{
                                    this.state.buttonClick 
                                    ?  
                                    <i className="material-icons green btn-round ">star</i> 
                                    : 
                                    <i className="medium material-icons red btn-round ">star_border</i>}
                                </a>
                            }
                </div>
             </div>
            </div>
          </div>)
          
            /* <div className="vacations card"  encType="multipart/form-data">
                <img className="card-image ml-3" src={imageUrl} alt="image" ></img>
                        <div className=" m-2 details" > 
                            <h3 className="card-title pt-1 text-center"><strong>{this.props.v.destination}</strong></h3>
                            <p className="text-center">{this.props.v.startDate}</p>
                            <p className="text-center">{this.props.v.endDate}</p>
                            <p className="text-center vacDescription">{this.props.v.description}</p>
                            <p className="price text-center"><i className="fa fa-usd"></i>{this.props.v.price}</p>
                            { 
                                this.props.role === 1
                            ?
                                //for admin
                                <div className="waves-effect waves-light d-flex justify-content-center ml-2 ">
                                   <div className="row">
                                   <i className="btn red lighten-2 material-icons ml-3" onClick={()=>this.deleteVacation(this.props.v.id)}>delete</i>
                                    <ModalEdit forModal={this.props.v} btnEdit={this.updateVacation} />
                                   </div>
                                    <div className="mt-3">
                                    {
                                        this.props.v.followers>0
                                    ?
                                        <p>{this.props.v.followers}  followers  <i className="fa fa-eye"></i></p> 
                                    :
                                        <p>No followers</p> 
                                    }
                                    </div>
                                </div>
                            :    
                                //for users
                                <a className="waves-effect waves-light btn red lighten-2 d-flex justify-content-center mx-5" onClick={()=>this.follow()}  >{
                                    this.state.buttonClick 
                                    ?  
                                    <i className="medium material-icons  btn-round">star</i> 
                                    : 
                                    <i className="medium material-icons   btn-round ">star_border</i>}
                                </a>
                            }
                        </div>
            </div> */
         
    }
} 
const mapStateToProps = (state) => {
    return {
            vacation: state.vacation 
    };
}
const mapDispatchToProps = dispatch => {
    return {
         getAllVacations(value) {
            dispatch({
                type: 'getAllVacations',
                payload: value
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Vacation);