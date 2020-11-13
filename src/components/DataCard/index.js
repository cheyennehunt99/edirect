import React from "react";

function DataCard(props) {
    return (
    props.name ? <div className="card" style={{width: "18rem"}}>
  <img src={props.picture?.large} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{props.name.first} {props.name.last}</h5>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Gender: {props.gender}</li>
    <li className="list-group-item">Email: {props.email}</li>
    <li className="list-group-item">Phone: {props.phone}</li>
    <li className="list-group-item">Location: {props.location.city}, {props.location.state}</li>
    <li className="list-group-item">Age: {props.dob.age}</li>
  </ul>
</div> : ""

    )
};
export default DataCard;