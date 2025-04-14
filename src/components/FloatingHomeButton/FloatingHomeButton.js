import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './FloatingHomeButton.css';

const FloatingHomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button 
      className="floating-home-button"
      onClick={handleClick}
      aria-label="Return to homepage"
    >
      <FaHome className="home-icon" />
      <span className="button-text">Home</span>
    </button>
  );
};

export default FloatingHomeButton;