import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

const LoginForm = () => {

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted')
    }

    return (
        <Form onSubmit={submitHandler}> 
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Login
  </Button>
  <p style={{marginTop: '1rem'}}>New User? <Link style={{textDecoration: 'underline'}} to='/register'>Register</Link></p>
</Form>
    )
}


export default LoginForm;