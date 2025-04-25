import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addToCart } from '../redux/features/cartSlice'; // Import addToCart action
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/index.css";


function Shop() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // Initialize useDispatch

  useEffect(() => {
    fetch('http://localhost:8888/react-wordpress/wp-json/wp/v2/posts?_embed')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        setPosts(data);
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
      
      <div className="row ">
        {posts.map((post) => {
          const price = post.acf?.pris || 'Ikke angivet';
          const description = post.acf?.beskrivelse || 'Ingen beskrivelse tilgængelig';
          const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

          return (
            <div className="col-md-4 mb-4 " key={post.id}>
              <div className="card h-100 shadow-sm">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    className="card-img-top"
                    alt={post.title.rendered}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column bg-light rounded shadow-sm">
                  <h5 className="card-title">{post.title.rendered}</h5>
                  <p className="card-text">
                    <strong>Pris:</strong> {price} kr.
                  </p>
                  <p className="card-text">{description}</p>
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: post.id,
                          title: post.title.rendered,
                          price: price === 'Ikke angivet' ? 0 : parseFloat(price),
                          imageUrl,
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