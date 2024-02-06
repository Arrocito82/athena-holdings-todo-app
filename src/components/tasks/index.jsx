import { useEffect, useState } from "react";
import { getTasks } from "../../api";
import Task from './show';
import Button from 'react-bootstrap/Button';
import StatusDropDown from "../status-dropdown";
import CreateTask from "./create";
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Tasks = () => {
    const [createModalShow, setCreateModalShow] = useState(false);
    const [tasks, setTasks] = useState([]);
    const onStatusChange = (status) => {
        getItems(status);
        console.log('Clicked' + status);
    }
    const getItems = (status = null) => {
        if (status) {
            getTasks(status).then((data) => {
                setTasks(data.data);
            });
            return;
        }
        getTasks().then((data) => {
            console.log(data.data);
            setTasks(data.data);
            return;
        });
    }
    useEffect(() => {
        getItems();
    }, []);
    return <>
        <div className="h1">
            Tasks
        </div>
        <Stack direction="horizontal" gap={1} className="py-2">
            <div className="ms-auto"><Button variant="primary" onClick={() => setCreateModalShow(true)}>
                Add Task
            </Button></div>
            <div><StatusDropDown onClickHandler={onStatusChange} /></div>
        </Stack>
        <CreateTask
            show={createModalShow}
            onHide={() => setCreateModalShow(false)}
        />
        <Container fluid className="py-3">
            <Row>
                {tasks.map((task, index) => <Col xs={12} md={3}><Task key={index} id={index} name={task.name} description={task.description} status={task.status} dueDate={task.dueDate} /></Col>)}
            </Row>
        </Container>
    </>
}
export default Tasks;