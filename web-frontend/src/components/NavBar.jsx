import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.svg"
import Checkmark from "../assets/Verified Checkmark.svg";
import { FaUserGroup, FaHouse, FaLightbulb, FaCirclePlus, FaFlag, FaGear, FaArrowRightFromBracket, FaCalendarDay } from "react-icons/fa6"
import { MdChevronRight } from "react-icons/md"

export default function NavBar({ active }) {

    const navigate = useNavigate();
    // Change based on props
    
    function Navbutton({type, active}) {
        let name = "Teams";
        let color = "text-secondary";
        let navigate_to = "/feed";

        function RenderIcon() {
            switch (type) {
                case "teams":
                    if (active == "teams") {
                        color = "text-primary"
                    }
                    navigate_to = "/teams";
                    name = "Teams";
                    return <FaUserGroup className={color}/>
                case "feed":
                    if (active == "feed") {
                        color = "text-primary"
                    }
                    navigate_to = "/";
                    name = "Activity Feed";
                    return <FaHouse className={color}/>
                case "insight":
                    if (active == "insight") {
                        color = "text-primary"
                    }
                    navigate_to = "/insight";
                    name = "Team Insights";
                    return <FaLightbulb className={color}/>
                case "post":
                    if (active == "post") {
                        color = "text-primary"
                    }
                    navigate_to = "/create";
                    name = "Create Post";
                    return <FaCirclePlus className={color}/>
                case "events":
                    if (active == "events") {
                        color = "text-primary"
                    }
                    navigate_to = "/events";
                    name = "Events";
                    return <FaCalendarDay className={color}/>
                case "report":
                    if (active == "report") {
                        color = "text-primary"
                    }
                    navigate_to = "/report";
                    name = "Reports";
                    return <FaFlag className={color}/>
                case "settings":
                    if (active == "settings") {
                        color = "text-primary"
                    }
                    navigate_to = "/settings";
                    name = "Settings";
                    return <FaGear className={color}/>
                case "logout":
                    name = "Log out";
                    color = "text-error";
                    return <FaArrowRightFromBracket className="text-error"/>
                default:
                    name = "Teams";
                    return <FaUserGroup/>
            }
        }

        return(
            <button
                className="flex flex-row items-center justify-between cursor-pointer"
                    onClick={() => {navigate(navigate_to)}}
            >
                <span className="flex flex-row items-center space-x-2">
                    {RenderIcon()}
                    <p className={color}>{name}</p>
                </span>
                <MdChevronRight className={color}/>
            </button>
        );
    }

    return (
        <div className="h-full w-[280px] p-[28px] border-r-[1.5px] border-border space-y-[56px]">
            <img src={Logo} className="w-[100px]"/>

            <div>
                {/* Change based on type */}
                <h1 className="text-2xl">Team Member</h1>
                <span className="space-x-[8px]">
                    {/* To change to a variable for the account name */}
                    Lideratos ng Nueva Atenista
                    <img src={Checkmark} className="m-1 size-[12px] inline"/>
                </span>
            </div>

            <Navbutton type={"teams"} active={active}/>

            <div className="space-y-[28px]">
                <Navbutton type={"feed"} active={active}/>
                <Navbutton type={"post"} active={active}/>
                <Navbutton type={"insight"} active={active}/>
                <Navbutton type={"events"} active={active}/>
            </div>

            <div className="space-y-[28px]">
                <h1>General</h1>
                <Navbutton type={"report"} active={active}/>
                <Navbutton type={"settings"} active={active}/>
                <Navbutton type={"logout"}/>
            </div>
        </div>
    );
}
