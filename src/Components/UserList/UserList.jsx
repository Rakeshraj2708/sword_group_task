import React, { useEffect, useState } from 'react'
import './UserList.css'
import { Image, Pagination, Table } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(()=>{
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if(!isLoggedIn) navigate('/login')
        else fetchUsers(1);
        
    },[])

    const fetchUsers = async (currentPage) => {
        setCurrentPage(currentPage);
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
            setUsers(response.data);
            setLoading(false);
        } catch (error){
            setError("Error fetching Data");
            setLoading(false);
        }
    }

    if(loading) {
        return <p>Loading ....</p>
    }

    if(error){
        return <p>{error}</p>
    }

    if(!users || !users.data){
        return <p>No users found</p>
    }

   

    const logOut = () => {
        navigate('/login')
    }

    
  return (
    <div className='container-fluid px-5'>
        <h1 className='title'>User List</h1>
        <div className="text-end">
            <button onClick={logOut} className="btn btn-danger m-3">Log Out</button>
        </div>
        
        <Table responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                {users.data.map((user) => (
                    <tr key ={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                        <Image src={user.avatar} roundedCircle alt={user.first_name} width={50} height={50} />
                    </td>
                </tr>
                ))}
                
               
            </tbody>
        </Table>
        <p className='total-pages text-white'>{users.page} of {users.total_pages}</p>

        <div className="d-flex justify-content-center">
            <Pagination>
                <Pagination.First onClick={() => fetchUsers(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => fetchUsers(currentPage - 1)} disabled={currentPage === 1}/>

                {[...Array(users.total_pages)].map((p,index) =>(
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => fetchUsers(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => fetchUsers(currentPage + 1)}
                    disabled={currentPage === users.total_pages}                
                />
                <Pagination.Last
                    onClick={() => fetchUsers(users.total_pages)}
                    disabled={currentPage === users.total_pages}
                />
            </Pagination>
        </div>
                
    </div>
  )
}

export default UserList