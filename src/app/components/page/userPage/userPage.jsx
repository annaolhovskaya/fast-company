import React, { useState, useEffect } from "react";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import api from "../../../api";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard
                            completedMeetings={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    }

    return <h1>Loading...</h1>;
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
