import React,{useEffect, useState} from 'react'

import './App.css'

const App = () => {
  const [data,setData] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/').then(
      response => response.json()
    ).then(jsondata => setData(jsondata))
  },[search])
  const onSubmit = e =>{
    e.preventDefault();
    setSearch(search);
  }
  return (
    <div>
      <center>
        <h1 className="main-heading">USERS LIST</h1>
        <div className="container-fluid"  m-6="true">
            <form className="d-flex" onSubmit={onSubmit} >
              <input className="form-control me-2" type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search" aria-label="Search" />

            </form>
        </div>
        <table className="table"> 
          <thead className="thead">
              <tr>
                <th className="heading">user-Id</th>
                <th className="heading">ID</th>
                <th className="heading">TITLE</th>
                <th className="heading"></th>
              </tr>
          </thead>
          <tbody>
            {data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).map(item => {
              return (
                <tr>
                  <td >{item.userId}</td>
                  <td >{item.id}</td>
                  <td >{item.title}</td>
                  <td>{item.completed}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </center>
    </div>
  )
}

export default App


//////////////////////////

import React,{useEffect, useState} from 'react'
import axios from 'axios';
import posts from './posts';

import './App.css'
import _ from "lodash";


const pageSize = 10;
const App = () => {
  const [,setData] = useState([]);
  const [search, setSearch] = useState('');
  const [paginateddata, setPaginateddata] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/').then(
      (res) => {
      console.log(res.data);
      setData(res.data);
       setPaginateddata(_(res.data).slice(0).take(pageSize).value());
      })

  },[search])
  const onSubmit = e =>{
    e.preventDefault();
    setSearch(search);
  }
  const pageCount = data ? Math.ceil(data.length/pageSize) :0;
  if (pageCount === 1) return null;
  const pages =_.range(1, pageCount+1) 

  const pagination =(pageNo) => {
    setcurrentPage(pageNo);
    const startIndex = (pageNo -1) * pageSize;
    const paginateddata = _(data).slice(startIndex).take(pageSize).value();
    setPaginateddata(paginateddata)
  }


  return (
    <div className="home">{ !data ? ("No data found"):(
      <center>
        <h1 className="main-heading">USERS LIST</h1>
        <div className="container-fluid"  m-6="true">
            <form className="d-flex" onSubmit={onSubmit} >
              <input className="form-control me-2" type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search" aria-label="Search" />

            </form>
        </div>
        <table className="table"> 
          <thead className="thead">
              <tr>
                <th className="heading">user-Id</th>
                <th className="heading">ID</th>
                <th className="heading">TITLE</th>
                <th className="heading">Status</th>
              </tr>
          </thead>
          <tbody>
            {data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).map(item => {
              return (
                <tr>
                  <td >{item.userId}</td>
                  <td >{item.id}</td>
                  <td >{item.title}</td>
                  <td> <p className={item.completed ? "btn btn-success" : "btn btn-danger"}>{item.completed ? "Completed" : "Pending"} </p></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </center>)}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {
            pages.map((page) => (
              <li className={
                page === currentPage ? "page-item active" : "page-item"}>
                  <p className="page-link" onClick={() =>pagination(page)}>{page}</p>
              </li>
            ))
          }
        </ul>
      </nav>

    </div>
  )
}

export default App

