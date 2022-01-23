import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import SelectCanvas from './SelectBeen';

const MyNavbar = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    
    return (
    <Navbar bg="primary" variant="dark" fixed="top">
        <Container>
            <Navbar.Brand>BeenTo</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick={toggleShow}>Add Countries</Nav.Link>
            </Nav>
        </Container>
        <SelectCanvas show={show} handleClose={handleClose} addCountry={props.addCountry} selectedCountries={props.selectedCountries}/>
    </Navbar>
    )
};

export default MyNavbar;