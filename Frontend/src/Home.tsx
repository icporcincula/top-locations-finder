import React from "react";
import LocationList from "./LocationList";
import FeaturedLocations from "./FeaturedLocations";
import GoogleMapComponent from "./GoogleMapComponent";
import AddFeaturedLocation from "./AddFeaturedLocation";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Top Locations Finder</h1>
            <GoogleMapComponent />
            <LocationList />
            <FeaturedLocations />
            <AddFeaturedLocation />
        </div>
    );
};

export default Home;
