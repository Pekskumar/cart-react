// components/StarRating.js
import React from 'react';
import Star from './Star';

function StarRating({ rating }) {
  const totalStars = 5;
  let fullStars = Math.floor(rating);
  let halfStar = (rating % 1) >= 0.5 ? 1 : 0;
  let emptyStars = totalStars - fullStars - halfStar;

  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={index} filled />
      ))}
      {halfStar > 0 && <Star key="half" filled={false} />} {/* Placeholder for half-star */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} filled={false} />
      ))}
    </div>
  );
}

export default StarRating;
