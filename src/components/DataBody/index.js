import React, { useState, useContext, useEffect } from "react";
import API from "../../pages/api";
import DataAreaContext from "../../pages/DataAreaContext";
import Nav from "../NavBar/index";
import DataCard from '../DataCard';
import { filter } from "async";

function DataBody() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState({users:[]});
    const [activeUser, setActiveUser] = useState(null);
    const [inc, setInc] = useState(1);
    const handleSearchChange = val => {
        //do some filtering with value
        const filtered = users.filter(user => user.first.toLowerCase().includes(val) || user.last.toLowerCase().includes(val));
        setFilteredUsers(filtered);
        setSortedUsers({users:filtered})
    }
    useEffect(() => {
        API.getUsers()
            .then(({ data: { results } }) => {
                console.log(results[0])
                const newResults = results.map(a => ({...a,first:a.name.first, last:a.name.last}))
                setFilteredUsers(newResults);
                setUsers(newResults);
                setSortedUsers({users:newResults})
            })
    }, [])
    const handleSort = key => {
        //do some sort here
        const sorted = filteredUsers.sort((a,b)=> a[key] < b[key] ? -1*inc : a[key] > b[key] ? 1*inc : 0);
        setInc(-inc);
        setSortedUsers({users:sorted})
    }
    
    return (
        <DataAreaContext.Provider value={{ handleSearchChange }}>
            <Nav />
            <div className="row">
                <div className="col-6">
                    <table class="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th onClick={()=>handleSort("first")} scope="col">First</th>
                                <th onClick={()=>handleSort("last")} scope="col">Last</th>
                                <th onClick={()=>handleSort("email")} scope="col">Email</th>
                                <th onClick={()=>handleSort("phone")} scope="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.users.map((a, i) => {
                                return <tr onClick={() => setActiveUser(i)}>
                                    <td><img src={a.picture.thumbnail} /></td>
                                    <td>{a.first}</td>
                                    <td>{a.last}</td>
                                    <td>{a.email}</td>
                                    <td>{a.phone}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col-6">
                    <DataCard {...filteredUsers[activeUser]} />
                </div>
            </div>
        </DataAreaContext.Provider>
    )
};
export default DataBody;
