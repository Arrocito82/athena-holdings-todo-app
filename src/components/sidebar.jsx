import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Sidebar() {
  return <Navbar expand='false' className="bg-body-tertiary mb-3">
          <Container>
            <Navbar.Brand href="#">Task Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls='sidebar' />
            <Navbar.Offcanvas
              id='sidebar'
              aria-labelledby='sidebar-label'
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id='sidebar-label'>
                Task Management App
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link href="/tasks">Tasks</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>;
}

export default Sidebar;