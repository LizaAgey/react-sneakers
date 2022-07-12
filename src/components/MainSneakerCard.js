function MainSneakerCard () {
    return (
        <div className="card d-flex flex-column align-center ">
            <button className="like-button">
                <img src="/img/heart-general.svg" alt="Like" className=""/>
            </button>

            <img className="sneaker-img" src="/img/sneakers/1.jpg" alt="sneaker"/>
            <h5>Man Sneakers Nike Blazer Mid Suede</h5>


            <div className="d-flex justify-between align-center">
                <div className="sneaker-price d-flex flex-column justify-between">
                    <span className="text-uppercase ">Price:</span>
                    <b>124 USD</b>
                </div>
                <button>
                    <img src="/img/plus-button.svg" alt="plus"/>
                </button>
            </div>

        </div>
    )
}

export default MainSneakerCard;

