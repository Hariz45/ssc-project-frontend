export const formatPrice = (price) => `₹${price}`;

export const formatDate = (date) =>
  new Date(date).toLocaleString();