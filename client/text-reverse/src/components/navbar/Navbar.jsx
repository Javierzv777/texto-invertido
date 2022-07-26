import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import NavStyle from './Navbar.module.css';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { reverseText } from '../../redux/ations';
import { useState } from 'react';

function NavbarBootstrap() {
  const pattern = new RegExp('^[A-Z\w ]+$', 'i');
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  
  function handleOnChange(e){

    if(pattern.test(e) || e === "" ){
      setText(e);
    }
  };

  function handleOnSubmit(e){
    e.preventDefault();
    dispatch(reverseText(text));
    setText('');
  };

  return (
    <Navbar bg="danger" expand="lg">
      <Container fluid>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className={NavStyle.Searchbar}>              
            <Form 
            onSubmit={(e) => handleOnSubmit(e)}
            className="d-flex">
                <Form.Control
                onChange={(e)=> handleOnChange(e.target.value)}
                value={text}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button 
                type = "submit"
                className={NavStyle.button} variant="outline-primary">Search</Button>
            </Form>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarBootstrap;