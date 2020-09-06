import React, { useState, useEffect } from 'react';
import { Container, Form } from "react-bootstrap";
import ReactTable from "react-table";
import axios from "axios";

import './App.css';

function App() {
  const [familyMembers, setFamilyMembers] = useState([]);
  useEffect(() => {
    const getFamilyMembers = async () => {
      const res = await axios.get(
        `http://${process.env.REACT_APP_IP_SERVER}:${process.env.REACT_APP_PORT}/users`
      );
        console.log('Dir de la petición', res)
        console.log('La respuesta', res);
        setFamilyMembers(res.data);
    };
    getFamilyMembers();
  }, []);

  return (
    <Container className='p-3'>
      <h1>Let's create the family tree</h1>
      <Form>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Family member's name</Form.Label>
          <Form.Control type="text"/>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">

          <Form.Label>Select Dad</Form.Label>
          <Form.Control as="select">
            {familyMembers.map(familyMember => (
              <option key={familyMember.id}>{familyMember.name}</option>
            ))}
          </Form.Control>

          <Form.Label>Select Mom</Form.Label>
          <Form.Control as="select">
            {familyMembers.map(familyMember => (
              <option key={familyMember.id}>{familyMember.name}</option>
            ))}
          </Form.Control>

        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default App;
