import React, { useState, useEffect } from "react";
import API from "../../pages/api";
import DataAreaContext from "../../pages/DataAreaContext";
import Nav from "../NavBar/index";
import DataCard from '../DataCard';

function DataBody() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState({users:[]});
    const [activeUser, setActiveUser] = useState(null);
    const [inc, setInc] = useState(1);
    const [sortAge, setSortAge] = useState(false);
    const handleSearchChange = val => {
       
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
        const sorted = filteredUsers.sort((a,b)=> a[key] < b[key] ? -1*inc : a[key] > b[key] ? 1*inc : 0);
        setInc(-inc);
        setSortedUsers({users:sorted})
    }
    const filterEmployees = () => {
        let sorted;
        if (sortAge){
            sorted = filteredUsers.sort((a,b)=> a.dob.age - b.dob.age)
        }
        else {
            sorted = filteredUsers.sort((a,b)=> b.dob.age - a.dob.age)

        }
        setSortAge(!sortAge)
        setSortedUsers({users:sorted})
    }
    return (
        <DataAreaContext.Provider value={{ handleSearchChange }}>
            <Nav />
            <button className="btn" type="button" onClick = {filterEmployees}>
                Filter By Age
                </button>
            <div className="row">
                <div className="col-6">
                    <table className="table table-striped" style={{margin:"auto"}}>
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th onClick={()=>handleSort("first")} scope="col">First</th>
                                <th onClick={()=>handleSort("last")} scope="col">Last</th>
                                <th onClick={()=>handleSort("email")} scope="col">Email</th>
                                <th onClick={()=>handleSort("phone")} scope="col">Phone</th>
                                <th onClick={()=>handleSort("age")} scope="col">Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.users.map((a, i) => {
                                return <tr onClick={() => setActiveUser(i)}>
                                    <td><img src={a.picture.thumbnail} alt="employee"/></td>
                                    <td>{a.first}</td>
                                    <td>{a.last}</td>
                                    <td>{a.email}</td>
                                    <td>{a.phone}</td>
                                    <td>{a.dob.age}</td>

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
