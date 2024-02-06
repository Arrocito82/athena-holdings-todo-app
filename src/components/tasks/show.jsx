import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { STATUS } from '../../constants';
function Task(props) {
  const getStatusName=()=>STATUS.filter(status => status.status === props.status)[0].name;
  const getStatusColor=()=>STATUS.filter(status => status.status === props.status)[0].color;

  return (
    <Card style={{ width: '18rem', color: getStatusColor()}} key={props.id}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Status</Card.Subtitle>
        <Card.Text>
          {getStatusName()}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Due Date</Card.Subtitle>
        <Card.Text>
          {props.dueDate}
        </Card.Text>
        {/* <Button variant="outline-success">Search</Button> */}
      </Card.Body>
    </Card>
  );
}

export default Task;