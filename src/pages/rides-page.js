import { useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { getAllRides } from "../api/ride-api";
import RideCard from "../components/rideCard";

function RidesPage() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        getAllRides()
        .then(res=>{
            setRides(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }, []);

    return (
        <>
            <NavigationBar/>
            <h5 className='kanit-regular text-center my-5'>Find your Ideal Ride</h5>
            <div className="d-flex flex-wrap justify-content-evenly">
                {rides.map((ride) => (
                    <RideCard key={ride._id} ride={ride} />
                ))}
            </div>
        </>
    );
}

export default RidesPage;