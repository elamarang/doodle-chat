import React, { Component } from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap'

 class ContactModal extends Component {
   constructor(props){
     super(props);
     this.state = {
              name:'',
              mobile:'',
              email:''
  };  
   }

   handleInputChange = e =>{
  this.setState({
      [e.target.name]:e.target.value
  })
}
componentDidUpdate(prevProps){
  if(this.props.show!==prevProps.show) 
  this.setState({name:'',  mobile:'',  email:''})
}
handleSubmit = e => {
  e.preventDefault()
  fetch('http://localhost:3000/add',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.email,
        mobile:this.state.mobile,
        name:this.state.name
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
          Add Contact
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
              <Button as="input" type="submit" value="Submit" />
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
  export default ContactModal;
