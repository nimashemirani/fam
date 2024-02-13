import "../Component/Form.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';


export const Form = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Telepone, setTelepone] = useState('');
    const [contacts, setContacts] = useState([]);
    
    useEffect(() => {
        fetch('https://localhost:44315/api/contacts/GetAll')
          .then(response => response.json())
          .then(data => setContacts(data))
          .catch(error => console.error('Error fetching contacts:', error));
      }, []);
    


      const handleFormSubmit = (e) => {
        e.preventDefault();
    
        const newContact = {
          FirstName: firstName,
          LastName: lastName,
          PhoneNumber: PhoneNumber,
          Telepone: Telepone
        };
    
        fetch('https://localhost:44315/api/contacts/Create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newContact),
        })
          .then(response => response.json())
          .then(data => {
            setContacts([...contacts, data]);  
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setTelepone('');
          })
          .catch(error => console.error('Error adding contact:', error));
      };

      
      const handleDeleteContact = (contactId) => {
        fetch(`https://localhost:44315/api/contacts/Remove/${contactId}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              const newContacts = contacts.filter(contact => contact.ID !== contactId);
              setContacts(newContacts);  
            } else {
              console.error('Failed to delete contact');
            }
          })
          .catch(error => console.error('Error deleting contact:', error));
      };

    

    return (
        <React.Fragment>
            <form className="form" onSubmit={handleFormSubmit}>
                <h1 className="title">TeleponeBook</h1>
                <section className="section">
                    <label htmlFor="firstName">نام</label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <label htmlFor="lastName">نام خانوادگی</label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                    <label htmlFor="TeleponeNumber">موبایل</label>
                    <input type="text" id="TeleponeNumber" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

                    <label htmlFor="Telepone">تلفن</label>
                    <input type="text" id="Telepone" value={Telepone} onChange={(e) => setTelepone(e.target.value)} />
                </section>
                <section>
                    <button type="submit">ثبت</button>
                </section>
            </form> 
            <br />
            <div className="main">
      <h2>Contacts</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Family</th>
            <th>Telepone Number</th>
            <th>TeleTelepone</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {contacts.map(contact => (
            <tr key={contact.Id}>
              <td>{contact.ID}</td>
              <td>{contact.FirstName}</td>
              <td>{contact.LastName}</td>
              <td>{contact.PhoneNumber}</td>
              <td>{contact.Telepone}</td>
              <td><button onClick={() => handleDeleteContact(contact.ID)}>DELETE</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </React.Fragment>

    )
}
