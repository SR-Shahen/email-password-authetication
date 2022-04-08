
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const auth = getAuth(app);


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelEmailAdd = event => {
    setEmail(event.target.value);

  }
  const handelPasswordAdd = event => {
    setPassword(event.target.value);

  }

  const handelSubmitFrom = (event) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error)
      })

    event.preventDefault();
  }
  return (


    <div className="registration w-50 mx-auto mt-4">
      <h1 className='text-primary '>Please Register!!</h1>
      <Form onSubmit={handelSubmitFrom}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handelEmailAdd} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handelPasswordAdd} type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>



      {/* <form onSubmit={handelSubmitFrom}>
      //   <input onBlur={handelEmailAdd} type="email" /> <br />
      //   <input onBlur={handelPasswordAdd} type="password" /><br />
      //   <input type="submit" value="login" />
      // </form> */}
    </div>
  );
}

export default App;
