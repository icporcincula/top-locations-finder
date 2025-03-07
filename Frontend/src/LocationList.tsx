import React, { useState, useEffect } from "react";
import axios from "axios";

interface Location {
    place_id: string;
    name: string;
    rating: number;
}

const LocationList: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
                {
                    params: {
                        location: `${latitude},${longitude}`,
                        radius: 5000,
                        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                    },
                }
            );

            const filteredLocations = response.data.results.filter(
                (place: any) => place.rating >= 4.5
            );

            setLocations(filteredLocations);
        });
    }, []);

    return (
        <div>
            <h2>Top Nearby Locations</h2>
            <ul>
                {locations.map((loc) => (
                    <li key={loc.place_id}>{loc.name} - ⭐ {loc.rating}</li>
                ))}
            </ul>
        </div>
    );
};

export default LocationList;
