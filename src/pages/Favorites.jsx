import React from "react";
import MainSneakerCard from "../components/MainSneakerCard";

function Favorites({

              }) {
    return (
        <div className="content p-40">

            {/*/!* Line before cards  *!/*/}
            {/*<div className="d-flex align-center justify-between mb-40">*/}

            {/*    <h1 className="opacity-5">{searchValue ? `Search of '${searchValue}'` : 'All sneakers'}</h1>*/}
            {/*    <div className="search-block d-flex align-center">*/}
            {/*        <img src="/img/search.svg" alt="Search"/>*/}
            {/*        {searchValue && (*/}
            {/*            <img src="/img/delete-button.svg"*/}
            {/*                 alt="Clear"*/}
            {/*                 className="button deleteSearch"*/}
            {/*                 onClick={() => {*/}
            {/*                     setSearchValue('')*/}
            {/*                 }}/>)}*/}
            {/*        <input onChange={onChangeSearchInput}*/}
            {/*               value={searchValue}*/}
            {/*               placeholder="Search..."*/}
            {/*               className="pl-15 opacity-5"/>*/}
            {/*        /!* value={searchValue} - контролируемый input (обновляется в зависимости от состояния serachValue*!/*/}
            {/*    </div>*/}
            {/*</div>*/}


            {/* CARDS  */}
            <div className="card-wrapper d-flex justify-center flex-wrap">
                My Favs are here
            </div>
        </div>
    )

}

export default Favorites