import React from "react";
import MainSneakerCard from "../components/MainSneakerCard";

function Favorites({
                       items,
                       onAddToFavorites
                   }) {
    return (
        <div className="content p-40">

            <div>
                <h1>My favorites</h1>
            </div>


            {/* CARDS  */}
            <div className="card-wrapper d-flex justify-center flex-wrap">
                {items
                    .map((item) =>
                        (<MainSneakerCard
                            key={items.id}
                            favorited={true}
                            onFavorite={onAddToFavorites}
                            {...item}
                        />))}
            </div>
        </div>
    )

}

export default Favorites