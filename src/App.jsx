import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axios from 'axios'
import Header from "./components/Header";
import RightMenu from "./components/RightMenu";
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"

export const AppContext = React.createContext({})


function App() {
    const [isCartOpened, setCartOpened] = React.useState(false) //задаем Корзине состояние false (=closed)
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [searchValue, setSearchValue] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    //----------ДОБАВЛЕНИЕ В КОРЗИНУ ЭЛЕМЕНТОВ
    const addToCart = (newItem) => {
        console.log(newItem)
        try {
            //если при нажатии объект уже существует в корзине, то удали его с клиента и сервера
            if (cartItems.find((item) => Number(item.id) === Number(newItem.id))) {
                axios.delete(`https://62d96da85d893b27b2e64d19.mockapi.io/cart/${newItem.id}`)
                setCartItems(previous => previous.filter(item => Number(item.id) !== Number(newItem.id)))
            }
            // в противном случае добавь его на клиенте и сервере
            else {
                axios.post('https://62d96da85d893b27b2e64d19.mockapi.io/cart', newItem)
                setCartItems((previous) => [...previous, newItem])
            }
        } catch {
            alert("Can not add to the cart :(")
        }
    }

    //---------УДАЛЕНИЕ ИЗ КОРЗИНЫ
    const onRemoveCart = (id) => {
        axios.delete(`https://62d96da85d893b27b2e64d19.mockapi.io/cart/${id}`)
        setCartItems((previous) => previous.filter(item => item.id !== id))
        console.log(id)
    }


    //----------ДОБАВЛЕНИЕ и УДАЛЕНИЕ из ЗАКЛАДОК
    const onClickToFavorites = async (newItem) => {
        try {
            if (favorites.find(obj => obj.id === newItem.id)) {
                axios.delete(`https://62d96da85d893b27b2e64d19.mockapi.io/favorites/${newItem.id}`)
            } else {
                const {data} = await axios.post('https://62d96da85d893b27b2e64d19.mockapi.io/favorites', newItem)
                // дожидаемся ответа сервера, вытягиваем данные c сервера и передаем их дальше ->
                // чтобы при добавлении item  в favorites и при его удалении id брался с сервера, а не с клиента и не было разницы в них
                setFavorites((previous) => [...previous, data])
            }
        } catch (error) {
            alert("Can not add to favorites :(")
        }
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
        // axios.get('https://62d96da85d893b27b2e64d19.mockapi.io/items')
        //     .then((response) => {
        //         setItems(response.data)
        //     })

        async function fetchData() {
            try {
                setIsLoading(true)
                //если функция с промисами выполняется несколько раз

                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([

                    axios.get('https://62d96da85d893b27b2e64d19.mockapi.io/cart'),
                    axios.get('https://62d96da85d893b27b2e64d19.mockapi.io/favorites'),
                    axios.get('https://62d96da85d893b27b2e64d19.mockapi.io/items'),
                ]);

                setIsLoading(false);
                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Error while data receiving ;(');
                console.error(error);
            }
        }

        fetchData() //ждем, пока прогрузится картина и избранное, чтобы потом отобразить состояние карточек на гл.вкладке

    }, [])
    // выполняем функцию при первом рендеринге (когда ничего дркго не происходит)


    return (

        <AppContext.Provider value = {{cartItems, favorites, items}}>
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
                                cartItems={cartItems}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                addToCart={addToCart}
                                onAddToFavorites={onClickToFavorites}
                                isLoading={isLoading}
                            />

                        }/>


                        <Route exact path={"/favorites"} element={
                            <Favorites
                                items={favorites}
                                onAddToFavorites={onClickToFavorites}
                            />
                        }/>
                    </Routes>
                </div>

            </Router>
        </AppContext.Provider>
    )
}

export default App;
