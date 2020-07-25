import React, { Component } from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap'

 class EditModal extends Component {
    state = {
            name:'',
            mobile:'',
            email:''
        };  
        componentDidUpdate(prevProps) {
            if((prevProps.name!==this.props.name)&&(prevProps.mobile!==this.props.mobile)&&(prevProps.email!==this.props.email))
            this.setState({
                name:this.props.name,
                mobile:this.props.mobile,
                email:this.props.email
            });
        }

handleInputChange = e =>{
  this.setState({
      [e.target.name]:e.target.value
  })
}
handleSubmit = e => {
  e.preventDefault()
  fetch('https://stormy-taiga-19928.herokuapp.com/update',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.email,
        mobile:this.state.mobile,
        name:this.state.name,
        id:this.props.currentindex
      })
    }).then(
            this.props.onHide()
    );
}

  render() {
    
    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <Row>
            <Col sm={6}>
              <Form onSubmit={this.handleSubmit} autoComplete="off">
                <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    name="name"
                    value= {this.state.name}
                    onChange={this.handleInputChange}
                    required/>
              </Form.Group>
              <Form.Group controlId="mobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control 
                    type="text" 
                    name="mobile"
                    value= {this.state.mobile}
                    onChange={this.handleInputChange}
                    required/>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    name="email"
                    value= {this.state.email}
                    onChange={this.handleInputChange}
                    required/>
              </Form.Group>
              <Button as="input" type="submit" value="Submit"/>
              </Form>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}
  export default EditModal;
