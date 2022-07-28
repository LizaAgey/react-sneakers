import React from "react"
import MainSneakerCard from "./components/MainSneakerCard";
import Header from "./components/Header";
import RightMenu from "./components/RightMenu";

function App() {
    const [isCartOpened, setCartOpened] = React.useState(false) //задаем Корзине состояние false (=closed)
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [searchValue, setSearchValue] = React.useState('')

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }


    const addToCart = (newItem) => {

        //если нажали на плюс и Кроссовки уже есть в корзине, то удаляем, если нет, то добавляем
        if (cartItems.some(cartItem => cartItem.id === newItem.id)) {
            setCartItems(currentCartItems =>
                currentCartItems.filter(cartItem => {
                    return cartItem.id !== newItem.id;
                }))
        } else {
            setCartItems(previous => [...previous, newItem])
        }
    }

    React.useEffect(() => {
        fetch('https://62d96da85d893b27b2e64d19.mockapi.io/items')
            .then((response) => {
                return response.json()
            }).then((json) => {
            setItems(json)
        })
    }, [])
    //выполняем функцию внутри только если ничего не изменилось, т.е при первом рендеренге App.js


    return (<div className="wrapper clear">

            {isCartOpened && <RightMenu onCloseCart={() => setCartOpened(!isCartOpened)}
                                        items={cartItems}/>}
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
                        .filter((item) =>item.title.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((item) =>
                        (<MainSneakerCard
                            key={item.id}
                            title={item.title}
                            price={item.price}
                            imgUrl={item.imgUrl}
                            id={item.id}
                            onPlus={(objItem) => (addToCart(objItem))}
                            onFavorite={() => console.log("Favorites are changed")}
                        />))}
                </div>
            </div>

        </div>

    )
}

export default App;