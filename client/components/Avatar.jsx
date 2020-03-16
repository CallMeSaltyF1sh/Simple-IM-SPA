import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ url, size }) => {
    return (
        <div>
        </div>
    )
};

Avatar.defaultProps = {
    size: 62
};

Avatar.propTypes = {
    url: PropTypes.string.isRequired,
    size: PropTypes.number
};

export default Avatar;