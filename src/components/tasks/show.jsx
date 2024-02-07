import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { STATUS } from '../../constants';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import moment from 'moment-timezone';
function Task(props) {
  const getStatusName = () => STATUS.filter(status => status.status === props.status)[0].name;
  const getStatusColor = () => STATUS.filter(status => status.status === props.status)[0].color;
  const {deleteTaskHandler, updateTaskHandler} = props;
  return (
    <Card className='task-card' key={props.id}>
      <Card.Body>
        <Card.Title className='pb-2'>{props.name}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
        <Card.Text>
          {props.description}
        </Card.Text> */}
        <Card.Subtitle className="mb-2 text-muted">Due Date</Card.Subtitle>
        <Card.Text>
          {moment.utc(props.dueDate).format('MMMM Do, YYYY')}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Status</Card.Subtitle>
        <Card.Text>
          <Badge bg={getStatusColor()}>{getStatusName()}</Badge>
        </Card.Text>
        <Stack direction="horizontal" gap={1} className="py-2">
          <div>
            <Button variant="outline-danger" onClick={() => deleteTaskHandler(props.id)}>Delete</Button>
          </div>
          <div>
            <Button variant="outline-primary" onClick={() => updateTaskHandler(props.id)}>Update</Button>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default Task;