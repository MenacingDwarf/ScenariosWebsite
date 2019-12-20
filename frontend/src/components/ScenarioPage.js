import React, {Component} from 'react';

class ScenarioPage extends Component {
    state = {
        scenario: ""
    };

    getScenario() {
        const { scenario_id } = this.props.match.params;
        fetch(`/api/scenarios/?scenario_id=${scenario_id.toString()}`)
            .then(response => response.json())
            .then(result => this.setState({scenario: result.data}))
    }

    componentDidMount () {
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
                <p>{scenario.demo}</p>
            </div>
        );
    }
}

export default ScenarioPage;