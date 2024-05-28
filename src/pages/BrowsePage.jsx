import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BrowsePage.css';

const BrowsePage = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetch(`/api/categories/${category}`)
      .then(response => response.json())
      .then(data => setSubcategories(data.subcategories));
  };

  return (
    <div className="browse-page">
      <h2>Browse</h2>
      <div className="categories">
        {categories.map(category => (
          <div key={category.name} onClick={() => handleCategoryClick(category.name)}>
            <Link to={`/category/${category.name}`} className="category">
              <img src={`https://via.placeholder.com/150?text=${category.name}`} alt={category.name} />
              <p>{category.name}</p>
            </Link>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="subcategories">
          <h3>{selectedCategory}</h3>
          {subcategories.map(subcategory => (
            <div key={subcategory} className="subcategory">
              <Link to={`/category/${selectedCategory}/${subcategory}`}>
                <p>{subcategory}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
