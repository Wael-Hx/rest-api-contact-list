import React, { Component } from 'react';
import ContactForm from './ContactsForm';
import axios from 'axios';

class Contacts extends Component {
  state = {
      editMode:false ,
    showForm: false,
    edit:{},
    contactList: []
  };

  showForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };
  addNewContact = newContact => {
    console.log(newContact); 
    this.state.editMode?
    axios.put(`http://localhost:5000/edit/${this.state.edit._id}`,
    {
      Last_Name: newContact.lastName,
      First_Name: newContact.firstName,
      Email: newContact.email,
      age: Number(newContact.age)
    })
    .then(this.showContacts) 

   :
    axios.post("http://localhost:5000/new_contact", {
      Last_Name: newContact.lastName,
      First_Name: newContact.firstName,
      Email: newContact.email,
      age: Number(newContact.age)
    });
  };

  deleteContact= id => {
     console.log(id);
     axios.delete(`http://localhost:5000/contacts/${id}`)
     .then(this.showContacts)

  };
  showContacts = () => {
    axios
      .get("http://localhost:5000/contacts")
      .then(res => this.setState({ contactList: res.data }));
  this.setState({showForm: false ,
                editMode:false})
  };

  editContact=(contact)=>{
      this.setState({ edit :contact ,editMode: true });
  }

  render() {
    return (
      <>
        <div className="btns">
          <button className="Contact-btns" onClick={this.showContacts}>
            Contact list
          </button>
          <button className="Contact-btns" onClick={this.showForm}>
            add a contact
          </button>
        </div>
        <div className="contact">
          { this.state.showForm ?  
            <ContactForm  newContact={this.addNewContact}  />
            :  this.state.editMode ? <ContactForm newContact={this.addNewContact}  contactInfo={this.state.edit} /> :
            this.state.contactList.map(contact => (
              <div className='contact-info' key={contact._id}> 
                <h2> {contact.Last_Name + " " + contact.First_Name} </h2>
                <p>{contact.Email}</p>
                <h5> age : {contact.age} </h5>
                <div className='edit-btns'>
                  <button onClick={()=>this.editContact(contact)} >edit</button>
                  <button onClick={() => this.deleteContact(contact._id)}>
                    delete
                  </button>
                </div>
              
              </div>
            )
          )}
        </div>
      </>
    );
  }
}

export default Contacts