import styles from "./MainSneakerCard.module.scss"

function MainSneakerCard (props) {
    const onClickPlus = () => {
        alert("Thank you for click!")
    }
    return (
        <div className={styles.card}>
            <button className={styles.likeButton}>
                <img src="/img/heart-general.svg" alt="Like"/>
            </button>

            <img className={styles.sneakerImg} src={props.imgUrl} alt="sneaker"/>
            <h5>{props.title}</h5>


            <div className="d-flex justify-between align-center">
                <div className={styles.sneakerPrice}>
                    <span className="text-uppercase ">Price:</span>
                    <b>{props.price} USD</b>
                </div>
                <button onClick={onClickPlus}>
                    <img src="/img/plus-button.svg" alt="plus"/>
                </button>
            </div>

        </div>
    )
}

export default MainSneakerCard;

