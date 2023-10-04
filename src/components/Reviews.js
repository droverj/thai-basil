import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Contact.scss';

const Reviews = ({ reviews }) => {

  const reviewArray = Object.values(reviews);

  // Function to generate a string of stars based on the rating
  const generateStars = (rating) => {
    const starSymbols = '★★★★★';
    return starSymbols.slice(0, rating);
  };

  return (
    <div>
      <ul>
        {reviewArray.map((review) => (
          <li key={review.id}>
            <p>"{review.comment}"</p> &nbsp;
            <p className='submitted-review-stars'>{generateStars(review.rating)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default Reviews;