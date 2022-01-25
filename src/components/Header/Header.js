
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Header.module.css'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
  } from '@chakra-ui/react'

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
            {isLoggedIn ? <Breadcrumb separator='-'>
                <BreadcrumbItem>
                    <BreadcrumbLink  as={Link} to='/cart'><i className="fas fa-shopping-cart"></i> Cart</BreadcrumbLink>
                </BreadcrumbItem>

                {!isLoggedIn &&<BreadcrumbItem>
                    <BreadcrumbLink as={Link} to='/auth'>Login</BreadcrumbLink>
                </BreadcrumbItem>}

                {isLoggedIn &&<BreadcrumbItem isCurrentPage>      
                    <BreadcrumbLink as={Link} to='/profile'>Profile</BreadcrumbLink>
                </BreadcrumbItem>}
            </Breadcrumb> : null}
            {isLoggedIn && <button className={classes.button} onClick={logoutHandler}>Logout</button>}
        </header>
    )
}


export default Header
