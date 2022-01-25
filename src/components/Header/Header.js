import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Header.module.css'
import { useHistory } from 'react-router-dom';

const Header = () => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const history = useHistory()

    const logoutHandler = () => {
        authCtx.logout();
        // optional: redirect the user
        history.replace('/')
    };

    return (
        <header>
            {isLoggedIn ? <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>

              <LinkContainer to='/'>
                   <Navbar.Brand>LublinJS</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                      <LinkContainer to='/cart'>
                         <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                      </LinkContainer>
                      {!isLoggedIn && <LinkContainer to='/auth'>
                         <Nav.Link>Login</Nav.Link>
                      </LinkContainer>}
                      {isLoggedIn && <LinkContainer to='/profile'>
                         <Nav.Link>Profile</Nav.Link>
                      </LinkContainer>}
                      
                      {isLoggedIn && <button className={classes.button} onClick={logoutHandler}>Logout</button>}
                      
                  </Nav>
              </Navbar.Collapse>
              </Container>
            </Navbar> : null}
        </header>
    )
}


export default Header