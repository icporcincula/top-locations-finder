import React, { useState } from "react";
import { supabase } from "./supabase"

const AddFeaturedLocation: React.FC = () => {
    const [name, setName] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const addLocation = async () => {
        await supabase.from("featured_locations").insert([{ name, lat, lng }]);
        alert("Featured Location Added!");
    };

    return (
        <div>
            <h2>Add Featured Location</h2>
            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Latitude" onChange={(e) => setLat(e.target.value)} />
            <input placeholder="Longitude" onChange={(e) => setLng(e.target.value)} />
            <button onClick={addLocation}>Add</button>
        </div>
    );
};

export default AddFeaturedLocation;
