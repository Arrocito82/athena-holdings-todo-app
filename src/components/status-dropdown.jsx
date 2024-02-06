import Dropdown from 'react-bootstrap/Dropdown';
import { STATUS } from '../constants';
function StatusDropDown(props) {

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Status
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
        STATUS.map((item, index)=><Dropdown.Item key={index} onClick={()=>props.onClickHandler(item.status)}>{item.name}</Dropdown.Item>)}
        
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default StatusDropDown;