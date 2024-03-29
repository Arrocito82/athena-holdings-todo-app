import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { STATUS } from '../../constants';
import { createTask } from '../../api';
import Stack from 'react-bootstrap/Stack';
import { MutatingDots } from 'react-loader-spinner';
function CreateTask({ onTaskCreatedHandler, ...props }) {
  const [dueDate, setDueDate] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState('todo');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(isLoading);
    console.log({
      name: name,
      description: description,
      status: status,
      dueDate: dueDate
    });

    createTask({
      name: name,
      description: description,
      status: status,
      dueDate: dueDate
    }).then((data) => {

      // console.log(data);
      reset();
      onTaskCreatedHandler();
      props.onHide();
    }).catch((error) => {
      // console.log('Submitted');
      setErrors(error.response.data.errors);
      // console.log(error.response.data.errors);
    }).finally(() => {
      setValidated(true);
      setIsLoading(false);
      // console.log(isLoading);
    });
  };

  const reset = () => {
    setValidated(false);
    setDescription("");
    setName("");
    setStatus("");
    setDueDate("");
    setErrors("");
  }
  const getErrors = (field) => {
    // console.log(errors);
    return errors.filter(error => error.path === field).map(error => <p>{error.msg}</p>);
  };
  const isInvalid = (field) => {
    // console.log(field,errors&&errors.filter(error=>error.path===field).length>0);
    return (errors && errors.filter(error => error.path === field).length > 0);
  };
  useEffect(() => {
    reset();
  },[props.show]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Create Task
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
            <div>
              <MutatingDots
                visible={isLoading}
                height="100"
                width="100"
                color="#4fa94d"
                secondaryColor="#4fa94d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
            <div className="ms-auto">
              <Button variant="secondary" onClick={() => { props.onHide(); reset(); }}>Cancel</Button>
            </div>
            <div>
              <Button type='submit'>Create</Button>
            </div>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateTask;