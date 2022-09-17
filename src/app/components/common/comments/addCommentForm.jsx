import React, { useState, useEffect } from "react";
import SelectField from "../form/selectField";
import TextareaField from "../form/textareaField";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите автора комментария"
            }
        },
        content: {
            isRequired: {
                message: "Комментарий не может быть пустым"
            }
        }
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    value={data.userId}
                    onChange={handleChange}
                    defaultOption="Выберите пользователя"
                    options={arrayOfUsers}
                    name="userId"
                    error={errors.userId}
                />
                <TextareaField
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    label="New message"
                    error={errors.content}
                />
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
