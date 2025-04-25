import React from 'react';
import HomeImg from '../assets/Homepage.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div
      className="bg-light min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        backgroundImage: `url(${HomeImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="text-center text-white px-4 position-absolute top-50 start-50 translate-middle"
        style={{ padding: '20px', borderRadius: '10px' }}
      >
        <h1 className="display-4 fw-bold mb-4">Drinks gjort nemt</h1>
        <p className="lead mb-4">
          Oplev lækre færdige drinkskasser – med og uden alkohol. Perfekt til hyggeaftener, firmafester og alt derimellem.
        </p>
        <a href="/shop" className="btn btn-lg" style={{ backgroundColor: '#ca6009',color: '#fff' }}>
          👉 Vælg din kasse og bestil i dag!
        </a>
      </div>
    </div>
  );
};

export default Home;