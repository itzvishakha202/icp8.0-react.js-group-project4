import React, { useState } from 'react';
import Header from './../../Components/Header/Header'; 
import Footer from './../../Components/Footer/Footer';
import './ElectronicCategories.css';
import ElectronicImageLogo from './Electronic-device-img.png'
// import CategoriesData from '../../Config/CategoriesData';

const ElectronicsCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState({});

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
  const handleSort = (e) => setSortOption(e.target.value);

  // sort function
  const sortCategories = (categories) => {
    switch (sortOption) {
      case "nameAsc":
        return categories.sort((a, b) => a.name.localeCompare(b.name));
      case "nameDesc":
        return categories.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return categories;
    }
  };

  // Filter and sort categories
 const filteredCategories = sortCategories(
  CategoriesData.filter((category) =>
    category.name.toLowerCase().includes(searchQuery)
  )
);

  return (
    <div>
      <Header />

      <div className='main-container'>
        <div className='head-container'>
        <h2>Electronics on rent</h2>
      <img 
            src={ElectronicImageLogo} // Replace with your logo URL
            alt="Logo"
            className="logo-image"
          />
      <p>Browse through our wide range of electronic categories.</p>
        </div>

    {/* search and sorting */}
    <input
      type='text'
      placeholder='Search Categories'
      value={searchQuery}
      onChange={handleSearch}
      className='search-input'
    />

     {/* Sorting Dropdown */}
    <select onChange={handleSort} value={sortOption} className="sort-select">
      <option value="nameAsc">Sort by Name (A-Z)</option>
      <option value="nameDesc">Sort by Name (Z-A)</option>
    </select>

    {/* Display filtered and sorted categories */}
    <div className="categories-list">
        {filteredCategories.map((category) => (
          <div key={category.id} className="category-item">
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
              onClick={() => setSelectedProduct(category)} // Show product details
            />
            <h3>{category.name}</h3>
            <p>
              {showFullDescription[category.id]
                ? category.fullDescription // Show full description
                : `${category.description.substring(0, 60)}...`} {/* Show partial description */}
              <button
                onClick={() => toggleFullDescription(category.id)}
                className="toggle-description-button"
              >
                {showFullDescription[category.id] ? 'Show Less' : 'Show More'}
              </button>
            </p>
            <p>
              <strong>Price:</strong> ₹{category.finalPrice.toFixed(2)} (Original: ₹{category.priceInRupees.toFixed(2)}, {category.discountPercent}% off)
            </p>
            {category.inStock ? (
              <button onClick={() => addToCart(category)} className="add-to-cart-button">Add to Cart</button>
            ) : (
              <div className="out-of-stock-overlay">
                <p>Out of Stock</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <h2>Cart Summary</h2>
      <div className="cart-summary">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>Size: {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p className='btn-quantity'>
                    <button onClick={() => increaseQuantity(item.id)} className='btn-inc-dec'>+</button>
                    <button onClick={() => decreaseQuantity(item.id)} className='btn-inc-dec'>-</button>
                  </p>
                  <p className='emi-content'><strong>EMI (12 months):</strong> ₹{calculateEMI(item.priceInRupees, 12)} / month</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="product-details">
          <h3>{selectedProduct.name}</h3>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="category-image"
          />
          <p><strong>Full Description:</strong> {selectedProduct.fullDescription}</p>
          <p><strong>Size:</strong> {selectedProduct.size}</p>
          <p><strong>Price:</strong> ₹{selectedProduct.finalPrice.toFixed(2)}</p>
          <p><strong>Monthly EMI:</strong> ₹{calculateEMI(selectedProduct.priceInRupees)}</p>
          <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
          <button onClick={() => setSelectedProduct(null)}>Close</button>
        </div>
      )}

      </div>

      <Footer />
    </div>
    
  );
}

export default ElectronicsCategories;
