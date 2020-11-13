import React from "react";
import Search from "../Search/index";

function Nav ({change}){
    return (
        <nav>
            <div className="search-area">
                <Search change={change}/>
            </div>
        </nav>
    );
};
export default Nav;