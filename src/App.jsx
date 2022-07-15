import MainSneakerCard from "./components/MainSneakerCard";
import Header from "./components/Header";
import RightMenu from "./components/RightMenu";

const arr = [
    {
        title: "Man Sneakers Nike Blazer Mid Suede",
        price: 124,
        imgUrl: "/img/sneakers/1.jpg"
    },
    {
        title: "Man Sneakers Nike Air Max 270",
        price: 135,
        imgUrl: "/img/sneakers/2.jpg"
    },
    {
        title: "Man Sneakers Nike Blazer Mid Suede",
        price: 145,
        imgUrl: "/img/sneakers/3.jpg"
    },
    {
        title: "Man Sneakers Puma X Aka Boku Future Rider",
        price: 115,
        imgUrl: "/img/sneakers/4.jpg"
    }]

function App() {
    return (
        <div className="wrapper clear">

            {/* RIGHT-SIDE MENU  */}
            <RightMenu/>

            {/* HEADER  */}
            <Header/>

            {/*CONTENT */}
            <div className="content p-40">

                {/* Line before cards  */}

                <div className="d-flex align-center justify-between mb-40">
                    <h1 className="opacity-5">All sneakers</h1>
                    <div className="search-block d-flex align-center">
                        <img src="/img/search.svg" alt="Search"/>
                        <input type="text" placeholder="Search..." className="pl-15 opacity-5"/>


                    </div>
                </div>


                {/* CARDS  */}
                <div className="card-wrapper d-flex justify-between">
                    {
                        arr.map(obj => (
                            <MainSneakerCard
                                title={obj.title}
                                price={obj.price}
                                imgUrl={obj.imgUrl}/>
                        ))
                    }


                </div>

            </div>

        </div>
    )
        ;
}

export default App;