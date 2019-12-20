import React, {Component} from 'react';

class ScenarioPage extends Component {
    state = {
        scenario: {
            title: "",
        }
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
        return (
            <div>
                <div className="row mb-2">
                    <div className="col-6">
                        <img src={scenario.image} alt="image" className={"rounded w-100"}/>
                    </div>
                    <div className="col-6">
                        <h1>{scenario.title}</h1>
                        <p>{scenario.description}</p>
                    </div>
                </div>
                <p><i>Дорогие друзья! Те, кого заинтересовал данный сценарий, могут получить его полную версию, с
                        авторскими минусами песен и презентациями, если напишут мне на электронный адрес:
                        andrew.gurkov@yandex.ru
                        Невысокая цена – скромная благодарность автору за его труд.
                        По времени сценарий рассчитан на сорок пять минут. Вы можете использовать его как театрализацию
                        к
                        праздничному концерту.
                        С уважением автор. А Гурков.</i></p>
                <div className="row">
                    <h2 className={"display-inline mr-3 mb-3"}>Демо-фрагмент</h2>
                    <button type="button" className="btn btn-info mt-1 mb-3" data-toggle="collapse"
                            data-target="#demo">Раскрыть
                    </button>
                    <br/>
                    <hr/>
                    <p className="collapse" id="demo" style={{whiteSpace: "pre-wrap"}}>{scenario.demo}</p>
                </div>
            </div>
        );
    }
}

export default ScenarioPage;