import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../api";

const EditForm = () => {
    const params = useParams();
    const { userId } = params;

    const [user, setUser] = useState();
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    // const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    if (user) {
        return (
            <>
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            // error={errors.email}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            // error={errors.email}
                        />
                        <SelectField
                            label="Выберите Вашу профессию"
                            name="professions"
                            options={professions}
                            value={user.profession._id}
                            onChange={handleChange}
                            // error={errors.profession}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={user.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={user.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <Link to={`/users/${userId}`}>
                            <button
                                type="submit"
                                // disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </Link>
                    </form>
                </div>
            </>
        );
    }

    return <div className="col-md-6 offset-md-3 shadow p-4">Loading...</div>;
};

export default EditForm;
