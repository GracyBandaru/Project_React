// utils/authHelpers.js
export const getUserIdFromToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.nameid || decoded[ClaimTypes.NameIdentifier];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };