import React, {Component} from 'react';

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
    }

    render() {
        let scenario = this.state.scenario;
        let content = scenario ? <div className={"col-12"}>
            <div className="row mb-2">
                <div className="col-6">
                    <img src={scenario.image} alt="image" className={"rounded w-100"}/>
                </div>
                <div className="col-6">
                    <h1>{scenario.title}</h1>
                    <p>{scenario.description}</p>
                    <h2>Цена: {scenario.price} руб.</h2>
                </div>
            </div>
            <ul className="row list-group list-group-horizontal mb-2">
                <li className="col-4 list-group-item text-center">
                    <i className="far fa-clock " style={{fontSize: "1.5em"}}/><tr/>
                    {scenario.min_duration_minutes}-{scenario.max_duration_minutes} минут
                </li>
                <li className="col-4 list-group-item text-center">
                    <i className="fas fa-users" style={{fontSize: "1.5em"}}/><tr/>
                    {scenario.actors_number} актёров
                </li>
                <li className="col-4 list-group-item text-center">
                    <i className="fas fa-bullseye" style={{fontSize: "1.5em"}}/><tr/>
                    Целевая аудитория: {scenario.target_audience}
                </li>
            </ul>
            <div className="row">
                <div className="alert alert-info" role="alert">
                    <i>Дорогие друзья! Те, кого заинтересовал данный сценарий, могут получить его полную версию, с
                        авторскими минусами песен и презентациями, если напишут мне на электронный адрес:
                        andrew.gurkov@yandex.ru
                        Невысокая цена – скромная благодарность автору за его труд.
                        По времени сценарий рассчитан на сорок пять минут. Вы можете использовать его как театрализацию
                        к
                        праздничному концерту.
                        С уважением автор. А Гурков.</i>
                </div>
            </div>
            <div className="row">
                <h2 className={"display-inline mr-3 mb-3"}>Демо-фрагмент</h2>
                <button type="button" className="btn btn-info mt-1 mb-3" data-toggle="collapse"
                        data-target="#demo" onClick={(e) => this.setState({demo_open: !this.state.demo_open})}>
                    {this.state.demo_open ? "Скрыть" : "Раскрыть"}
                </button>
                <br/>
                <hr/>
                <p className="collapse" id="demo" style={{whiteSpace: "pre-wrap"}}>{scenario.demo}</p>
            </div>
        </div> : <div className="spinner-border text-info mx-auto mt-3" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
        return (
            <div className="row">{content}</div>
        );
    }
}

export default ScenarioPage;