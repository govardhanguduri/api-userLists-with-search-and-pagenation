import React, {useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';


const pageSize = 10;
const Posts = () => {
    const [posts, setPosts] = useState();
    const [search, setSearch] = useState('');
    const [paginatedPosts, setpaginatedPosts] = useState();
    const [currentPage, setcurrentPage] = useState(1);
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/')
        .then((res) => {
            console.log(res.data);
            setPosts(res.data);
            setpaginatedPosts(_(res.data).slice(0).take(pageSize).value());
        });
    }, [search])
    const onSubmit = e =>{
    e.preventDefault();
    setSearch(search);
    }
    const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;
    if(pageCount === 1) return null;
    const pages =_.range(1, pageCount+1) 

    const Pagination = (pageNo) => {
        setcurrentPage(pageNo);
        const startIndex = (pageNo - 1)* pageSize;
        const  paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
        setpaginatedPosts(paginatedPost);
    }

    return (
        <div className="home">{
            !paginatedPosts ? ("No data found"):(
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
            {paginatedPosts.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).map(item => {
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
        <nav>
            <ul className="pagination center">
                {
                    pages.map((page) => (
                        <li className={
                            page === currentPage ? "page-item active" : "page-item"
                        }>
                            <p className="page-link"
                            onClick={() => Pagination(page)}>{page} </p>
                            </li>
                    ))
                }
            </ul>
        </nav>
    </div>)}
export default Posts
