import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { STATUS } from '../../constants';
import { deleteTask, getTask } from '../../api';
import Stack from 'react-bootstrap/Stack';
import moment from 'moment-timezone';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
function DeleteTask(props) {
  const [dueDate, setDueDate] = useState(new Date());
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState('todo');
  const [errors, setErrors] = useState([]);
  const getStatusName = () => STATUS.filter(item => item.status === status)[0].name;
  const getStatusColor = () => STATUS.filter(item => item.status === status)[0].color;
  useEffect(() => {
    console.log(status);
    getTask(props.id).then((data) => {
      console.log(data);
      const pickedDate = `${moment.utc(data.data.dueDate).format('YYYY-MM-DD')}`;
      setName(data.data.name);
      setDescription(data.data.description);
      setStatus(data.data.status);
      setDueDate(pickedDate);
      console.log(pickedDate);
      console.log(dueDate);
    });
  }, [props.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteTask(props.id).then((data) => {
      console.log(data);
      reset();
      props.onHide();
    }).catch((error) => {
      // console.log('Submitted');
      setErrors(error.response.data.errors);
      // console.log(error.response.data.errors);
    }).finally(() => props.onTaskDeletedHandler());
  };

  const reset = () => {
    setDescription("");
    setName("");
    setStatus(null);
    setDueDate(new Date());
    setErrors("");
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='pb-4'>
          <span className='fw-bold d-block'>
            Are you certain you want to delete this task?
          </span>

          <span className='fst-italic d-block'>
            This action cannot be undone, and any associated data will be permanently removed. Please confirm your decision to delete task.
          </span>
        </div>
        <Card key={props.id}>
          <Card.Body>
            <Card.Title className='pb-2'>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
            <Card.Text>
              {description}
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">Due Date</Card.Subtitle>
            <Card.Text>
              {moment.utc(props.dueDate).format('MMMM Do, YYYY')}
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">Status</Card.Subtitle>
            <Card.Text>
              {status && <Badge bg={getStatusColor()}>{getStatusName()}</Badge>}
            </Card.Text>
          </Card.Body>
        </Card>
        <Stack direction="horizontal" gap={1} className="py-2">
          <div className="ms-auto">
            <Button variant="secondary" onClick={() => { props.onHide(); reset(); }}>Cancel</Button>
          </div>
          <div>
            <Button variant='danger' onClick={handleSubmit}>Delete</Button>
          </div>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteTask;