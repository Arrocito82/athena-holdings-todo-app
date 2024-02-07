import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../../api";
import Task from './show';
import Button from 'react-bootstrap/Button';
import StatusDropDown from "../status-dropdown";
import CreateTask from "./create";
import UpdateTask from "./update";
import DeleteTask from "./delete";
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Tasks = () => {
    const [createModalShow, setCreateModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [updateTaskId, setUpdateTaskId] = useState();
    const [deleteTaskId, setDeleteTaskId] = useState();
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
    const deleteTaskHandler = (id) => {
        setDeleteTaskId(id);
        setDeleteModalShow(true);
    }
    const updateTaskHandler = (id) => {
        setUpdateTaskId(id);
        setUpdateModalShow(true);
    }
    useEffect(() => {
        getItems();
    }, []);
    return <>
        <div className="h1">
            Tasks
        </div>
        <Stack direction="horizontal" gap={1} className="py-2">
            <div className="ms-auto"><Button variant="outline-primary" onClick={() => setCreateModalShow(true)}>
                Add Task
            </Button></div>
            <div><StatusDropDown onClickHandler={onStatusChange} /></div>
        </Stack>
        <CreateTask
            show={createModalShow}
            onHide={() => setCreateModalShow(false)}
            onTaskCreatedHandler={getItems}
        />
        {updateTaskId && <UpdateTask
            id={updateTaskId}
            show={updateModalShow}
            onHide={() => setUpdateModalShow(false)}
            onTaskUpdatedHandler={() => getItems()}
        />}
        {deleteTaskId && <DeleteTask
            id={deleteTaskId}
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
            onTaskDeletedHandler={() => getItems()}
        />}
        <Container fluid className="py-3">
            <Row>
                {tasks.map((task, index) => <Col key={index} className="py-1">
                    <Task id={task.id}
                        name={task.name}
                        description={task.description}
                        status={task.status}
                        dueDate={task.dueDate}
                        deleteTaskHandler={deleteTaskHandler} 
                        updateTaskHandler={updateTaskHandler}/>
                </Col>)}
            </Row>
        </Container>
    </>
}
export default Tasks;