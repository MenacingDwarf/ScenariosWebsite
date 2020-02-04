import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Scenarios from "./components/Scenarios";
import ScenarioPage from "./components/ScenarioPage";
import EmptyPage from "./components/EmptyPage";
import Contacts from "./components/Contacts";
import Rewards from "./components/Rewards";
import PhotoGallery from "./components/PhotoGallery";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

class App extends Component {
    constructor(props) {
        super(props);
        this.setActiveLink = this.setActiveLink.bind(this);
    }
    state = {
        categories: [],
        links: [
            {id: 1, title: "Главная", to: "/"},
            {id: 2, title: "Сценарии", to: "/scenarios"},
            {id: 3, title: "Фотогалерея", to: "/photos"},
            {id: 4, title: "Достижения", to: "/rewards"},
            {id: 5, title: "Контакты", to: "/contacts"}
        ],
        active_link: 1
    };

    getCategories() {
        let comp = this;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", '/api/categories', true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            var answer = JSON.parse(decodeURIComponent(this.responseText));
            comp.setState({
                categories: answer.data
            });
        };

        xhr.send();
    }

    setActiveLink(link_id) {
        this.setState({active_link: link_id})
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header categories={this.state.categories} links={this.state.links} active_link={this.state.active_link}/>
                    <div className="main-content bg-light">
                        <Route exact path='/' render={(props) => <MainPage {...props} setActiveLink={this.setActiveLink}/>}/>
                        <Route exact path={'/scenarios'} render={(props) => <Scenarios {...props} setActiveLink={this.setActiveLink}/>}/>
                        <Route path={'/scenarios/:scenario_id'} render={(props) => <ScenarioPage {...props} setActiveLink={this.setActiveLink}/>}/>
                        <Route path={'/photos'} render={(props) => <PhotoGallery {...props} setActiveLink={this.setActiveLink}/>}/>
                        <Route path={'/contacts'} render={(props) => <Contacts {...props} setActiveLink={this.setActiveLink}/>}/>
                        <Route path={'/rewards'} render={(props) => <Rewards {...props} setActiveLink={this.setActiveLink}/>}/>
                    </div>
                </BrowserRouter>
                <ScrollUpButton />
            </div>
        );
    }
}

export default App;