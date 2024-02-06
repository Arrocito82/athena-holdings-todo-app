import { useEffect , useState} from "react";
import {getTasks} from "../../api";
import Task from './show';
import Button from 'react-bootstrap/Button';
import StatusDropDown from "../status-dropdown";
import CreateTask from "./create";
const Tasks=()=> {
    const [createModalShow, setCreateModalShow] = useState(false);
    const [tasks, setTasks]=useState([]);
    const onStatusChange=(status)=>{
        getItems(status);
        console.log('Clicked'+status);
    }
    const getItems=(status=null)=>{
        if(status){
            getTasks(status).then((data)=>{
                setTasks(data.data);
            });
            return;
        }
        getTasks().then((data)=>{
            console.log(data.data);
            setTasks(data.data);
            return;
        });
    }
    useEffect(()=>{
        getItems();
    },[]);
    return <>
    <div className="h1">
    Tasks
    </div>
    <StatusDropDown onClickHandler={onStatusChange}/>
        <Button variant="primary" onClick={() => setCreateModalShow(true)}>
        Add Task
      </Button>

      <CreateTask
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
    {tasks.map((task, index)=><Task key={index} id={index} name={task.name} description={task.description} status={task.status} dueDate={task.dueDate}/>)}
    </>
}
export default Tasks;