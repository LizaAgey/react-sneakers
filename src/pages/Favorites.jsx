import React from "react";
import MainSneakerCard from "../components/MainSneakerCard";
import AppContext from "../context";

function Favorites() {

    const {favorites, onClickToFavorites} = React.useContext(AppContext)
    // сохраняем нужные данные в переменную из контекста . если что-то в данных меняется, то делаем ре-рендер

    return (
        <div className="content p-40">

            <div>
                <h1>My favorites</h1>
            </div>


            {/* CARDS  */}
            <div className="card-wrapper d-flex justify-center flex-wrap">
                {favorites.map((item, index) =>
                    (<MainSneakerCard
                        key={index}
                        favorited={true}
                        onFavorite={onClickToFavorites }
                        {...item}
                    />))}
            </div>
        </div>
    )

}

export default Favorites