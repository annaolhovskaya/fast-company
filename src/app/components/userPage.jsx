import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = () => {
    const history = useHistory();
    const { userId } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleGoToAllUsers = () => {
        history.replace("/users");
    };

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h4>{`Профессия: ${user.profession.name}`}</h4>
                <QualitiesList qualities={user.qualities} />
                <h5>{`Количество встреч: ${user.completedMeetings}`}</h5>
                <h2>{`Оценка: ${user.rate}`}</h2>
                <button
                    onClick={() => {
                        handleGoToAllUsers();
                    }}
                >
                    Все Пользователи
                </button>
            </>
        );
    }

    return <h1>Loading...</h1>;
};

export default UserPage;
