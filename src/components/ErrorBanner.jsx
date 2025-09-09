import PropTypes from "prop-types";
import "./ErrorBanner.css";

export default function ErrorBanner({ message }) {
  return (
    <div className="chart-error" role="alert">
      {message}
    </div>
  );
}

ErrorBanner.propTypes = {
  message: PropTypes.string.isRequired,
};
