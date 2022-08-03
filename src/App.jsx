import React from "react"
import MainSneakerCard from "./components/MainSneakerCard";
import Header from "./components/Header";
import RightMenu from "./components/RightMenu";
import axios from 'axios'

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
        setCartItems((previous) => previous.filter(item => item.id !== id)
        )
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


    return (<div className="wrapper clear">

            {isCartOpened && <RightMenu
                                        onCloseCart={() => setCartOpened(!isCartOpened)}
                                        items={cartItems}
                                        onRemove={onRemoveCart}
            />}
            {/*если состояние Корзины = true => открываем ее, если нет, то ничего не делаем*/}


            <Header onClickCart={() => setCartOpened(!isCartOpened)}/>


            {/*CONTENT */}
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

        </div>

    )
}

export default App;