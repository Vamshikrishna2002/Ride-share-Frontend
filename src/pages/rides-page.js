import { useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { getAllRides, getFilteredRides } from "../api/ride-api";
import RideCard from "../components/rideCard";
import { FaFilter } from "react-icons/fa";
import FilterModal from "../components/filter";

function RidesPage() {
    const [rides, setRides] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [srcFilter, setSrcFilter] = useState('');
    const [srcRadius, setSrcRadius] = useState(500);
    const [dstFilter, setDstFilter] = useState('');
    const [dstRadius, setDstRadius] = useState(500);
    const [dateOfDepartureFilter, setDateOfDepartureFilter] = useState('');
    const [departureTimeFilter, setDepartureTimeFilter] = useState('');
    const [message, setMessage] = useState("");

    useEffect(() => {
        getAllRides()
        .then(res=>{
            setRides(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }, []);

    const handleFilterModalClose = () => {
        setIsFilter(false);
    }

    const handleSave = () => {
        const filterDetails = {srcFilter, srcRadius, dstFilter, dstRadius, dateOfDepartureFilter, departureTimeFilter};
        console.log(filterDetails);
        getFilteredRides(filterDetails)
        .then((res)=>{
            setRides(res.data);
            setMessage('');
            handleFilterModalClose();
        })
        .catch((err)=>{
            console.log(err);
            setMessage(err.response.data.message);
        })
    }

    return (
        <>
            <NavigationBar/>
            <div className="my-5 d-flex align-items-center">
                <h5 className='kanit-regular' style={{marginLeft: "44vw", marginRight: "35vw"}}>Find your Ideal Ride</h5>
                <h5 className="kanit-regular" style={{cursor: "pointer"}} onClick={()=>{setIsFilter(true)}}>
                    Filter <FaFilter size={"2.5vh"}/>  
                </h5>
            </div>

            <FilterModal isFilter={isFilter} handleFilterModalClose={handleFilterModalClose} handleSave={handleSave}
            srcFilter={srcFilter} srcRadius={srcRadius} dstFilter={dstFilter} dstRadius={dstRadius} 
            dateOfDepartureFilter={dateOfDepartureFilter} departureTimeFilter={departureTimeFilter}
            setSrcFilter={setSrcFilter} setDstFilter={setDstFilter} setSrcRadius={setSrcRadius} setDstRadius={setDstRadius}
            setDateOfDepartureFilter={setDateOfDepartureFilter} setDepartureTimeFilter={setDepartureTimeFilter}
            message={message} setMessage={setMessage}/>

            <div className="d-flex flex-wrap justify-content-evenly">
                {rides.map((ride) => (
                    <RideCard key={ride._id} ride={ride} />
                ))}
            </div>
        </>
    );
}

export default RidesPage;