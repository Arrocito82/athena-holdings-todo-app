import './App.css';
import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Sidebar from './components/sidebar';
function App() {
  return (
    <>
      <Sidebar/>
      <Container>
       <Outlet />
      </Container>
    </>
  );
}

export default App;
