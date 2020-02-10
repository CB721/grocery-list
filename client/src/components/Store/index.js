import React, { useState, useEffect } from "react";
import { Textfit } from "react-textfit";
import { ReactComponent as EditIcon } from "../../assets/images/edit.svg";
import Flip from 'react-reveal/Flip';
import API from "../../utilities/api";
import "./style.scss";

function Store(props) {
    const [currentView, setCurrentView] = useState("view");
    const [add, setAdd] = useState("option-header");
    const [view, setView] = useState("option-header selected");
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        switch (currentView) {
            case "view":
                setAdd("option-header");
                setView("option-header selected");
                break;
            case "add":
                setAdd("option-header selected");
                setView("option-header");
                break;
            default:
                return;
        }
    }, [currentView]);
    function toggleOptions(event) {
        event.preventDefault();
        setCurrentView(event.currentTarget.id);
    }
    function handleInputChange(event) {
        event.preventDefault();
        let value = event.target.value;
        setSearch(value);
        // only call autocomplete api after user has typed at least 4 characters
        if (value.length > 3) {
            getSearchResults();
        } else {
            // if user deletes characters, clear results
            setResults([]);
        }
    }
    function getSearchResults() {
        const data = {
            search,
        }
        API.searchPlaces(data)
            .then(res => {
                setResults(res.data);
            })
            .catch(err => console.log(err));
    }
    function saveStore(event, store) {
        event.preventDefault();
        console.log("save store to user profile");
        console.log(store);
        const storeData = {
            id: store.id,
            name: store.structured_formatting.main_text,
            address: store.structured_formatting.secondary_text,
            user_id: "5e3afb5803935005eeeef6e9"
        }
        API.saveStore(storeData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }
    function removeStore(event, id) {
        event.preventDefault();
        API.deleteUserStore(id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
    return (
        <div className="store">
            <div className="store-options">
                <div
                    className={view}
                    id="view"
                    onClick={(event) => toggleOptions(event)}
                >
                    View Stores
                </div>
                <div
                    className={add}
                    id="add"
                    onClick={(event) => toggleOptions(event)}
                >
                    Add a Store
                </div>
            </div>
            {currentView === "view" ? (
                <div className="list">
                    {props.stores.map((store, index) => (
                        <div
                            className="list-item"
                            key={index}
                        >
                            <div className="store-li-col left">
                                {store.name}
                            </div>
                            <div className="store-li-col right">
                                <EditIcon
                                    className="edit-icon"
                                    onClick={(event) => removeStore(event, store.id)}
                                />
                            </div>
                        </div>
                    ))}
                    </div>
            ) : (
                    <div className="store-search">
                        <input
                            type="text"
                            className="form-input"
                            value={search}
                            placeholder={"Search for a store"}
                            onChange={handleInputChange}
                            name={"search"}
                        />
                        {results.length > 0 ? (
                            <Flip bottom cascade>
                                <div className="store-results-section">
                                    {results.map((result, index) => (
                                        <div
                                            key={result.id + index}
                                            className="search-result"
                                            onClick={(event) => saveStore(event, result)}
                                        >
                                            <Textfit
                                                mode="single"
                                                min={10}
                                                max={18}
                                                className="store-info store-name"
                                            >
                                                {result.structured_formatting.main_text}
                                            </Textfit>
                                            <Textfit
                                                mode="single"
                                                min={12}
                                                max={16}
                                                className="store-info store-address"
                                            >
                                                {result.structured_formatting.secondary_text.split(", USA")[0]}
                                            </Textfit>
                                        </div>
                                    ))}
                                </div>
                            </Flip>
                        ) : (<div />)}
                    </div>
                )}
        </div>
    )
}

export default Store;