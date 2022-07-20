import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ data, onDelete, onToggleBookMark }) => {
    return (
        <>
            <tr>
                <td>{data.name}</td>
                <td>
                    {data.qualities.map((qualitie) => (
                        <Qualitie {...qualitie} key={qualitie._id} />
                    ))}
                </td>
                <td>{data.profession.name}</td>
                <td>{data.completedMeetings}</td>
                <td>{data.rate} /5</td>
                <td>
                    <BookMark
                        id={data._id}
                        status={data.bookmark}
                        onToggleBookMark={onToggleBookMark}
                    />
                </td>
                <td>
                    <button
                        onClick={() => onDelete(data._id)}
                        className="btn btn-danger"
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    data: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;
