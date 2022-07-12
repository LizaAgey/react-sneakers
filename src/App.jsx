import MainSneakerCard from "./components/MainSneakerCard";
import Header from "./components/Header";
import RightMenu from "./components/RightMenu";

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

                    <MainSneakerCard/>

                </div>

            </div>

        </div>
    )
        ;
}

export default App;