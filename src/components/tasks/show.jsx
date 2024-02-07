import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { STATUS } from '../../constants';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';
function Task(props) {
  const getStatusName=()=>STATUS.filter(status => status.status === props.status)[0].name;
  const getStatusColor=()=>STATUS.filter(status => status.status === props.status)[0].color;

  return (
    <Card style={{ width: '18rem'}} key={props.id}>
      <Card.Body>
        <Card.Title className='pb-2'>{props.name}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
        <Card.Text>
          {props.description}
        </Card.Text> */}
        <Card.Subtitle className="mb-2 text-muted">Status</Card.Subtitle>
        <Card.Text>
        <Badge bg={getStatusColor()}>{getStatusName()}</Badge>
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Due Date</Card.Subtitle>
        <Card.Text>
          {moment(props.dueDate).format('MMMM Do YYYY, h:mm:ss a')}
        </Card.Text>
        <Button variant="danger" onClick={()=>props.onDeleteHandler(props.id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default Task;