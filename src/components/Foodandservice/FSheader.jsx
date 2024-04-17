import React, { useEffect, useState } from "react";
import { useRef } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { PiForkKnifeBold, PiGuitarDuotone } from "react-icons/pi";
import useDebounce from "../../hook/useDebounce";
import { findFoodByName } from "../../api/food.api";
const FSheader_Content = ({ setPage }) => {

    return (
        <div className="fsheader">
            <div className="left">
                <button onClick={() => setPage("1")} className="food"><PiForkKnifeBold /> FOOD</button>
                <button onClick={() => setPage("2")} className="service"><PiGuitarDuotone /> SERVICE</button>
            </div>
            <div className="right">
                <SearchBox />
            </div>
        </div>
    )
}

const SearchBox = () => {

    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500); // Debounce the query input by 500 milliseconds
  
    useEffect(() => {
        console.log('Fetching data with query:', debouncedQuery);
        
        const fetchFood = async () => {
            const res = await findFoodByName(query)
            console.log(res.data) // food searched data 
        }

        if(query !== '') {
            fetchFood()
        }

      }, [debouncedQuery]);
    
    return (
        <form>
            <FaMagnifyingGlass className="icon" />
            <input type="text" placeholder="search" value={query} onChange={(e) => setQuery(e.target.value)}/>
        </form>
    )
}
export default FSheader_Content