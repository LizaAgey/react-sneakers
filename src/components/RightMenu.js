function RightMenu() {
    return (
        <div style={{display: 'none'}} className="overlay">
            <div className="right-menu d-flex flex-column">
                <div className="rightHeader d-flex align-center justify-between">
                    <h2 className="ml-30">My Cart</h2>
                    <button className="close-btn mr-45">
                        <img src="/img/delete-button.svg" alt="Delete"/>
                    </button>
                </div>


                <div className="right-cards">

                    <div className="sneaker-right-card d-flex align-center justify-between m-30">
                        <img src="/img/sneakers/1.jpg" alt="sneaker" className="sneaker-right-img"/>
                        <div className="sneaker-right-text">
                            <h5>Мужские Кроссовки Nike Air Max 270</h5>
                            <b>155 USD</b>
                        </div>
                        <button className="close-btn mr-20">
                            <img src="/img/delete-button.svg" alt="Delete"/>
                        </button>
                    </div>

                    <div className="sneaker-right-card d-flex align-center justify-between m-30">
                        <img src="/img/sneakers/1.jpg" alt="sneaker" className="sneaker-right-img"/>
                        <div className="sneaker-right-text">
                            <h5>Мужские Кроссовки Nike Air Max 270</h5>
                            <b>155 USD</b>
                        </div>
                        <button className="close-btn mr-20">
                            <img src="/img/delete-button.svg" alt="Delete"/>
                        </button>
                    </div>

                    <div className="sneaker-right-card d-flex align-center justify-between m-30">
                        <img src="/img/sneakers/1.jpg" alt="sneaker" className="sneaker-right-img"/>
                        <div className="sneaker-right-text">
                            <h5>Мужские Кроссовки Nike Air Max 270</h5>
                            <b>155 USD</b>
                        </div>
                        <button className="close-btn mr-20">
                            <img src="/img/delete-button.svg" alt="Delete"/>
                        </button>
                    </div>

                    <div className="sneaker-right-card d-flex align-center justify-between m-30">
                        <img src="/img/sneakers/1.jpg" alt="sneaker" className="sneaker-right-img"/>
                        <div className="sneaker-right-text">
                            <h5>Мужские Кроссовки Nike Air Max 270</h5>
                            <b>155 USD</b>
                        </div>
                        <button className="close-btn mr-20">
                            <img src="/img/delete-button.svg" alt="Delete"/>
                        </button>
                    </div>

                    <div className="sneaker-right-card d-flex align-center justify-between m-30">
                        <img src="/img/sneakers/1.jpg" alt="sneaker" className="sneaker-right-img"/>
                        <div className="sneaker-right-text">
                            <h5>Мужские Кроссовки Nike Air Max 270</h5>
                            <b>155 USD</b>
                        </div>
                        <button className="close-btn mr-20">
                            <img src="/img/delete-button.svg" alt="Delete"/>
                        </button>
                    </div>

                    <div className="sneaker-right-card d-flex align-center justify-between m-30">
                        <img src="/img/sneakers/2.jpg" alt="sneaker" className="sneaker-right-img"/>
                        <div className="sneaker-right-text">
                            <h5>Мужские Кроссовки Nike Air Max 270</h5>
                            <b>155 USD</b>
                        </div>
                        <button className="close-btn mr-20">
                            <img src="/img/delete-button.svg" alt="Delete"/>
                        </button>
                    </div>
                </div>

                <div className="right-total d-flex flex-column m-30">
                    <div className="total-text d-flex justify-between align-center mb-20">
                        <h5>Total:</h5>
                        <div className="dottes"></div>
                        <b>155 USD</b>
                    </div>
                    <div className="total-text d-flex justify-between align-center mb-20">
                        <h5>Tax 10%:</h5>
                        <div className="dottes"></div>
                        <b>15 USD</b>
                    </div>
                    <button className="greenBtn d-flex justify-center align-center p-20">
                        <h3>Make an order</h3>
                        <img src="/img/array-right.svg" alt="Next" className="ml-30"/>
                    </button>


                </div>

            </div>
        </div>
    )

}

export default RightMenu