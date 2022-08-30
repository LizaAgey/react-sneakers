import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axios from 'axios'
import Header from "./components/Header";
import RightMenu from "./components/RightMenu";
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"


function App() {
    const [isCartOpened, setCartOpened] = React.useState(false) //задаем Корзине состояние false (=closed)
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [searchValue, setSearchValue] = React.useState('')

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    //----------ДОБАВЛЕНИЕ В КОРЗИНУ ЭЛЕМЕНТОВ
    const addToCart = (newItem) => {
        axios.post('https://62d96da85d893b27b2e64d19.mockapi.io/cart', newItem)
        setCartItems((previous) => [...previous, newItem])

    }

    //---------УДАЛЕНИЕ ИЗ КОРЗИНЫ
    const onRemoveCart = (id) => {
        axios.delete(`https://62d96da85d893b27b2e64d19.mockapi.io/cart/${id}`)
        setCartItems((previous) => previous.filter(item => item.id !== id))
        console.log(id)
    }


    //----------ДОБАВЛЕНИЕ В ЗАКЛАДКИ
    const onAddToFavorites = (newItem) => {
        axios.post('https://62d96da85d893b27b2e64d19.mockapi.io/favorites', newItem)
        setFavorites((previous) => [...previous, newItem])

    }

    //-------------ПОЛУЧАЕМ ДАННЫЕ С СЕРВЕРА:

    React.useEffect(() => {
        //---------------------1 вариант
        //     fetch('https://62d96da85d893b27b2e64d19.mockapi.io/items')
        //         .then((response) => {
        //             return response.json()
        //         }).then((json) => {
        //         setItems(json)
        //     })
        //----------------2 вариант
        axios.get('https://62d96da85d893b27b2e64d19.mockapi.io/items')
            .then((response) => {
                setItems(response.data)
            })

        axios.get('https://62d96da85d893b27b2e64d19.mockapi.io/cart')
            .then((response) => {
                setCartItems(response.data)
            })
    }, [])
    // выполняем функцию при первом рендеринге (когда ничего дркго не происходит)


    return (
        <Router>

            <div className="wrapper clear">

                {isCartOpened && <RightMenu
                    onCloseCart={() => setCartOpened(!isCartOpened)}
                    items={cartItems}
                    onRemove={onRemoveCart}
                />}
                {/*если состояние Корзины = true => открываем ее, если нет, то ничего не делаем*/}


                <Header onClickCart={() => setCartOpened(!isCartOpened)}/>
                <Routes>
                    <Route exact path="/" element={
                        <Home
                            searchValue={searchValue}
                            items={items}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            addToCart={addToCart}
                            onAddToFavorites={onAddToFavorites}/>
                    }/>


                    <Route exact path={"/favorites"} element={
                        <Favorites/>
                    }/>
                </Routes>
            </div>

        </Router>
    )
}

export default App;
