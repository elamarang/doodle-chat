import React, { Component } from 'react';
import './App.css';
import ContactsList from './Components/ContactsList';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';

class App extends Component {
  constructor(){
    super();
    this.state={
      currentuserid:-1,
      currentusername:'',
      users:[{id:'',name:'',mobile:'',email:''}]
    }
  }
componentDidMount(){
  fetch('https://stormy-taiga-19928.herokuapp.com/users').then(Response=>Response.json())
  .then(users=>{
    if(users!=='not found')
    this.setState({users: users})
    else
    this.setState({users: [{id:'',name:'',mobile:'',email:''}]})
  });
}
  refreshList= ()=> {
    for(let i=0;i<3;i++){
      console.log('entered refresh zone');
      fetch('https://stormy-taiga-19928.herokuapp.com/users').then(Response=>Response.json())
    .then(users=>{
      if(users!=='not found')
      this.setState({users: users})
      else
      this.setState({users: [{id:'',name:'',mobile:'',email:''}]})   })    
  }
}
  onUserClick =(e)=>{
    this.setState({
      currentuserid:e.target.id,
      currentusername: e.target.name
    })
  }

  onSignOut =()=>{
    this.setState({
      currentuserid:-1,
      currentusername: ''
    })
    this.refreshList(); 
  }
  render() {
    return (
       <div className="container">
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Chat Book</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
              <NavDropdown title= {this.state.currentusername===''? "Sign In":this.state.currentusername} 
              id="basic-nav-dropdown">
                {
                  this.state.users.map((li,index)=>
                  <NavDropdown.Item key= {index} id={li.id} name={li.name} onClick={this.onUserClick}>{li.name}</NavDropdown.Item>
                  )
                }
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.onSignOut}>Sign Out</NavDropdown.Item>
              </NavDropdown>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
       <ContactsList 
       currentuserid={this.state.currentuserid} 
       currentusername={this.state.currentusername}
       users={this.state.users}
       refreshList={this.refreshList}/>
      </div>
     );
    };
}

export default App;
