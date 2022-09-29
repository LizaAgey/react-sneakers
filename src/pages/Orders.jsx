import React from "react";
import MainSneakerCard from "../components/MainSneakerCard";
import axios from "axios";
import AppContext from "../context";


function Orders() {

    const {addToCart, onAddToFavorites} = React.useContext(AppContext)
    const [isLoading, setIsLoading] = React.useState(true) //делаем свой, т.к заказы не связаны с др частями
    const [orders, setOrders] = React.useState([])

    React.useEffect(() => {

        //самовызывающаяся функция:
        (async () => {
            try {
                const {data} = await axios.get('https://62d96da85d893b27b2e64d19.mockapi.io/orders')
                // console.log(data.map(obj => obj.items).flat())
                setOrders(data.reduce((previous, obj) => [...previous, ...obj.items], []))
                setIsLoading(false)
            } catch (error) {
                alert('Can not display orders ;(')
            }
        })()
    }, [])

    return (
        <div className="content p-40">

            <div>
                <h1>My orders</h1>
            </div>


            {/* CARDS  */}
            <div className="card-wrapper d-flex justify-center flex-wrap">
                {orders.map((item, index) =>
                    (<MainSneakerCard
                        key={index}
                        onPlus={(objItem) => (addToCart(objItem))}
                        onFavorite={(objItem) => (onAddToFavorites(objItem))}
                        isLoading={isLoading}
                        {...item}
                    />))}
            </div>
        </div>
    )

}

export default Orders