import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Fade } from "shards-react";
import { ReactComponent as Bell } from "../../assets/images/bell.svg";
import SideMenu from "../SideMenu";
import Notifcations from "../Notifications";
import Modal from "../Modal";
import List from "../List";
import Button from "../Button";
import API from "../../utilities/api";
import Logo from "../../assets/images/logo.png";
import moment from "moment";
import "./style.scss";

function Navbar(props) {
    const [menuExpand, setMenuExpand] = useState("burger-menu");
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadNotificationTotal, setUnreadNotificationTotal] = useState(0);
    const [modal, setModal] = useState(false);
    const [modalList, setModalList] = useState([]);
    const [modalMessage, setModalMessage] = useState("");
    const [pwaModal, setPWAModal] = useState(false);
    const [addToHomeInstructions, setAddToHomeInstructions] = useState("");
    const [showPhoneOption, setShowPhoneOption] = useState(false);
    const isMobile = window.screen.availWidth < 500 ? true : false;
    const [navClass, setNavClass] = useState("nav");
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        // if there are any notifications
        if (props.notifications.length > 0) {
            // check for how many are unread and update total
            let total = 0;
            for (let i = 0; i < props.notifications.length; i++) {
                if (props.notifications[i].acknowledged === 0) {
                    total += 1;
                }
            }
            setUnreadNotificationTotal(total);
        }
    }, [props.notifications]);
    useEffect(() => {
        if (location.pathname === "/") {
            setNavClass("nav");
        } else {
            setNavClass("nav not-home");
        }
    }, [location]);

    function expandMenu(event) {
        event.preventDefault();
        if (menuExpand === "burger-menu") {
            setMenuExpand("burger-menu change");
            setShowNotifications(false);
        } else {
            setMenuExpand("burger-menu");
        }
    }
    function goToHome(event) {
        event.preventDefault();
        history.push("/");
    }
    function addEntirePreviousList() {
        const addList = {
            list_id: modalList[0].list_id,
            user_id: props.user[0].id
        }
        API.addPreviousListToCurrent(addList)
            .then(() => {
                props.notification("Previous list added to your current list");
            })
            .catch(err => console.log(err));
    }
    function addToCurrentList(item) {
        const listItem = {
            name: item.name,
            user_id: props.user[0].id,
            store_id: item.store_id,
            priority: "Normal",
            position: props.currList.length
        }
        setModalMessage(`${item.name} added!`);
        setTimeout(() => {
            setModalMessage("Click An Item To Add To Current List");
        }, 3000);
        API.addItem(listItem)
            .then(() => {
                props.notification(`${item.name} added to list`);
            })
            .catch(err => console.log(err));
    }
    function openModal(item) {
        let id = item.other_user_id || props.user[0].id;
        props.getListByID(item.list_id, id)
            .then(res => {
                if (res.length > 0) {
                    setModalList(res);
                    setModal(true);
                    setShowNotifications(false);
                    setModalMessage("Click An Item To Add To Current List");
                } else {
                    setModal(false);
                }
            })
            .catch(err => console.log(err));
    }
    function openPWAModal() {
        setPWAModal(true);
        setShowNotifications(false);
        const userAgent = navigator.userAgent.toLowerCase();
        const ua = window.navigator.userAgent;
        const webkit = !!ua.match(/WebKit/i);
        const isIPad = !!ua.match(/iPad/i);
        const isIPhone = !!ua.match(/iPhone/i)
        const isIOS = isIPad || isIPhone;
        const isSafari = isIOS && webkit && !ua.match(/CriOS/i);
        if (userAgent.indexOf("chrome") >= 0 || userAgent.indexOf("android") >= 0) {
            setAddToHomeInstructions("Tap the menu above.  Scroll and click the 'Add to Home screen' option.");
        } else if (isSafari) {
            setAddToHomeInstructions("Tap the share button below.  Scroll and click the 'Add to Home Screen' option");
        } else {
            setAddToHomeInstructions("Would you like to send")
        }
    }
    function closePWAModal() {
        setPWAModal(false);
        // update localstorage with current date
        const today = moment().toDate();
        localStorage.setItem("saveToHome", today);
        const data = {
            // the backend will update the column with the current date
            last_pwa_prompt: null
        }
        props.updateUser(data)
            .then()
            .catch(err => console.log(err));
    }
    function goToPage(page) {
        if (page === "settings") {
            props.changeSettingsTab("connections");
        }
        history.push(page);
        setShowNotifications(false);
    }
    function sendLinkToPhone() {
        // check if the user has a phone on file
        if (props.user[0].phone) {
            // call api to text route
            // close the modal
            closePWAModal();
        }
    }
    return (
        <div>
            {modal ? (
                <Modal
                    open={modal}
                    name={modalList[0].list_name}
                    message={modalMessage}
                    close={setModal}
                    content={<List
                        viewList={false}
                        list={modalList}
                        action={addToCurrentList}
                        hidetrash={"hide-trash"}
                    />}
                    button={<Button
                        text="Add All To Current List"
                        class="white-button"
                        action={addEntirePreviousList}
                    />}
                />
            ) : (<div />)}
            {pwaModal ? (
                <div className="pwa-modal">
                    <div className="logo-section">
                        <img src={Logo} alt="g-list logo" className="logo" />
                    </div>
                    <div className="modal-content">
                        <p className="message">
                            {addToHomeInstructions}
                        </p>
                        <div className="button-section">
                            {showPhoneOption ? (
                                <Button
                                    text="Send link to your mobile device"
                                    class="blue-button"
                                    action={sendLinkToPhone}
                                />
                            ) : (<div />)}
                            <Button
                                text="Close"
                                class="red-button"
                                action={closePWAModal}
                            />
                        </div>
                    </div>
                </div>
            ) : (<div />)}
            <Row>
                <Col>
                    <div className={navClass}>
                        <div className="nav-items" />
                        <div className="app-text" onClick={(event) => goToHome(event)} aria-label="go to home page">
                            G-List
                        </div>
                        <div className="nav-items">
                            {props.isLogged > 0 && !isMobile ? (
                                <div className="notification-section" aria-label="notifications">
                                    <Bell
                                        className="notification-bell"
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        aria-label={showNotifications ? "close notification panel" : "open notification panel"}
                                    />
                                    {unreadNotificationTotal > 0 ? (
                                        <p className="notification" aria-label={unreadNotificationTotal + " unread notifications"}>
                                            {unreadNotificationTotal}
                                        </p>
                                    ) : (<div />)}
                                </div>
                            ) : (<div />)}
                            {showNotifications && !isMobile ? (
                                <Notifcations
                                    items={props.notifications}
                                    markNotificationAsRead={props.markNotificationAsRead}
                                    deleteNotification={props.deleteNotification}
                                    openModal={openModal}
                                    goToPage={goToPage}
                                    openPWAModal={openPWAModal}
                                />
                            ) : (<div />)}
                            {!isMobile ? (
                                <div className={menuExpand} onClick={(event) => expandMenu(event)} aria-label="open side menu">
                                    <div className="bar1" />
                                    <div className="bar2" />
                                    <div className="bar3" />
                                </div>
                            ) : (<div />)}
                            {menuExpand === "burger-menu change" && !isMobile ? (
                                <Fade>
                                    <SideMenu
                                        options={props.options}
                                        expandMenu={expandMenu}
                                        logout={props.logout}
                                    />
                                </Fade>
                            ) : (<div />)}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Navbar;