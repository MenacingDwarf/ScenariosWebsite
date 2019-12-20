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
                <img src={scenario.image} alt="image"/>
                <h1>{scenario.title}</h1>
                <p>{scenario.description}</p>
                <hr/>
                <h2>Демо-фрагмент</h2>
                <p style={{whiteSpace: "pre-wrap"}}>{scenario.demo}</p>
                <hr/>
                <p><i>Дорогие друзья! Те, кого заинтересовал данный сценарий, могут получить его полную версию, с
                    авторскими минусами песен и презентациями, если напишут мне на электронный адрес:
                    andrew.gurkov@yandex.ru
                    Невысокая цена – скромная благодарность автору за его труд.
                    По времени сценарий рассчитан на сорок пять минут. Вы можете использовать его как театрализацию к
                    праздничному концерту.
                    С уважением автор. А Гурков.</i></p>
            </div>
        );
    }
}

export default ScenarioPage;