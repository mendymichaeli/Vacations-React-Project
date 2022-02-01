import React, { Component } from 'react';
import { connect } from "react-redux";
import io from 'socket.io-client';
import * as axios from 'axios';
var Chart = require('chart.js'); 
const socket = io('http://localhost:5000'); 


class Charts extends Component {

	componentDidMount= () =>{
		this.getAllVacations()
		socket.on('vacationsChange', (msg)=> {this.props.getAllVacations()})
	}
	getAllVacations = async () => {
        try {await axios.get(`http://www.localhost:5000/admin/getAllVacations`).then(response => {  
			this.props.getAllVacations(response.data);})} catch (e) {console.log(e);}
			this.showChart()
	}
	showChart= () =>{
		console.log("this.props.vacations:",this.props.vacations)
		let vacationfollowers = this.props.vacations.filter(v => v.followers !=0 );
		let destinationsArray = [];
		let followers = [];


		//filling up the labels and data
        for (let i = 0; i < vacationfollowers.length; i++) {
            destinationsArray.push(vacationfollowers[i].destination);
            followers.push(vacationfollowers[i].followers);
		}

		//create chart
		console.log("vacationfollowers:",vacationfollowers)
		var ctx = document.getElementById('myChart').getContext('2d');
		new Chart(ctx, {
					type: 'bar',
					data: {
						labels: destinationsArray,
						datasets: [{
							label: 'Chart of Followers',
							data: followers,
							backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)'
							],
							borderColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)'
							],
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				});
	}
	render() {
		
		return (
		<div className="mychart">
			<canvas id="myChart" height={400} ></canvas>
		</div>
		);
	}
}
let mapStateToProps = function (state) {
    return { vacations: state.vacations };
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
};
export default connect(mapStateToProps, mapDispatchToProps)(Charts);
