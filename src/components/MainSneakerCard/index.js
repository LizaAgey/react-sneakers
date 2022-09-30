import React from "react"
import styles from "./MainSneakerCard.module.scss"
import ContentLoader from "react-content-loader"
import AppContext from "../../context";

function MainSneakerCard({
                             id,
                             title,
                             price,
                             imgUrl,
                             onPlus,
                             onFavorite,
                             favorited = false,
                             isLoading = false
                         }) {

    const {isItemAddedToCart} = React.useContext(AppContext)
    // сохраняем нужные данные в переменную из контекста . если что-то в данных меняется, то делаем ре-рендер
    const [isFavorite, setIsFavorite] = React.useState(favorited)
    const itemOject = {id, parentId: id, title, price, imgUrl}
        //объект с данными карточки. parentId - это ID изначлаьной карточки, который потом уходит в корзину и там запоминается


    const onClickPlus = () => {
        onPlus(itemOject);
    }

    const onClickFavorite = () => {
        onFavorite(itemOject);
        setIsFavorite(!isFavorite)
        //конвертируем состоятине переменной в обратное
    }

    // Пример использования useEffect:
    // React.useEffect (() => {
    //     console.log("Changed")
    // }, [isAddedState])


    return (
        <div className={styles.card}>

            {
                isLoading ? (
                    <ContentLoader
                        speed={2}
                        width={150}
                        height={235}
                        viewBox="0 0 150 187"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"

                    >
                        <rect x="0" y="0" rx="10" ry="10" width="150" height="91"/>
                        <rect x="0" y="107" rx="3" ry="3" width="150" height="15"/>
                        <rect x="0" y="126" rx="3" ry="3" width="93" height="15"/>
                        <rect x="0" y="163" rx="8" ry="8" width="80" height="24"/>
                        <rect x="118" y="155" rx="8" ry="8" width="32" height="32"/>
                    </ContentLoader>
                ) : (
                    <>
                        {onFavorite && <img src={isFavorite ? 'img/heart-active.svg' : 'img/heart-inactive.png'}
                                            onClick={onClickFavorite}
                                            alt="Like"
                                            className={styles.button + " " + styles.likeButton}/>}

                        <img className={styles.sneakerImg} src={imgUrl} alt="sneaker"/>
                        <h5>{title}</h5>


                        <div className="d-flex justify-between align-center">
                            <div className={styles.sneakerPrice}>
                                <span className="text-uppercase ">Price:</span>
                                <b>{price} USD</b>
                            </div>


                            {/*<button>*/}

                            {onPlus &&
                                <img src={isItemAddedToCart(id) ? 'img/added-button.svg' : 'img/plus-button.svg'}
                                     alt="plus"
                                     onClick={onClickPlus}
                                     className="button"/>}
                            {/*</button>*/}
                        </div>
                    </>
                )
            }


        </div>
    )
}

export default MainSneakerCard;

