import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {domain} from "../env";
import {Link} from "react-router-dom";
import './css/SearchBox.css'
import {useGlobalState} from "../state/provider";

const SearchBox = () => {
    const [{profile, all_data}, dispatch] = useGlobalState()
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [obtained_value, setObtained_value] = useState(false);


    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = all_data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
            setObtained_value(false)
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
        setObtained_value(false)
    };

    const setvalue = async (id, value) => {
        setWordEntered(value)
        setObtained_value(true)

    }


    return (
        <div className="outer-scope">
                <div className="d-flex input-group input-group-lg">
                    <input className="form-control me-2 border-info " type="search" placeholder="Search"
                           aria-label="Search"
                           value={wordEntered}
                           onChange={handleFilter}
                    />
                </div>
                {filteredData.length !== 0 && (
                <div className="dataResult inner-scope">
                    {filteredData.map((item, i) => {
                        return (
                            <Link to={`/product/${item.id}`} key={i} type="button" className="dataItem text-black"
                              >
                                <p>{item?.title} </p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
