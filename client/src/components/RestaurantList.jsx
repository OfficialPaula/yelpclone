import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:600/api/v1/restaurants');
        const { data } = response.data;
        setRestaurants(data.restaurant);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Restaurant List</h1>
      <div className="list-group">
        <table className="table table-dark table-hover">
          <thead className="bg-primary">
            <tr>
              <th scope="col">Restaurant</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {restaurants &&
              restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{/* Ratings */}</td>
                  <td>
                    <button className="btn btn-warning">Update</button>
                  </td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
              }

export default RestaurantList;