import React from "react";
import styles from "../RightMenu/RightMenu.module.scss";
import AppContext from "../../context";

const StatusBlock = ({image, title, description}) => {

    const {setCartOpened} = React.useContext(AppContext)

    return (
        <div className={styles.emptyCartWrapper + ' d-flex flex-column justify-center'}>
            <img src={image} alt="Empty Cart"
                 className={styles.emptyCartImg + " " + styles.alignCenter}/>
            <h3 className={styles.alignCenter}>{title}</h3>
            <p className={styles.alignCenter}>{description}</p>
            <button onClick={() => setCartOpened(false)} className={styles.greenBtn + " " + styles.alignCeter}>
                <img src="img/array-left.png" alt="Back" className="ml-30"/>
                <h3 >Back to the shop</h3>
            </button>
        </div>
    )
}

export default StatusBlock

