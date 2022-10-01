import React from "react"
import {HashRouter, Route, Routes} from "react-router-dom";
import axios from 'axios'
import Header from "./components/Header";
import RightMenu from "./components/RightMenu";
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import AppContext from "./context";
import Orders from "./pages/Orders";


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
    const addToCart = async (newItem) => {
        console.log(newItem)
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(newItem.id))

            //если при нажатии объект уже существует в корзине, то удали его с клиента и сервера
            if (findItem) {
                setCartItems(previous => previous.filter(item => Number(item.parentId) !== Number(newItem.id)))
                await axios.delete(`https://62d96da85d893b27b2e64d19.mockapi.io/cart/${findItem.id}`)
            }
            // в противном случае добавь его на клиенте и сервере
            else {
                setCartItems((previous) => [...previous, newItem])
                const {data} = await axios.post('https://62d96da85d893b27b2e64d19.mockapi.io/cart', newItem)
                setCartItems((previous) => previous.map(item => {
                   if (Number(item.parentId === Number(data.parentId))) {
                       return {
                           ...item,
                           id: data.id
                       }
                   }
                   return item
                }))
            }
        } catch {
            alert("Can not add to the cart :(")
        }
    }

    //---------УДАЛЕНИЕ ИЗ КОРЗИНЫ
    const onRemoveCart = (id) => {
        try {
            axios.delete(`https://62d96da85d893b27b2e64d19.mockapi.io/cart/${id}`)
            setCartItems((previous) => previous.filter(item => Number(item.id) !== Number(id)))
            console.log(id)
        } catch (error) {
            alert("Can not delete from the cart :(")
            console.error()
        }
    }


    //----------ДОБАВЛЕНИЕ и УДАЛЕНИЕ из ЗАКЛАДОК
    const onClickToFavorites = async (newItem) => {
        try {
            if (favorites.find(obj => Number(obj.id) === Number(newItem.id))) {
                axios.delete(`https://62d96da85d893b27b2e64d19.mockapi.io/favorites/${newItem.id}`)
                setFavorites((previous) => previous.filter((item) => Number(item.id) !== Number(newItem.id)))
            } else {
                const {data} = await axios.post('https://62d96da85d893b27b2e64d19.mockapi.io/favorites', newItem)
                // дожидаемся ответа сервера, вытягиваем данные c сервера и передаем их дальше ->
                // чтобы при добавлении item  в favorites и при его удалении id брался с сервера, а не с клиента и не было разницы в них
                setFavorites((previous) => [...previous, data])
            }
        } catch (error) {
            alert("Can not add to favorites :(")
            console.error(error);
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

    const isItemAddedToCart = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id))
        // сверяем id со стр Home  с тем parentId, который был передан в Корзину
    }

    // если хотя бы один из ID в корзине равен передаваемому ID, то возвращаем true

    return (

        <AppContext.Provider value={{
            cartItems,
            favorites,
            items,
            isItemAddedToCart,
            onClickToFavorites,
            setCartOpened,
            setCartItems,
            addToCart,
        }}>
            <HashRouter>

                <div className="wrapper clear">

                    <RightMenu
                        onCloseCart={() => setCartOpened(false)}
                        items={cartItems}
                        onRemove={onRemoveCart}
                        openedMode={isCartOpened}
                    />


                    <Header onClickCart={() => setCartOpened(true)}/>
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

                        <Route exact path={"/orders"} element={
                            <Orders/>
                        }/>

                    </Routes>
                </div>

            </HashRouter>
        </AppContext.Provider>
    )
}

export default App;
