import './style.css';
import React from 'react';
import { useState } from 'react';
import { userFields } from '../constants';
import { BsPlusSlashMinus } from "react-icons/bs";
import { addRideDetails } from '../api/add-ride-api';

const AddRide = () => {
  const [phoneNo, setPhoneNo] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [timeFlexibility, setTimeFlexibility] = useState(0);
  const [dateOfDeparture, setDateOfDeparture] = useState('');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function clearState(){
    setPhoneNo("");
    setSource("");
    setDestination("");
    setDepartureTime("");
    setTimeFlexibility(0);
    setDateOfDeparture("");
    setComments("");
    setMessage("");
}
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const rideDetails = {userId: localStorage.getItem(userFields.userId), phoneNo, src: source, dst: destination, 
      departureTime, timeFlexibility, dateOfDeparture, comments
    }

    addRideDetails(rideDetails)
    .then(res=>{
      setIsError(false);
      setMessage(res.data.message);
      setTimeout(clearState, 5000);
    })
    .catch(err=>{
      setIsError(true);
      setMessage(err.response.data.message);
      console.log(err);
  })
  };

  return (
    <div>
      <h5 className='kanit-regular text-center mb-4'>Hi {localStorage.getItem(userFields.name)}, Add the Ride Details</h5>
      <div className='card shadow mx-auto kanit-light' style={{width: "60vw"}}>
        <div className="card-header text-center"> Ride Details </div>
        <form onSubmit={handleSubmit} className='p-4'>

        <div className="row mb-3 d-flex align-items-center">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
          <div className="col-sm-4">
            <input type="text" id="name" className="form-control" value={localStorage.getItem(userFields.name)} 
            style={{height: "2rem"}} disabled/>
          </div>
          <label htmlFor="phoneNo" className="col-sm-2 col-form-label">Phone Number:</label>
          <div className="col-sm-4">
            <input type="text" id="phoneNo" className="form-control" value={phoneNo} 
            onChange={(e) => setPhoneNo(e.target.value)} style={{height: "2rem"}} required/>
          </div>
        </div>

        <div className="row mb-3 d-flex align-items-center">
          <label htmlFor="source" className="col-sm-2 col-form-label">Start Location:</label>
          <div className="col-sm-4">
            <input type="text" id="source" className="form-control" value={source} 
            onChange={(e) => setSource(e.target.value)} style={{height: "2rem"}} required/>
          </div>
          <label htmlFor="destination" className="col-sm-2 col-form-label">End Location:</label>
          <div className="col-sm-4">
            <input type="text" id="destination" className="form-control" value={destination} 
            onChange={(e) => setDestination(e.target.value)} style={{height: "2rem"}} required/>
          </div>
        </div>

        <div className="row mb-3 d-flex align-items-center">
          <label htmlFor="departureTime" className="col-sm-2 col-form-label">Departure Time:</label>
          <div className="col-sm-4">
            <input type="time" id="departureTime" className="form-control" value={departureTime} 
            onChange={(e) => setDepartureTime(e.target.value)} style={{height: "2rem"}} required/>
          </div>
          <label htmlFor="timeFlexibility" className="col-sm-2 col-form-label">Time Flexibility:</label>
          <div className="col-sm-4">
            <div className="input-group">
              <span className="input-group-text" style={{height: "2rem"}}><BsPlusSlashMinus /></span>
              <select id="timeRange" className="form-select p-1 ps-3" value={timeFlexibility} 
              onChange={(e) => setTimeFlexibility(e.target.value)} style={{height: "2rem"}} required>
                <option value="0">0</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
              </select>
              <span className="input-group-text" style={{height: "2rem"}}>minutes</span>
            </div>
          </div>
        </div>

        <div className="row mb-3 d-flex align-items-center">
          <label htmlFor="dateOfDeparture" className="col-sm-2 col-form-label">Date of Departure:</label>
          <div className="col-sm-10">
            <input type="date" id="dateOfDeparture" className="form-control" value={dateOfDeparture} 
            onChange={(e) => setDateOfDeparture(e.target.value)} style={{height: "2rem"}} required/>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="comments" className="col-sm-2 col-form-label">Comments:</label>
          <div className="col-sm-10">
            <textarea id="comments" className="form-control" value={comments} 
            onChange={(e) => setComments(e.target.value)}/>
          </div>
        </div>
        {message && (
          <div style={isError ? {color: "#dc3545"}: {color: "#28a745"}} className="kanit-light text-center mb-3">{message}</div>
        )}
        <div className="text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddRide;
