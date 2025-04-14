import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="home-link">Return to Home</Link>
    </div>
  );
};

export default NotFound;