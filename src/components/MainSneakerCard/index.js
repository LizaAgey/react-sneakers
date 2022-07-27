import React from "react"
import styles from "./MainSneakerCard.module.scss"

function MainSneakerCard({title, price, imgUrl,onPlus, onFavorite, id}) {
    const [isAdded, setIsAdded] = React.useState(false)

    const onClickPlus = () => {
        onPlus({title, price, imgUrl, id});
        setIsAdded(!isAdded)
        //конвертируем состоятине переменной в обратное
    }

    // Пример использования useEffect:
    // React.useEffect (() => {
    //     console.log("Changed")
    // }, [isAdded])


    return (
        <div className={styles.card}>
            <img src="/img/heart-general.svg" alt="Like" className="button likeButton"/>

            <img className={styles.sneakerImg} src={imgUrl} alt="sneaker"/>
            <h5>{title}</h5>


            <div className="d-flex justify-between align-center">
                <div className={styles.sneakerPrice}>
                    <span className="text-uppercase ">Price:</span>
                    <b>{price} USD</b>
                </div>
                {/*<button>*/}
                <img src={isAdded ? '/img/added-button.svg' : '/img/plus-button.svg'}
                     alt="plus"
                     onClick={onClickPlus}
                     className="button"/>
                {/*</button>*/}
            </div>

        </div>
    )
}

export default MainSneakerCard;

