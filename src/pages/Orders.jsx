import React from "react";
import axios from "axios";

import AppContext from "../context";
import MainSneakerCard from "../components/MainSneakerCard";


function Orders() {

    const {addToCart, onAddToFavorites} = React.useContext(AppContext)
    const [isLoading, setIsLoading] = React.useState(true) //делаем свой, т.к заказы не связаны с др частями
    const [orders, setOrders] = React.useState([true])

    React.useEffect(() => {

        //самовызывающаяся функция:
        (async () => {
            try {
                const {data} = await axios.get('https://62d96da85d893b27b2e64d19.mockapi.io/orders')
                // console.log(data.map(obj => obj.items).flat())
                setOrders(data.reduce((previous, obj) => [...previous, ...obj.items], []))
                console.log(data.reduce((previous, obj) => [...previous, ...obj.items], []))
                setIsLoading(false)
            } catch (error) {
                alert('Order request error')
                console.error(error)
            }
        })();
    }, []);

    return (
        <div className="content p-40">
            <div>
                <h1>My orders</h1>
            </div>


            {/* CARDS  */}
            <div className="card-wrapper d-flex justify-center flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <MainSneakerCard
                        key={index}
                        isLoading={isLoading}
                        {...item}
                    />))
                }
            </div>
        </div>
    )
}

export default Orders