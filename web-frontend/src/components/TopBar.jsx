import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaMagnifyingGlass, FaBell } from "react-icons/fa6"

export default function TopBar({ active }) {

    const navigate = useNavigate();
    // Change based on props
    
    const [inputSelected, setInputSelected] = useState(false);

    return (
        <div className="h-[160px] w-full px-[80px] flex items-center justify-between">
            <div>
                <h2 className="text-2xl">Good morning User!</h2>
                <p className="text-onSurface">Let’s be productive today</p>
            </div>
            <div className="flex flex-row space-x-[16px]">
                <span className={`${inputSelected ? "text-secondary" : "text-onSurface"} bg-surface w-[300px] rounded-full px-[20px] py-[10px] flex flex-row items-center justify-between cursor-pointer`}>
                    <input
                        className="outline-none"
                        placeholder="Search"
                        onSelect={() => {setInputSelected(true)}}
                    />
                    <FaMagnifyingGlass className="inline text-secondary"/>
                </span>
                <span className="bg-surface w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer">
                    <FaBell/>
                </span>
                <button
                    className="bg-surface w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer"
                    onClick={() => {}}
                >
                    <FaUser/>
                </button>
            </div>
        </div>
    );
}
