import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { STATUS } from '../../constants';
import {createTask} from '../../api';
function CreateTask(props) {
    const [dueDate, setDueDate]=useState();
    const [name, setName]=useState();
    const [description, setDescription]=useState();
    const [status, setStatus]=useState();
    const onClickHandler=()=>{
        let data={
            name: name, 
            description:description,
            status:status,
            dueDate:dueDate
        };
        console.log(data);

        createTask(data).then((data)=>{
            console.log(data);
        });
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
      <Form>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" value={name}
        onChange={(e) => setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={description}
        onChange={(e) => setDescription(e.target.value)}/>
      </Form.Group>
    <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control as="select">
            {STATUS.map((status, index) => <option onChange={(e) => setStatus(e.target.value)} key={index} value={status.status}>{status.name}</option>)}
    </Form.Control>
    </Form.Group>
    <Form.Group className="mb-3" controlId="dueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
         />
    </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClickHandler}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTask;