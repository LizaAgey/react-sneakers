import React from "react"
import MainSneakerCard from "./components/MainSneakerCard";
import Header from "./components/Header";
import RightMenu from "./components/RightMenu";

function App() {
    const [isCartOpened, setCartOpened] = React.useState(false) //задаем Корзине состояние false (=closed)
    const [items, setItems] = React.useState([])

    fetch('https://62d96da85d893b27b2e64d19.mockapi.io/items')
        .then((response) => {
            return response.json()
        }).then((json) => {
        setItems(json)
    })

    return (<div className="wrapper clear">

            {isCartOpened && <RightMenu onCloseCart={() => setCartOpened(!isCartOpened)}/>}
            {/*если состояние Корзины = true => открываем ее, если нет, то ничего не делаем*/}

            <Header onClickCart={() => setCartOpened(!isCartOpened)}/>

            {/*CONTENT */}
            <div className="content p-40">

                {/* Line before cards  */}

                <div className="d-flex align-center justify-between mb-40">
                    <h1 className="opacity-5">All sneakers</h1>
                    <div className="search-block d-flex align-center">
                        <img src="/img/search.svg" alt="Search"/>
                        <input type="text" placeholder="Search..." className="pl-15 opacity-5"/>
                    </div>
                </div>


                {/* CARDS  */}
                <div className="card-wrapper d-flex justify-between flex-wrap">
                    {items.map(obj => (<MainSneakerCard
                        title={obj.title}
                        price={obj.price}
                        imgUrl={obj.imgUrl}
                        // onClickPlus={() => console.log("Added to cart")}
                        // onClickFavorite={() => console.log("Added to favorite")}
                    />))}
                </div>
            </div>

        </div>

    )
}

export default App;