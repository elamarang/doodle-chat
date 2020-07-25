import React, { Component } from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'


 class ChatWindow extends Component {
     constructor(){
        super();
        this.state = {
            msg:'',
            msgList:[{id:'',fromid:'',toid:'',msg:''}]
        }   
     }
     componentDidMount(){
        if(this.props.show===true)        
        this.setMsgs();
     }
      componentDidUpdate(prevProps) {
        if(this.props.show===true)        
        this.setMsgs();
      }

      setMsgs =() =>{
        fetch('https://stormy-taiga-19928.herokuapp.com/msgs',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                fromid:this.props.currentuserid,
                toid:this.props.currentindex,
            })})            
        .then(Response=>Response.json())
        .then(msgs=>{
          if(msgs!=='not found'){
          this.setState({msgList: msgs})
        }
        else
        this.setState({msgList:[{id:'',fromid:'',toid:'',msg:''}]})
        });
      }
     handleInputChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
      }
    handleSubmit = e => {
        e.preventDefault()
        fetch('https://stormy-taiga-19928.herokuapp.com/sendmsg',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        fromid:this.props.currentuserid,
        toid:this.props.currentindex,
        msg:this.state.msg
      })
    }).then(
        this.setMsgs(),
        this.setState({msg:''})
    );
        
      }     
    render() {
        let {msgList} = this.state;
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Messages:{this.props.msgtouser}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <Row>
                  <Col sm={12}>
                  <ListGroup style={{'maxHeight': 'calc(100vh - 350px)', 'overflowY': 'auto'}}>
                      { 
                          msgList.map((item,index)=>
                            <ListGroup.Item key={index} 
                            className={item.fromid===parseInt(this.props.currentuserid)?'right':'left'}
                            variant={item.fromid===parseInt(this.props.currentuserid)?'dark':'info'}>{item.msg}</ListGroup.Item> )                         
                      }
                  </ListGroup><hr/>
                  <div display='inline'>
                  <Form onSubmit={this.handleSubmit} autoComplete="off">
                  <Form.Group controlId="msg">
                    <Form.Control 
                    type="text" 
                    name="msg"
                    onChange={this.handleInputChange}
                    value={this.state.msg}
                    placeholder="Type Something"
                    />
              </Form.Group>{' '}
              <Button as="input" type="submit" value="Send"/>
                  </Form>
                  </div>
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

export default ChatWindow;
