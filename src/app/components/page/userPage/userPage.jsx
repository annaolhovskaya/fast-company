import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>Количество встреч: {user.completedMeetings}</p>
                <h2>Оценка: {user.rate}</h2>
                <Link to={`/users/${userId}/edit`}>
                    <button type="button">Изменить</button>
                </Link>
            </>
        );
    }

    return <h1>Loading...</h1>;
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
