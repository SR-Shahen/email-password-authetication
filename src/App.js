
import './App.css';
import app from './firebase.init';
import { getAuth } from 'firebase/auth'
import { useState } from 'react';

const auth = getAuth(app);


function App() {
  const [user, setUser] = useState();
  const handelEmailAdd = event => {
    console.log(event.target.value);

  }
  const handelPasswordAdd = event => {
    console.log(event.target.value);

  }

  const handelSubmitFrom = (event) => {
    console.log("submit button kaj korche")
    event.preventDefault();
  }
  return (
    <div className="App">
      <form onSubmit={handelSubmitFrom}>
        <input onBlur={handelEmailAdd} type="email" /> <br />
        <input onBlur={handelPasswordAdd} type="password" /><br />
        <input type="submit" value="login" />
      </form>

    </div>
  );
}

export default App;
