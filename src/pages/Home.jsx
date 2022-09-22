import React from "react";
import MainSneakerCard from "../components/MainSneakerCard";
import AppContext from "../context";


function Home({
                  items,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  addToCart,
                  onAddToFavorites,
                  isLoading
              }) {
    const {isItemAddedToCart} = React.useContext(AppContext)
    // сохраняем нужные данные в переменную из контекста . если что-то в данных меняется, то делаем ре-рендер

    const renderItems = () => {

        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()))
        // возвращает первое ложное выражение или..
        // если оба выражения были истинными, то возвращает последний

        return (isLoading
            ? [...Array(8)]
            : filteredItems).map((item, index) => (
            <MainSneakerCard
                key={index}
                onPlus={(objItem) => (addToCart(objItem))}
                onFavorite={(objItem) => (onAddToFavorites(objItem))}
                addedStatus={isItemAddedToCart(item && item.id)}
                isLoading={isLoading}
                {...item}
            />))
    }


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
                {renderItems()}
            </div>
        </div>
    )

}

export default Home