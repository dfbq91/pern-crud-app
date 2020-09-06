import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useTable } from "react-table";
import axios from "axios";

import "./App.css";

function App() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    id: "",
    name: "",
    dad: "",
    mom: "",
    birth: "",
  });
  const [updateMember, setUpdateMember] = useState({
    updateId: newMember.updateId,
    updateName: newMember.name,
    updateDad: newMember.dad,
    updateMom: newMember.mom,
    updateBirth: newMember.birth,
  });
  const [showModal, setShowModal] = useState(false);
  const [actualUpdatingId, setActualUpdatingId] = useState();
  const columns = React.useMemo(
    () => [
      {
        Header: "Member ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Dad",
        accessor: "dad",
      },
      {
        Header: "Mom",
        accessor: "mom",
      },
      {
        Header: "Birth Date",
        accessor: "birth",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (row) => (
          <div>
            <Button
              variant="info"
              size="sm"
              onClick={() => handleOpenModal(row.cell.row.original.id)}
            >
              Edit
            </Button>{" "}
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(row.cell.row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );
  const data = [...familyMembers];
  const tableInstance = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  useEffect(() => {
    const getFamilyMembers = async () => {
      const res = await axios.get(
        `http://localhost:4000/users`
      );
      setFamilyMembers(res.data);
    };
    getFamilyMembers();
  }, []);

  const handleChange = (e) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOnUpdating = (e) => {
    setUpdateMember({
      ...updateMember,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:4000/users`,
      newMember
    );
    if (res.data.name === "error") alert("This member already exists");
    else {
      alert("A new family member has been created");
      const res = await axios.get(
        `http://localhost:4000/users`
      );
      setFamilyMembers(res.data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:4000/users/` +
        actualUpdatingId,
      {
        id: updateMember.updateId,
        name: updateMember.updateName,
        dad: updateMember.updateDad,
        mom: updateMember.updateMom,
        birth: updateMember.updateBirth,
      }
    );
    if (res.data.name === "error") alert("This member already exists");
    else {
      alert("A new family member has been updated");
      const res = await axios.get(
        `http://localhost:4000/users`
      );
      setFamilyMembers(res.data);
      handleCloseModal();
    }
  };

  const handleOpenModal = (id) => {
    setShowModal(true);
    setActualUpdatingId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(
      `http://localhost:4000/users/` +
        id
    );
    alert("A family member has been deleted");
    const res = await axios.get(
      `http://localhost:4000/users`
    );
    setFamilyMembers(res.data);
  };

  return (
    <Container fluid="sm" className="p-3">
      <h1>Let's create the family tree</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="">
          <Form.Label>Family member's name</Form.Label>
          <Form.Control
            name="name"
            value={newMember.name}
            type="text"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="">
          <Form.Label>Select Dad</Form.Label>
          <Form.Control
            name="dad"
            value={newMember.dad}
            onChange={handleChange}
            as="select"
          >
            {familyMembers.map((familyMember) => (
              <option key={familyMember.id}>{familyMember.name}</option>
            ))}
          </Form.Control>

          <Form.Label>Select Mom</Form.Label>
          <Form.Control
            name="mom"
            value={newMember.mom}
            onChange={handleChange}
            as="select"
          >
            {familyMembers.map((familyMember) => (
              <option key={familyMember.id}>{familyMember.name}</option>
            ))}
          </Form.Control>

          <Form.Group controlId="date">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              name="birth"
              value={newMember.birth}
              onChange={handleChange}
              type="date"
            />
          </Form.Group>

          <Button type="submit">Create a new family member!</Button>
        </Form.Group>
      </Form>

      <h2>The members of the family are just here</h2>
      <Table responsive="lg" striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Let's update this person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group>
              <Form.Label>Family member's name</Form.Label>
              <Form.Control
                name="updateName"
                value={updateMember.updateName}
                type="text"
                onChange={handleChangeOnUpdating}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Dad</Form.Label>
              <Form.Control
                name="updateDad"
                value={updateMember.updateDad}
                onChange={handleChangeOnUpdating}
                as="select"
              >
                {familyMembers.map((familyMember) => (
                  <option key={familyMember.id}>{familyMember.name}</option>
                ))}
              </Form.Control>

              <Form.Label>Select Mom</Form.Label>
              <Form.Control
                name="updateMom"
                value={updateMember.updateMom}
                onChange={handleChangeOnUpdating}
                as="select"
              >
                {familyMembers.map((familyMember) => (
                  <option key={familyMember.id}>{familyMember.name}</option>
                ))}
              </Form.Control>

              <Form.Group>
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  name="updateBirth"
                  value={updateMember.updateBirth}
                  onChange={handleChangeOnUpdating}
                  type="date"
                />
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button type="submit" onClick={handleUpdate} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
