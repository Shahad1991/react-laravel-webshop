import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice, selectCartItems } from '../redux/features/cartSlice';

const Checkout = () => {
  const totalPrice = useSelector(selectCartTotalPrice); // Get total price from Redux
  const cartItems = useSelector(selectCartItems); // Get cart items from Redux

  if (cartItems.length === 0) {
    return (
      <div className="container my-5 p-5 bg-light rounded shadow-sm">
        <h1 className="text-center">Din Checkout-side</h1>
        <p className="text-center text-muted">Din kurv er tom. Tilføj varer for at fortsætte.</p>
      </div>
    );
  }

  return (
    <div className="container my-5 p-5 bg-light rounded shadow-sm">
      
      <p className="text-center text-muted">Du er kun få klik fra at skåle! Udfyld dine oplysninger herunder.</p>
      <div className="row">
        <div className="col-md-8">
          
          <ul className="list-group mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="my-0">{item.title}</h6>
                  <small className="text-muted">Antal: {item.quantity}</small>
                </div>
                <span className="text-muted">{(item.price * item.quantity).toFixed(2)} kr.</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Opsummering</h5>
              <p className="card-text">Total pris: <strong>{totalPrice.toFixed(2)} kr.</strong></p>
              <button className="btn btn-success w-100" onClick={() => alert('Tak for din ordre!')}>
                Bekræft Ordre
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <h2>Tak for din ordre!</h2>
        <p className="text-muted">Vi pakker din drinkskasse med omhu og sender den hurtigst muligt.</p>
      </div>
    </div>
  );
};

export default Checkout;