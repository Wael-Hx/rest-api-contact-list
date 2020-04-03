import React, { Component } from 'react';
import './ContactForm.css';

class ContactsForm extends Component {


    state = {
        LastName: this.props.contactInfo? this.props.contactInfo.Last_Name: '',
        FirstName:this.props.contactInfo? this.props.contactInfo.First_Name: '',
        email:this.props.contactInfo? this.props.contactInfo.Email: '',
        age:this.props.contactInfo? this.props.contactInfo.age: 0

    }


    handleNameChange = (e) => { this.setState({ LastName: e.target.value }) }

    handleFirstNameChange = (e) => { this.setState({ FirstName: e.target.value }) }

    handleEmailChange = (e) => { this.setState({ email: e.target.value }) }

    handleAgeChange = (e) => { this.setState({ age: e.target.value }) }

    AddContact = (e) => {
        e.preventDefault();
        let regexp = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/im ;
        !this.state.LastName.trim() || !this.state.FirstName.trim()?
        alert('all fields must be filled') : this.state.age ===0 || this.state.age<0 ? alert('minimum age is 1') :
        !regexp.test(this.state.email.trim())? alert(' a valid email adress needed') :
        this.props.newContact({
            lastName: this.state.LastName.trim(),
            firstName: this.state.FirstName.trim(),
            email: this.state.email.trim(),
            age: this.state.age


        });  
        this.setState({
            LastName: '',
            FirstName: '',
            email: '',
            age: 0
        })

    }

    render() {
        return (

            <form onSubmit={this.AddContact} >
                <input type='text' value={this.state.LastName} placeholder="Last Name" onChange={this.handleNameChange} />
                <input type='text' value={this.state.FirstName} placeholder="First Name" onChange={this.handleFirstNameChange} />
                <input type='email' value={this.state.email} placeholder="Email" onChange={this.handleEmailChange} />
                <input type='number' value={this.state.age} onChange={this.handleAgeChange}  />
                <button type='submit' className='submit' onClick={this.AddContact}>
                    {this.props.contactInfo ? 'Edit Contact' : 'add to contact List'}
                </button>
            </form>
        )
    }
}

export default ContactsForm