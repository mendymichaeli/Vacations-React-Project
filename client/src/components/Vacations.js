import React, { Component } from 'react';
import { connect } from "react-redux";
import Vacation from './Vacation'; 
import * as axios from 'axios';
import io from 'socket.io-client'; 
const socket = io('http://localhost:5000');


class Vacations extends Component {

    componentDidMount() {
        this.getAllVacations()
        socket.on('vacationsChanged', (msg) => {this.getAllVacations()})   
    }
    getAllVacations = async () => {  
        try {await axios.get(`http://www.localhost:5000/admin/getAllVacations`).then(response => { 
            console.log(response.data)
            if(this.props.role !=1){
                console.log("user")
                var vacationFromServer= response.data
                for (let i = 0; i < vacationFromServer.length; i++) {
                    console.log(vacationFromServer[i])
                    vacationFromServer[i].followingVacations =vacationFromServer[i].followingVacations.filter(v => v.userId==this.props.userId)    
                }
                console.log("sort")
                vacationFromServer.sort((a, b) => (a.followingVacations < b.followingVacations) ? 1 : -1) 
                console.log(vacationFromServer)
                this.props.getAllVacations(vacationFromServer)
            }else{
                console.log("admin")
                this.props.getAllVacations(response.data)
                 
            }
        })} catch (e) {console.log(e);}
    }
    render() {
    return (
        <div className="row admin m-2 justify-content-center">
            {this.props.vacations.map(v => <Vacation key={v.id} v={v} role={this.props.role} userId={this.props.userId}/>)}
        </div>  
    )  
    }
}
const mapStateToProps = (state) => {
    return {
            vacations: state.vacations 
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

export default connect(mapStateToProps, mapDispatchToProps)(Vacations);