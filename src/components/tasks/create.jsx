import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { STATUS } from '../../constants';
import { createTask } from '../../api';
import Stack from 'react-bootstrap/Stack';
function CreateTask(props) {
  const [dueDate, setDueDate] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    let data = {
      name: name,
      description: description,
      status: status,
      dueDate: dueDate
    };
    console.log(data);
    createTask(data).then((data) => {
      console.log(data);
      reset();
      props.onCreateHandler();
      props.onHide();
    });

  };

  const reset = () => {
    setDescription();
    setName();
    setStatus('todo');
    setDueDate();
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" value={name}
              onChange={(e) => setName(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Please provide a name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description}
              onChange={(e) => setDescription(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
              Please provide a description
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" onChange={(e) => { setStatus(e.target.value); console.log(e.target.value); }} required>
              {STATUS.map((status, index) => <option key={index} value={status.status}>{status.name}</option>)}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select a status
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please pick a date
            </Form.Control.Feedback>
          </Form.Group>
          <Stack direction="horizontal" gap={1} className="py-2">
            <div className="ms-auto"><Button type='submit'>Save</Button></div>
            <div><Button onClick={() => { props.onHide(); reset(); }}>Close</Button></div>
        </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateTask;