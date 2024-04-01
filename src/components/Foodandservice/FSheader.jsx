import React from "react";
import { useRef } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { PiForkKnifeBold, PiGuitarDuotone } from "react-icons/pi";
const FSheader_Content = () => {
    const inputRef = useRef(null);
    const handleFormClick = () => {
        inputRef.current.focus();
    };
    return (
        <div class="fsheader">
            <div className="left">
                <button className="food"><PiForkKnifeBold/> FOOD</button>
                <button className="service"><PiGuitarDuotone /> SERVICE</button>
            </div>
            <div className="right">
                <form>
                    <FaMagnifyingGlass className="icon" />
                    <input ref={inputRef} type="text" placeholder="search" />
                </form>
            </div>
        </div>
    )
}
export default FSheader_Content