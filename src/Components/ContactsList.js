import React, { Component } from 'react';
import ContactModal from './ContactModal.js';
import EditModal from './EditModal.js';
import {Button, ButtonToolbar,Table} from 'react-bootstrap';
import ChatWindow from './ChatWindow.js';


class ContactsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentindex: -1,
            selectedName:'',
            selectedMobile:'',
            selectedEmail:'',
            addModalShow : false,
            editModalShow : false,
            chatWindowShow : false,
            msgtouser:''
        } 
    }
     deleteItem = (id) => {
        fetch('http://localhost:3000/remove',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        id:id
      })
    }).then(
    this.props.refreshList()
    );
    }


    render() {
        
        let addModalClose = () =>{
            this.setState({addModalShow:false})
            this.props.refreshList();
        };
        let editModalClose = () =>{
            this.setState({editModalShow:false})
            this.props.refreshList();
        };
        let chatWindowClose = () =>{this.setState({chatWindowShow:false})};
        return (
            <div>
                <hr/>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                    <tbody>
                        {   
                            this.props.users.map((item,index)=>{
                                return <tr key={index} hidden={item.name===this.props.currentusername?true:false}>
                                    <td>{item.name}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.email}</td>
                                    <td>
                                    <Button
                                        variant="primary"
                                        onClick={()=>{
                                            this.setState({currentindex:item.id})
                                            this.setState({selectedName:item.name})
                                            this.setState({selectedMobile:item.mobile})
                                            this.setState({selectedEmail:item.email})
                                            this.setState({editModalShow:true})
                                        }}
                                    >Edit</Button>{' '}
                                    <Button
                                        variant="danger"
                                        onClick={()=>this.deleteItem(item.id)}
                                    >Remove</Button>{' '}
                                    <Button
                                        variant="success"
                                        hidden={this.props.currentuserid===-1?true:false}
                                        onClick={()=>{
                                            this.setState({currentindex:item.id})
                                            this.setState({msgtouser:item.name})
                                            this.setState({chatWindowShow:true})
                                            }}
                                    >Chat</Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                <EditModal
                show = {this.state.editModalShow}
                onHide = {editModalClose}
                currentindex={this.state.currentindex}
                name ={this.state.selectedName}
                mobile ={this.state.selectedMobile}
                email ={this.state.selectedEmail}
                ></EditModal>

                <ButtonToolbar className="center">
                    <Button
                    variant="primary"
                    onClick={()=> this.setState({addModalShow:true})}
                    >Add Contact</Button>
                    <ContactModal
                    show = {this.state.addModalShow}
                    onHide = {addModalClose}
                    onAddOrChange={this.onAddOrChange}
                    currentindex={-1}
                    ></ContactModal>
                </ButtonToolbar>
                <ChatWindow
                show = {this.state.chatWindowShow}
                onHide = {chatWindowClose}
                currentindex={this.state.currentindex}
                currentuserid={this.props.currentuserid}
                msgtouser={this.state.msgtouser}
                />
            </div>
        )
    }
}

export default ContactsList;
