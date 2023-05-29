require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

// Enable CORS middleware
app.use(cors());
app.use(morgan("dev"));


//Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try{
        const results = await db.query("select * from restaurants");
       console.log(results);
        res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: { 
                    restaurant: results.rows,
    },
    });
 } catch (err) {
    console.log(err);
 }
});

//Get a Restaurants
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        const results = await db.query("select * from restaurants where id=$1", [req.params.id]);
// select * from restaurants where id = req.params.id
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});


//Create a Restaurants
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range]
        );
        
        console.log(results);
        res.status(201).json({
            status: "success",
            data: { 
                restaurant: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//Update Restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
     try{
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id])

        res.status(200).json({
            status: "success",
            data: { 
                restaurant: results.rows[0],
            },
        });
     }catch (err) {
     console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body);
});

//Delete Restaurants
app.delete("/api/v1/restaurants/:id", async (req, res) => {

    try{
        const results = await db.query("DELETE FROM restaurants where id = $1",
        [req.params.id])
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
}); 