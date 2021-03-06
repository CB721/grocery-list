import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Checkbox from "../Checkbox";
import convertDate from "../../utilities/convertDate";
import { ReactComponent as Trash } from "../../assets/images/trash.svg";
import "./style.scss";

function List(props) {
    const [list, setList] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [offset, setOffset] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [timeOfLastDrag, setTimeOfLastDrag] = useState();
    const [touchStartX, setTouchStartX] = useState(0);
    const [prevTouchX, setPrevTouchX] = useState(0);
    const [left, setLeft] = useState(0);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setList(props.list);
        const darkMode = localStorage.getItem("dark-mode");
        if (darkMode) {
            setIsDark(true);
        }
    }, [props.list]);
    function getListItemStyle(isDragging, draggableStyle) {
        let style = {};
        if (isDark) {
            style = {
                userSelect: "none",
                background: isDragging ? "#2F3338" : "rgb(4, 104, 205)",
                color: isDragging ? "rgb(4, 104, 205)" : "#2F3338",
                cursor: isDragging ? "pointer" : "default",
                "WebkitBoxShadow": isDragging ? "0px 3px 2px -2px rgba(47,51,56,0.64)" : "",
                "MozBoxShadow": isDragging ? "0px 3px 2px -2px rgba(47,51,56,0.64)" : "",
                "boxShadow": isDragging ? "0px 3px 2px -2px rgba(47,51,56,0.64)" : "",
                ...draggableStyle
            }
        } else {
            style = {
                userSelect: "none",
                background: isDragging ? "#F9FCFF" : "#3C91E6",
                color: isDragging ? "#3C91E6" : "#F9FCFF",
                cursor: isDragging ? "pointer" : "default",
                "WebkitBoxShadow": isDragging ? "0px 3px 2px -2px rgba(47,51,56,0.64)" : "",
                "MozBoxShadow": isDragging ? "0px 3px 2px -2px rgba(47,51,56,0.64)" : "",
                "boxShadow": isDragging ? "0px 3px 2px -2px rgba(47,51,56,0.64)" : "",
                ...draggableStyle
            }
        }
        return style;
    }
    function reorder(userList, startIndex, endIndex) {
        const result = Array.from(userList);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }
    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            list,
            result.source.index,
            result.destination.index
        )
        if (props.updateItemPosition) {
            props.updateItemPosition(items);
            setList(items);
        }
    }
    function action(event, info) {
        event.preventDefault();
        // if list has been provided a action function
        if (props.action && typeof (props.action) === "function") {
            props.action(info);
        }
    }
    function start(event, item) {
        event.preventDefault();
        // set selected item to state
        setSelectedItem(item);
        // get offset
        setOffset(left);
        // set starting time
        setTimeOfLastDrag(Date.now());
        // set starting position
        setTouchStartX(event.touches[0].clientX);
    }
    function end(event) {
        event.preventDefault();
        // set selected item to null
        setSelectedItem();
        // reset touch start x
        setTouchStartX(0)
    }
    function move(event) {
        event.preventDefault();
        if (selectedItem) {
            // get current x axis value
            const touchX = event.touches[0].clientX;
            // get current time
            const currTime = Date.now();
            // calculate time difference between now and last movement
            const elapsed = currTime - timeOfLastDrag;
            // calculate velocity
            const moveVelocity = 20 * (touchX - prevTouchX) / elapsed;
            console.log(moveVelocity);
            // calcuate how far the item has been dragged
            let deltaX = touchX - touchStartX + offset;
            // if it is dragged to the left and a delete option has been passed in
            if (deltaX < -280 && props.deleteItem && moveVelocity < -90) {
                props.deleteItem(selectedItem.id);
            } else if (deltaX > 280 && props.toggleClass && moveVelocity > 90) {
                props.toggleClass(event, selectedItem.id);
                deltaX = 0;
            } else {
                deltaX = 0;
            }
            // update state
            setVelocity(moveVelocity);
            setTimeOfLastDrag(currTime);
            setPrevTouchX(touchX);
            setLeft(deltaX);
            // the velocity can be used later for animating the background of an item to indicate it is being deleted
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} aria-label="list">
            <Droppable
                droppableId="droppable"
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="list"
                    >
                        {props.viewList ? (
                            <div>
                                {list.map((item, index) => (
                                    <Draggable
                                        draggableId={index.toString()}
                                        index={index}
                                        key={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                className="list-item"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getListItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                                onTouchStart={event => start(event, item)}
                                                onTouchEnd={event => end(event)}
                                                onTouchMove={event => move(event)}
                                            >
                                                <div
                                                    className="list-item-col"
                                                    aria-label={item.name}
                                                >
                                                    {item.name}
                                                </div>
                                                <div
                                                    className="list-item-col"
                                                    aria-label={item.store_name || item.list_name || "date"}
                                                >
                                                    {item.store_name || item.list_name || convertDate(item.date_added.split("T")[0])}
                                                </div>
                                                <div className="list-item-col">
                                                    <div className="sub-col priority">
                                                        {props.viewList ? (
                                                            <div style={{ margin: "0 auto" }}>
                                                                <select
                                                                    className="store-dropdown"
                                                                    defaultValue={item.priority}
                                                                    onChange={(event) => props.changePriority(event, item.id)}
                                                                    aria-label="select a priority level"
                                                                >
                                                                    <option className="store-select-item" value="Low" aria-label="low priority">
                                                                        Low
                                                                    </option>
                                                                    <option className="store-select-item" value="Normal" aria-label="normal priority">
                                                                        Normal
                                                                    </option>
                                                                    <option className="store-select-item" value="High" aria-label="high-priority">
                                                                        High
                                                                    </option>
                                                                    <option className="store-select-item" value="Any" aria-label="any-priority">
                                                                        Any
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                                <div style={{ margin: "0 auto" }}>
                                                                    {item.priority}
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div className="sub-col">
                                                        <div style={{ margin: "0 auto" }}>
                                                            <Checkbox
                                                                // if item has been purchased or not, change class
                                                                class={item.purchased === 0 ? "to-get" : "done"}
                                                                toggleClass={(event) => props.toggleClass(event, item.id)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        ) : (
                                <div>
                                    {list.map((item, index) => (
                                        <Draggable
                                            draggableId={index.toString()}
                                            index={index}
                                            key={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    className="list-item"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getListItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div
                                                        className="list-item-col"
                                                        onClick={(event) => action(event, item)}
                                                        aria-label={item.name}
                                                    >
                                                        {item.name}
                                                    </div>
                                                    <div
                                                        className="list-item-col"
                                                        onClick={(event) => action(event, item)}
                                                        aria-label={item.store_name || item.list_name || "date"}
                                                    >
                                                        {item.store_name || item.list_name || convertDate(item.date_added.split("T")[0])}
                                                    </div>
                                                    <div className="list-item-col">
                                                        <div className="sub-col priority">
                                                            {props.viewList ? (
                                                                <div>
                                                                    <select
                                                                        className="store-dropdown"
                                                                        defaultValue={item.priority}
                                                                        onChange={(event) => props.changePriority(event, item.id)}
                                                                        aria-label="select a priority level"
                                                                    >
                                                                        <option className="store-select-item" value="Low" aria-label="low priority">
                                                                            Low
                                                                        </option>
                                                                        <option className="store-select-item" value="Normal" aria-label="normal priority">
                                                                            Normal
                                                                        </option>
                                                                        <option className="store-select-item" value="High" aria-label="high-priority">
                                                                            High
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            ) : (
                                                                    <div>
                                                                        {item.priority}
                                                                    </div>
                                                                )}

                                                        </div>
                                                        <div className="sub-col">
                                                            <Trash
                                                                className={"edit-icon " + props.hidetrash}
                                                                onClick={() => props.deleteItem(item.id)}
                                                                aria-label="remove item"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default List;