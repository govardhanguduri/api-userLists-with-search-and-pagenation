import React from 'react'

const Spinner = () => {
    return (
        <div>
            <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div>
        </div>
    )
}

export default Spinner

////////////////////


import axios from 'axios';
//import React from 'react';
//import Card from './Components/Card';
//import Spinner from './Components/Spinner';
import { useEffect,useState } from 'react';

import './App.css'

const App = () => {
  const [data,setData] = useState([]);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/').then(
      res => {
        !search ? setData(res.data) : setData(res.data.filter(name => name.title===search))
      }
    )
  },[search])
  const onSubmit = e =>{
    e.preventDefault();
    setSearch(search);
  }
  return (
    <div>
      <center>
        <h1>Users List</h1>
        <div className="container-fluid" m-6>
            <form className="d-flex" onSubmit={onSubmit} >
            <input className="form-control me-2" value={search} type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search" aria-label="Search" />
            <input className="btn btn-outline-success" type="submit" value="Search" />
            </form>
        </div>
        <table className="table"> 
          <thead className="thead">
              <tr>
                <th className="heading">USER-ID</th>
                <th className="heading">ID</th>
                <th className="heading">TITLE</th>
                <th className="heading">COMPLETED</th>
              </tr>
          </thead>
            <tbody>
              {data.length >=1 ? 
    <center>
      <Card name={data} />
    </center> 
    :
    <Spinner />
    }
            </tbody>
        </table>
      </center>
    </div>
  )
}

//export default App
