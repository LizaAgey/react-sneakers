function MainSneakerCard (props) {
    const onClickPlus = () => {
        alert("Thank you for click!")
    }
    return (
        <div className="card d-flex flex-column align-center ">
            <button className="like-button">
                <img src="/img/heart-general.svg" alt="Like" className=""/>
            </button>

            <img className="sneaker-img" src={props.imgUrl} alt="sneaker"/>
            <h5>{props.title}</h5>


            <div className="d-flex justify-between align-center">
                <div className="sneaker-price d-flex flex-column justify-between">
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

