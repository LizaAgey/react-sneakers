import React from "react"
import styles from "./RightMenu.module.scss"
import StatusBlock from "../StatusBlock/StatusBlock";
import axios from "axios";
import {useCartItems} from "../../hooks/useCartItems";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


function RightMenu({onCloseCart, items = [], onRemove, openedMode}) {

    const {cartItems, setCartItems, totalCartPrice} = useCartItems()
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false)
    const [orderID, setOrderID] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(false)


    const onClickOrderCompletion = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://62d96da85d893b27b2e64d19.mockapi.io/orders', {
                items: cartItems
            })
            setOrderID(data.id)
            setIsOrderCompleted(true);
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]
                await axios.delete('https://62d96da85d893b27b2e64d19.mockapi.io/cart/' + item.id)
                await delay(1000)
            }

        } catch (error) {
            alert("Error while order creation :(")
        }

        setIsLoading(false)
    }

    const taxPart = 0.1

    return (
        <div className={`${styles.overlay} ${openedMode ? styles.overlayVisible : ""}`}>
            <div className={styles.rightMenu}>
                <div className="d-flex align-center justify-between">
                    <h2 className="ml-30">My Cart</h2>

                    <img onClick={onCloseCart} src="img/delete-button.svg" alt="Delete"
                         className="button mr-40"/>

                </div>

                {items.length > 0 ?
                    (<div className={styles.rightCards}>
                        {items.map((obj) => (
                            <div key={obj.id} className={styles.sneakerRightCard}>
                                <img src={obj.imgUrl} alt="sneaker" className={styles.sneakerRightImg}/>
                                <div className={styles.sneakerRightText}>
                                    <h5>{obj.title}</h5>
                                    <b>{obj.price} USD</b>
                                </div>
                                <img src="img/delete-button.svg"
                                     alt="Delete"
                                     className="button mr-10"
                                     onClick={() => onRemove(obj.id)}/>
                            </div>
                        ))}

                    </div>) :
                    (<StatusBlock
                        title={isOrderCompleted ? 'The order is completed!' : 'The cart is empty'}
                        description={isOrderCompleted ? `Your order #${orderID} is waiting for delivery` : 'Add at least one item to make an order'}
                        image={isOrderCompleted ? 'img/order-completed.jpg' : 'img/empty-cart.png'}/>)
                }

                {items.length > 0 ?
                    (<div className={styles.rightTotal}>
                        <div className={styles.totalText}>
                            <h5>Total:</h5>
                            <div className={styles.dottes}></div>
                            <b>{totalCartPrice} USD</b>
                        </div>
                        <div className={styles.totalText}>
                            <h5>Tax {taxPart * 100}%:</h5>
                            <div className={styles.dottes}></div>
                            <b>{Math.round(totalCartPrice * taxPart)} USD</b>
                        </div>
                        <button disabled={isLoading} onClick={onClickOrderCompletion} className={styles.greenBtn}>
                            <h3>Make an order</h3>
                            <img src="img/array-right.svg" alt="Next" className="ml-30"/>
                        </button>
                    </div>) :

                    (console.log('No elements for total'))}

            </div>
        </div>
    )

}

export default RightMenu