import React, { useState, useEffect } from "react";
import { supabase } from "./supabase"

interface Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

const FeaturedLocations: React.FC = () => {
    const [featured, setFeatured] = useState<Location[]>([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            let { data, error } = await supabase.from("featured_locations").select("*");
            if (!error) setFeatured(data || []);
        };
        fetchFeatured();
    }, []);

    return (
        <div>
            <h2>Featured Locations</h2>
            <ul>
                {featured.map((loc) => (
                    <li key={loc.id}>{loc.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FeaturedLocations;
