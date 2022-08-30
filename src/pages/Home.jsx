import React from "react";
import MainSneakerCard from "../components/MainSneakerCard";

function Home({
                  items,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  addToCart,
                  onAddToFavorites
              }) {
    return (
        <div className="content p-40">

            {/* Line before cards  */}
            <div className="d-flex align-center justify-between mb-40">

                <h1 className="opacity-5">{searchValue ? `Search of '${searchValue}'` : 'All sneakers'}</h1>
                <div className="search-block d-flex align-center">
                    <img src="/img/search.svg" alt="Search"/>
                    {searchValue && (
                        <img src="/img/delete-button.svg"
                             alt="Clear"
                             className="button deleteSearch"
                             onClick={() => {
                                 setSearchValue('')
                             }}/>)}
                    <input onChange={onChangeSearchInput}
                           value={searchValue}
                           placeholder="Search..."
                           className="pl-15 opacity-5"/>
                    {/* value={searchValue} - контролируемый input (обновляется в зависимости от состояния serachValue*/}
                </div>
            </div>


            {/* CARDS  */}
            <div className="card-wrapper d-flex justify-center flex-wrap">
                {items
                    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((item) =>
                        (<MainSneakerCard
                            key={item.numm}
                            title={item.title}
                            price={item.price}
                            imgUrl={item.imgUrl}
                            onPlus={(objItem) => (addToCart(objItem))}
                            onFavorite={(objItem) => (onAddToFavorites(objItem))}
                        />))}
            </div>
        </div>
    )

}

export default Home