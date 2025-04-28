import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../redux/features/cartSlice'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/index.css";

function Shop() {
  const [drinks, setDrinks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); 

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/drinks')  // Change to your Laravel API endpoint
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        setDrinks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;

  return (
    <div className="container my-5">
      <div className="row">
        {drinks.map((drink) => {
          return (
            <div className="col-md-4 mb-4" key={drink.id}>
              <div className="card h-100 shadow-sm">
                {/* Corrected image rendering */}
                <img src={drink.img} alt={drink.title} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column bg-light rounded shadow-sm">
                  <h5 className="card-title">{drink.title}</h5>
                  <p className="card-text">
                    <strong>Pris:</strong> {drink.price} 
                  </p>
                  <p className="card-text">{drink.description}</p>
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: drink.id,
                          title: drink.title,
                          price: drink.price,
                          imageUrl: drink.img, // Use the actual image URL from the API
                        })
                      )
                    }
                  >
                    Tilføj til kurv
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;