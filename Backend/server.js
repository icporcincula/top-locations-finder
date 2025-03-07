import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.json());

// Fetch top locations using Google Places API
app.get("/api/locations", async (req, res) => {
    try {
        const { lat, lng } = req.query;
        const radius = 5000; // 5km
        const minRating = 4.5;
        
        const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${lng}`,
                radius,
                key: process.env.GOOGLE_MAPS_API_KEY
            }
        });

        const filteredLocations = googleResponse.data.results.filter(
            (place) => place.rating >= minRating
        );

        res.json(filteredLocations);
    } catch (error) {
        res.status(500).json({ error: "Error fetching locations" });
    }
});

// Fetch featured locations from Supabase
app.get("/api/featured-locations", async (req, res) => {
    try {
        const { data, error } = await supabase.from("featured_locations").select("*");
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching featured locations" });
    }
});

// Add a new featured location
app.post("/api/feature-location", async (req, res) => {
    try {
        const { name, lat, lng, price, userId } = req.body;
        const { data, error } = await supabase
            .from("featured_locations")
            .insert([{ name, lat, lng, price, user_id: userId }]);

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error adding featured location" });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
