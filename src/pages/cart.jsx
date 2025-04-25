import { useDispatch, useSelector } from 'react-redux';
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalPrice,
} from '../redux/features/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  if (cartItems.length === 0) {
    return (
      <div className="container my-5 p-5 bg-light rounded shadow-sm">
        <h1 className="text-center mb-4">Din Kurv</h1>
        <p className="text-center">Din kurv er tom</p>
      </div>
    );
  }

  return (
    <div className="container p-5 my-5 bg-light rounded shadow-sm">
      <h1 className="text-center mb-4">Din Kurv</h1>
      <div className="row">
        {cartItems.map(item => (
          <div key={item.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="row g-0 ">
                <div className="col-md-4">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="img-fluid rounded-start"
                    style={{height: '250px', objectFit: 'cover'}}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">Pris: {item.price} kr.</p>
                    <p className="card-text">Antal: {item.quantity}</p>
                    <div className="btn-group" role="group">
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        -
                      </button>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </button>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-light rounded shadow-sm">
        <h4 className="text-dark">Total antal varer: {totalQuantity}</h4>
        <h4 className="text-dark">Din total pris: <span className="text-success">{totalPrice.toFixed(2)} kr.</span></h4>
        <button 
          className="btn btn-success mt-3" 
          onClick={() => navigate('/checkout')} // Navigate to the Checkout page
        >
          Gå til Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;