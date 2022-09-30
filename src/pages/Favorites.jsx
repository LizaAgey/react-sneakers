import React from "react";
import MainSneakerCard from "../components/MainSneakerCard";
import AppContext from "../context";
import EmptyContentScreen from "../components/EmptyContentScreen/EmptyContentScreen";

function Favorites() {

    const {favorites, onClickToFavorites, isLoading} = React.useContext(AppContext)
    // сохраняем нужные данные в переменную из контекста . если что-то в данных меняется, то делаем ре-рендер

    return (
        <div className="content p-40">

            <div>
                <h1>My favorites</h1>
            </div>


            {(favorites.length > 0)
                ? (
                    <div className="card-wrapper d-flex justify-center flex-wrap">
                        {favorites.map((item, index) =>
                            (<MainSneakerCard
                                key={index}
                                favorited={true}
                                onFavorite={onClickToFavorites}
                                isLoading={isLoading}
                                {...item}
                            />))}
                    </div>)
                : <EmptyContentScreen
                    image="img/sad1_emoji.png"
                    title="No favorites"
                    text="Find something lovely on the main page"
                />}

        </div>
    )

}

export default Favorites