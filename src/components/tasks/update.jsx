import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { STATUS } from '../../constants';
import { updateTask, getTask } from '../../api';
import Stack from 'react-bootstrap/Stack';
import moment from 'moment-timezone';
function UpdateTask({onTaskUpdatedHandler, id,...props}) {
  const [dueDate, setDueDate] = useState(new Date());
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState('todo');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    getTask(id).then((data) => {
      // console.log(data);
      const pickedDate = `${moment.utc(data.data.dueDate).format('YYYY-MM-DD')}`;
      setName(data.data.name);
      setDescription(data.data.description);
      setStatus(data.data.status);
      setDueDate(pickedDate);
      // console.log(pickedDate);
      // console.log(dueDate);
    });
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({
    //   name: name,
    //   description: description,
    //   status: status,
    //   dueDate: dueDate
    // });

    updateTask(id, {
      name: name,
      description: description,
      status: status,
      dueDate: dueDate
    }).then((data) => {

      // console.log(data);
      reset();
      onTaskUpdatedHandler();
      props.onHide();
    }).catch((error) => {
      // console.log('Submitted');
      setErrors(error.response.data.errors);
      // console.log(error.response.data.errors);
    }).finally(() => setValidated(true));
  };

  const reset = () => {
    setDescription("");
    setName("");
    setStatus('todo');
    setDueDate(`${moment.utc().format('YYYY-MM-DD')}`);
    setErrors([]);
    setValidated(false);
  }
  const getErrors = (field) => {
    // console.log(errors);
    return errors.filter(error => error.path === field).map((error, index) => <p key={index}>{error.msg}</p>);
  };
  const isInvalid = (field) => {
    // console.log(field,errors&&errors.filter(error=>error.path===field).length>0);
    return (errors && errors.filter(error => error.path === field).length > 0);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" value={name}
              onChange={(e) => setName(e.target.value)} required
              isInvalid={isInvalid('name')} />
            <Form.Control.Feedback type="invalid">
              {errors && getErrors('name')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={isInvalid('description')} required />
            <Form.Control.Feedback type="invalid">
              {errors && getErrors('description')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              isInvalid={isInvalid('dueDate')}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors && getErrors('dueDate')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select onChange={(e) => setStatus(e.target.value)}
              isInvalid={isInvalid('status')} defaultValue={status} required>
              {STATUS.map((status, index) => <option key={index} value={status.status}>{status.name}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors && getErrors('status')}
            </Form.Control.Feedback>
          </Form.Group>
          <Stack direction="horizontal" gap={1} className="py-2">
            <div className="ms-auto">
              <Button variant="secondary" onClick={() => { props.onHide(); reset(); }}>Cancel</Button>
            </div>
            <div>
              <Button variant="success" type='submit'>Update</Button>
            </div>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateTask;