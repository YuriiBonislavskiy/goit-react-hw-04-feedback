import PropTypes from 'prop-types';

export const Notification = ({massage}) => {
  //   console.log(child);
  return <p>{massage}</p>;
};

Notification.propTypes = {
  massage: PropTypes.string.isRequired,
};
