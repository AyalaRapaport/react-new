import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Stores from "./Stores";

const FilterCategory = () => {
    const { categoryId } = useParams();
    return (<>
        <Stores categoryId={categoryId} />
    </>);
}

export default FilterCategory;