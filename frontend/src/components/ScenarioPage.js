import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Photo from "./Photo";
import Loader from "./Loader";

class ScenarioPage extends Component {
    state = {
        scenario: null,
        demo_open: false
    };

    getScenario() {
        const {scenario_id} = this.props.match.params;
        fetch(`/api/scenarios/?scenario_id=${scenario_id.toString()}`)
            .then(response => response.json())
            .then(result => {
                this.setState({scenario: result.data});
                document.title = this.state.scenario.title;
            })
    }

    componentDidMount() {
        this.getScenario();
        this.props.setActiveLink(2);
    }

    render() {
        let scenario = this.state.scenario;
        let categories = scenario ? scenario.categories.map((category, index) => {
            return <span className="badge badge-info p-1 ml-2" key={index}>{category}</span>
        }) : null;
        let photos = scenario ? (scenario.photos.length !== 0 ? <div>
                    <h2>Фотографии</h2>
                    <div className="row">
                        {scenario.photos.map((photo, index) => {
                            return <div className="col-6 col-lg-4 col-xl-3 mb-2" key={index}>
                                <Photo photo={photo} index={index}/>
                            </div>
                        })}
                    </div>
                </div>
                :
                null
        ) : null;
        let content = scenario ? <div className={"col-12"}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/scenarios"}>Сценарии</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{scenario.title}</li>
                </ol>
            </nav>
            <div className="row mb-3">
                <div className="col-12 col-lg-6">
                    <img src={scenario.image} alt="image" className={"rounded w-100"}/>
                </div>
                <div className="col-12 col-lg-6">
                    <h1>{scenario.title}</h1>
                    <p>{scenario.description}</p>
                    <div className={"mb-3"}><h2>Цена: <span className={"text-info"}>{scenario.price} руб.</span></h2></div>
                    <div>Категории:{categories}</div>
                </div>
            </div>

            <div className="col-12">
                <ul className="row list-group list-group-horizontal mb-2">
                    <li className="col-6 col-lg-4 list-group-item text-center">
                        <i className="far fa-clock " style={{fontSize: "1.5em"}}/>
                        <div>{scenario.min_duration_minutes}-{scenario.max_duration_minutes} минут</div>
                    </li>
                    <li className="col-6 col-lg-4 list-group-item text-center">
                        <i className="fas fa-users" style={{fontSize: "1.5em"}}/>
                        <div>{scenario.actors_number} актёров</div>
                    </li>
                    <li className="col-12 col-lg-4 list-group-item text-center">
                        <i className="fas fa-bullseye" style={{fontSize: "1.5em"}}/>
                        <div>{scenario.target_audience}</div>
                    </li>
                </ul>
            </div>
            <hr/>
            <div className="col-12">
                <div className="row">
                    <h2 className={"display-inline mr-3 mb-3 align-middle"}>Демо-фрагмент</h2>
                    <button type="button" className="btn btn-outline-info mt-1 mb-3" data-toggle="collapse"
                            data-target="#demo"
                            onClick={(e) => this.setState({demo_open: !this.state.demo_open})}>
                        {this.state.demo_open ? "Скрыть" : "Раскрыть"}
                    </button>
                    <p className="collapse" id="demo" style={{whiteSpace: "pre-wrap"}}>{scenario.demo}</p>
                </div>
            </div>
            <hr/>
            <div className="col-12">
                <div className="row">
                    <div className="alert alert-info" role="alert">
                        <i>Дорогие друзья! Те, кого заинтересовал данный сценарий, могут получить его полную
                            версию, с
                            авторскими минусами песен и презентациями, если напишут мне на электронный
                            адрес:
                            andrew.gurkov@yandex.ru. Невысокая цена – скромная благодарность автору за его
                            труд.
                            <br/>
                            С уважением автор. А Гурков.</i>
                    </div>
                </div>
            </div>
            <div className="col-12">
                {photos}
            </div>
        </div> : <Loader/>;
        return (
            <div className="row">{content}</div>
        );
    }
}

export default ScenarioPage;