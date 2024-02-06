import { useEffect , useState} from "react";
import {getTasks} from "../../api";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import StatusDropDown from "../../status-dropdown";
import CreateTask from "./create";
const Tasks=()=> {
    const [createModalShow, setCreateModalShow] = useState(false);
    const onStatusChange=(status)=>{
        console.log(status);
    }
    useEffect(()=>{
        getTasks().then((data)=>{
            console.log(data);
        });
    });
    return <>
    <div>
        
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

    </>
}
export default Tasks;