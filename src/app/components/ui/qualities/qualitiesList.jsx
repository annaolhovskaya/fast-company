import React from "react";
import { useQualities } from "../../../hooks/useQualities";
import Quality from "./quality";
import PropTypes from "prop-types";

const QualitiesList = ({ qualityIdArray }) => {
    const { isLoading, getQualities } = useQualities();
    const qualities = qualityIdArray.map((id) => getQualities(id));

    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </>
        );
    }
};

QualitiesList.propTypes = {
    qualityIdArray: PropTypes.array
};

export default QualitiesList;
