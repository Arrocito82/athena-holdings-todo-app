import { useEffect, useState } from "react";
import { getTasks } from "../../api";
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
import { MutatingDots } from 'react-loader-spinner';
const Tasks = () => {
    const [createModalShow, setCreateModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [updateTaskId, setUpdateTaskId] = useState();
    const [deleteTaskId, setDeleteTaskId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const onStatusChange = (status) => {
        getItems(status);
        // console.log('Clicked' + status);
    }
    const getItems = (status = null) => {
        setIsLoading(true);
        // console.log(isLoading);
        if (status) {
            getTasks(status).then((data) => {
                setTasks(data.data);
            }).finally(() => {
                setIsLoading(false);
                // console.log(isLoading);
            });
            return;
        }
        getTasks().then((data) => {
            console.log(data.data);
            setTasks(data.data);
        }).finally(() => {
            setIsLoading(false);
            // console.log(isLoading);
        });
        return;
        // console.log(isLoading);
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
            onTaskUpdatedHandler={getItems}
        />}
        {deleteTaskId && <DeleteTask
            id={deleteTaskId}
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
            onTaskDeletedHandler={getItems}
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
                        updateTaskHandler={updateTaskHandler} />
                </Col>)}
                {tasks.length === 0 && <Col key={1} className="py-1 fs-3">Currently, there are no tasks created. Feel free to initiate a new task to get started</Col>}
            </Row>
        </Container>
    </>
}
export default Tasks;