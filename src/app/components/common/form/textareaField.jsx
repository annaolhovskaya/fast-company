import React from "react";
import PropTypes from "prop-types";

const TextareaField = ({ label, value, name, error, onChange }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group has-validation">
                <textarea
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    rows="3"
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextareaField.defaultProps = {
    type: "text"
};

TextareaField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string
};

export default TextareaField;
