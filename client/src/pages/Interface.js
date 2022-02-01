import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Vacations from '../components/Vacations'; 
import Navbar from '../components/Navbar';
import Adding from '../components/admin/adding';
import Chart from '../components/admin/chart';




class Interface extends Component {

    render() { 
        console.log(this.props) 
        return (
            <div>
                <Navbar name={this.props.firstName} role={this.props.role} /> 
                    <hr />
                    {this.props.role==1
                    ?
                    <h3 className="typePageName text-center">Welcom manager you can change whatever your want!</h3>
                    :
                    <h3 className="typePageName text-center">Welcome to place where your dreams come true!</h3>
                    }
                    <div className="container">   
                        <div>
                        <Route exact path='/' > 
                            <Vacations role={this.props.role} userId={this.props.userId}/>  
                        </Route>   
                        <Route path='/add' > 
                            <Adding />  
                        </Route>   
                        <Route path='/chart' > 
                            <Chart />  
                        </Route> 
                        </div>
                    </div >   
            </div>
            
        )
    }
}


const mapStateToProps = state => {
  console.log("mapStateToProps : ", state)
  return {
    vacations: state.vacations,
    role: state.role,
    userId: state.userId,
    firstName: state.firstName
      
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getAllVacations(value) {
          dispatch({
              type: 'getAllVacations',
              payload: value
          })
      },
     
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Interface);