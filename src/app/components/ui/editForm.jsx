import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../api";
import { validator } from "../../utils/validator";

const EditForm = () => {
    const params = useParams();
    const { userId } = params;
    const history = useHistory();

    const [user, setUser] = useState();
    const [edit, setEdit] = useState();
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.getById(userId).then((data) =>
            setEdit({
                name: data.name,
                email: data.email,
                profession: data.profession._id,
                sex: data.sex,
                qualities: data.qualities.map((quality) => ({
                    value: quality._id,
                    label: quality.name,
                    color: quality.color
                }))
            })
        );
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

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleChange = (target) => {
        setEdit((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [edit]);

    const validate = () => {
        const errors = validator(edit, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleUserDataUpdate = () => {
        const { profession, qualities } = edit;
        setUser((prevState) => ({
            ...prevState,
            name: edit.name,
            email: edit.email,
            sex: edit.sex,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.users.update(userId, user);
        history.push(`/users/${userId}`);
    };

    if (user) {
        return (
            <>
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={edit.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={edit.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выберите Вашу профессию"
                            name="profession"
                            options={professions}
                            value={edit.profession}
                            onChange={handleChange}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={edit.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={edit.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />

                        <button
                            type="submit"
                            disabled={!isValid}
                            onClick={handleUserDataUpdate}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </>
        );
    }

    return <div className="col-md-6 offset-md-3 shadow p-4">Loading...</div>;
};

export default EditForm;
