import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,Label,Input } from 'reactstrap';

class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState,
      id: this.props.forModal.id,
      destination: this.props.forModal.destination,
      image: this.props.forModal.image,
      startDate: this.props.forModal.startDate,
      endDate: this.props.forModal.endDate,
      price:this.props.forModal.price,
      description: this.props.forModal.description
    };
  }
  render() {
    return (
      <div className="modalEdit col-5">       
        <i className=" btn-secondary btn material-icons" onClick={()=>this.toggle()}>edit</i>
        <Modal isOpen={this.state.modal} toggle={()=>this.toggle()} className={this.props.className + `card`}>
          <ModalHeader toggle={()=>this.toggle()}>Edit This Vacation</ModalHeader>
          <ModalBody>
          <Form className="p-1">
            <FormGroup>
              <Label for="Destination">Destination</Label>
              <Input  onChange={(e)=>this.onChange(e)} name="destination"  type="text" placeholder={this.props.forModal.destination} />
            </FormGroup>
            <FormGroup>
              <Label for="Start">Image</Label>             
              <Input type="file" onChange={(e) => this.onChange(e)} name="image" placeholder={this.props.forModal.image}/>
            </FormGroup>
            <FormGroup>
              <Label for="Start">Start Date</Label>
              <Input onChange={(e)=>this.onChange(e)} name="startDate"  type="date" placeholder={this.props.forModal.startDate}  />
            </FormGroup>
            <FormGroup>
              <Label for="End">End Date</Label>
              <Input  onChange={(e)=>this.onChange(e)} name="endDate" type="date" placeholder={this.props.forModal.endDate} />
            </FormGroup>
            <FormGroup>
              <Label for="Description">Description</Label>
              <Input  onChange={(e)=>this.onChange(e)} name="description" type="text" placeholder={this.props.forModal.description} />
            </FormGroup>
            <FormGroup>
              <Label for="Price">Price($)</Label>
              <div>
              <Input onChange={(e)=>this.onChange(e)} name="price" type="number" placeholder={this.props.forModal.price} />
              </div>
            </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className='d-flex justify-content-around align-items-center'>
            <Button color="primary" className="btn blue lighten-2" onClick={()=>this.saveVacation()}>Save</Button>
            <Button color="secondary" className="btn red lighten-2" onClick={()=>this.toggle()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  //close the modal
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
//filling up the this state to edit 
  onChange(e) {
    if (e.target.name == "image") {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("uploads[]",file,file['name']);
      console.log(formData)
      axios.post("http://www.localhost:5000/upload", formData)
      .then((response) => {this.state["image"]= `${response.data.path}`;
      console.log(response)
          alert("The file is successfully uploaded");   
      }).catch((error) => { alert(error)});   
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  saveVacation() {
    console.log("btnEdit : ",this.state)
    this.props.btnEdit(this.state)
    this.toggle();
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

const modalEdit = connect(null, mapDispatchToProps)(ModalEdit)
export default modalEdit;

