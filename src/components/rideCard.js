import { useState, useEffect } from 'react';
import RideModal from './rideModal';
import { getUserById } from '../api/user-api';
import { ImInfo } from "react-icons/im";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { userFields } from '../constants';
import { updateStar } from '../api/ride-api';
import { FaPencilAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import AddRide from './addRide';


const RideCard = ({ ride }) => {
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [user, setUser] = useState([]);
    const [isStarred, setIsStarred] = useState(false);

    const location = useLocation();
    const route = location.pathname.slice(1);

    useEffect(()=>{
        getUserById(ride.userId)
        .then(res=>{
            setUser(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

        getUserById(localStorage.getItem(userFields.userId))
        .then(res=>{
            if(res.data.starredRides.includes(ride._id)){
                setIsStarred(true);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    });
    
    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
    }

    const truncateString = (str, maxLength) => {
        return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
    };

    const onClickHandler = () => {
        updateStar(ride._id)
        .catch(err=>{
            console.log(err);
        })
        window.location.reload();
    }

    return (
        <div className="kanit-light card border shadow p-3 mx-2 mb-5" style={{width: "28vw"}}>
            <div className='d-flex justify-content-between align-items-center'>
                <h5>{user.name}</h5>
                <div className='d-flex'>
                    <h4 className='me-4' style={{cursor: "pointer"}} onClick={()=>{ setIsInfoModalOpen(true) }}><ImInfo/></h4>
                    {isStarred ? <h4 style={{cursor: "pointer"}}><FaStar onClick={onClickHandler}/></h4> : 
                    <h4 style={{cursor: "pointer"}}><FaRegStar onClick={onClickHandler}/></h4> }
                    {(route === "my-rides") && (
                        <h4 className='ms-4' style={{cursor: "pointer"}} onClick={()=>{ setIsUpdateModalOpen(true) }}><FaPencilAlt/></h4>
                    )}
                </div>
            </div>

            <RideModal
                show={isInfoModalOpen}
                onHide={handleCloseInfoModal}
                ride={ride}
                user={user}
            />

            <Modal show={isUpdateModalOpen} fullscreen onHide={handleCloseUpdateModal} className='kanit-light'>
                <Modal.Header closeButton className='mb-5'>
                    <h3>Update the Ride Details</h3>
                </Modal.Header>
                <Modal.Body>
                    <AddRide ride = {ride} setIsUpdateModalOpen = {setIsUpdateModalOpen}/>
                </Modal.Body>
            </Modal>

            <p><span className='kanit-regular'>Phone: </span>{ride.phoneNo}</p>
            <p><span className='kanit-regular'>Source: </span>{truncateString(ride.src, 110)}</p>
            <p><span className='kanit-regular'>Destination: </span>{truncateString(ride.dst, 110)}</p>
            <p><span className='kanit-regular'>Departure Date & Time: </span>{ride.dateOfDeparture}, {ride.departureTime}</p>
        </div>
    );
};

export default RideCard;
