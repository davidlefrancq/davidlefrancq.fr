import React, {Component} from 'react';
import './App.css';
import OccurenceList from "./components/Occurrence/OccurrenceList";
import Header from "./components/Header/Header";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import SlideImages from "./data/image/SlideImages";

class App extends Component {

    originalHeight;

    constructor(props) {
        super(props);
        const images = new SlideImages().images;
        this.state = {
            images: images,
        };
    }

    componentDidMount() {
        this.darkThemeInitialize();
        this.initResizeObserver();
    }

    darkThemeInitialize(){
        document.body.classList.add("text-light");
    }

    initResizeObserver(){
        this.originalHeight = document.body.offsetHeight;
        const resizeObserver = new ResizeObserver(entries => {
            const body = document.body;
            const app = document.getElementById("app");
            let height = app.offsetHeight;

            if(height < this.originalHeight){
                height = this.originalHeight;
            }

            if(height < body.offsetHeight){
                height = body.offsetHeight;
            }

            document.getElementById("root").style.height = `${height}px`;
        });
        resizeObserver.observe(document.getElementById("app"));
    }

    render() {
        return (
            <Router>
                <div id={"app"} className="App">
                    <Header/>

                    <Switch>
                        <Route exact path={"/"}>
                            <OccurenceList images={this.state.images}/>
                        </Route>
                    </Switch>

                </div>
            </Router>
        );
    }
}

export default App;
