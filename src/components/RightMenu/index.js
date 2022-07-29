import styles from "./RightMenu.module.scss"


function RightMenu({onCloseCart, items = [], onRemove}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.rightMenu}>
                <div className="d-flex align-center justify-between">
                    <h2 className="ml-30">My Cart</h2>

                    <img onClick={onCloseCart} src="/img/delete-button.svg" alt="Delete"
                         className="button mr-40"/>

                </div>


                <div className={styles.rightCards}>
                    {items.map((obj) => (
                        < div className={styles.sneakerRightCard}>
                            <img src={obj.imgUrl} alt="sneaker" className={styles.sneakerRightImg}/>
                            <div className={styles.sneakerRightText}>
                                <h5>{obj.title}</h5>
                                <b>{obj.price} USD</b>
                            </div>
                            <img src="/img/delete-button.svg"
                                 alt="Delete"
                                 className="button mr-10"
                                 onClick={() => {
                                     onRemove(obj.id)
                                 }}/>
                        </div>
                    ))}

                </div>

                <div className={styles.rightTotal}>
                    <div className={styles.totalText}>
                        <h5>Total:</h5>
                        <div className={styles.dottes}></div>
                        <b>155 USD</b>
                    </div>
                    <div className={styles.totalText}>
                        <h5>Tax 10%:</h5>
                        <div className={styles.dottes}></div>
                        <b>15 USD</b>
                    </div>
                    <button className={styles.greenBtn}>
                        <h3>Make an order</h3>
                        <img src="/img/array-right.svg" alt="Next" className="ml-30"/>
                    </button>


                </div>

            </div>
        </div>
    )

}

export default RightMenu