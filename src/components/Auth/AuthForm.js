import { Form } from "react-bootstrap";

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

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB89swc_F8hFkPq8xqnZVhKGmv0MrXMkP4';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB89swc_F8hFkPq8xqnZVhKGmv0MrXMkP4';
    }
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };



  return (
<Form onSubmit={submitHandler}>
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