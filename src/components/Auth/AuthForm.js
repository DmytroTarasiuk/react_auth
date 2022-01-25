import { Form } from "react-bootstrap";
import axios from "axios";

import { useRef, useState, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import { useHistory } from "react-router-dom";
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;


    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB89swc_F8hFkPq8xqnZVhKGmv0MrXMkP4';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB89swc_F8hFkPq8xqnZVhKGmv0MrXMkP4';
    }
    
    axios(url, {
      method: 'POST',
      data: {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 200) {
        console.log(response.data)
        authCtx.login(response.data.idToken);
        history.replace('/');
      }
      else {
        throw new Error("Authenfication Fail!");
      }
      
    })
    .catch(error => {
      console.log(error)
      alert(error.response.data.error.message)
      setIsLoading(false)
    })
  }
   


  return (
<Form onSubmit={submitHandler} className={classes.form}>
<h1>{isLogin ? 'Login' : 'Sign Up'}</h1> 
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" ref={emailInputRef}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" ref={passwordInputRef}/>
  </Form.Group>
  
  <div className={classes.actions}>
    {!isLoading && (
      <button>{isLogin ? 'Login' : 'Create Account'}</button>
    )}
    {isLoading && <p>Sending request...</p>}
      <button
        type='button'
        className={classes.toggle}
        onClick={switchAuthModeHandler}
      >
      {isLogin ? 'Create new account' : 'Login with existing account'}
      </button>
    </div>
  
</Form>
    )
}


export default AuthForm;

//'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQ0HBjZ1TpByvZIYEP5hkBG9FtSWgxW0k'