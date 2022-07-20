import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ id, status, onToggleBookMark }) => {
    const getIconClasses = () => {
        let classes = "bi bi-hand-thumbs-up";
        classes += status ? "-fill" : "";
        return classes;
    };

    return (
        <button onClick={() => onToggleBookMark(id)}>
            <i className={getIconClasses()}></i>
        </button>
    );
};

BookMark.propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default BookMark;
