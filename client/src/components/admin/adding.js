import React, { Component } from 'react';
import { connect } from "react-redux";
import * as axios from 'axios';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import FileUploadIcon from '@mui/icons-material/FileUpload';
const socket = io('http://localhost:5000');

class Adding extends Component {

    VacationDetails = {
        description: '',
        destination: '',
        image: '',
        startDate: '',
        endDate: '',
        price: ''
    }
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Adding = React.createRef();
    }
    handleSubmit(event) {
        event.preventDefault();
        alert(
            `Selected file - ${this.Adding.current.files[0].name}`
        );
    }
    fileInput = React.createRef();
    componentDidMount() {
        socket.on('vacationsChanged', (msg) => { this.getAllVacations() })
    }
    getAllVacations = async () => {
        try {
            await axios.get(`http://www.localhost:5000/admin/getAllVacations`).then(response => {
                this.props.getAllVacations(response.data);
            })
        } catch (e) { console.log(e); }
    }
    addVacation = async (e) => {
        console.log(e);
        try {
            await axios.post(`http://www.localhost:5000/admin/createVacation`, e).then(response => {
                socket.emit('vacationsChanged', 'hello')
            })
        } catch (e) { console.log(e); }
    }
    //filling up VacationDetails--(state) 
    onChange = async (e) => {
        //if for images
        if (e.target.name == "image") {
            let file = e.target.files[0];
            const formData = new FormData();
            formData.append("uploads[]", file, file['name']);
            await axios.post("http://www.localhost:5000/upload", formData)
                .then((response) => {
                    this.VacationDetails["image"] = `${response.data.path}`;
                    alert(`${e.target.value} file is successfully uploaded`);
                    console.log("alert : ", e.target.name, e.target.value)
                }).catch((error) => { alert(error) });
        }
        console.log("Change : ", e.target.name, e.target.value)
        this.VacationDetails[e.target.name] = e.target.value;
        this.render()

    }
    render() {
        console.log("his.VacationDetails.image: ", this.VacationDetails.image)
        return (
            <div className="Add form-group">
                <h4 className='d-flex justify-content-center m-3'>Please add a new vacation</h4>
                <div className="md-form form-group">
                    <input onChange={(e) => this.onChange(e)} required name="destination" placeholder="Destination" className="form-control adding" />
                </div>
                <div className="md-form form-group">
                    <textarea onChange={(e) => this.onChange(e)} required name="description" placeholder="Description" className="form-control adding" rows="2"></textarea>
                </div>
                <div className="md-form form-group ">
                    <label htmlFor="file" className='fileIcon' ><FileUploadIcon className='FileUploadIcon' /> Upload Image </label>
                    <input type="file" id="file" ref={this.Adding} onChange={(e) => this.onChange(e)} required name="image" className="form-control adding fileIconNone" ref={this.fileInput} />
                </div>
                <div className="md-form form-group">
                    <input onChange={(e) => this.onChange(e)} name="startDate" required type="date" className="form-control adding" />
                </div>
                <div className="md-form form-group">
                    <input onChange={(e) => this.onChange(e)} name="endDate" type="date" required className="form-control adding" />
                </div>
                <div className="md-form form-group">
                    <input onChange={(e) => this.onChange(e)} name="price" type="number" required placeholder="Price in USD" className="form-control adding" />
                </div>
                <div className="text-center">
                    <Link to="/"><button className="btn blue lighten-2 col-5" onClick={() => this.addVacation(this.VacationDetails)}><i class="material-icons">send</i></button></Link>
                </div>
              
            </div>);
    }
}
const mapStateToProps = state => {
    console.log("mapStateToProps : ", state)
    return {
        vacations: state.vacations,

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
export default connect(mapStateToProps, mapDispatchToProps)(Adding);