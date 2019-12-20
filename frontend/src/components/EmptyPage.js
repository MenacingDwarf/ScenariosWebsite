import React, {Component} from 'react';

class EmptyPage extends Component {
    componentDidMount() {
        document.title = "Пустая страница"
    }
    render() {
        return (
            <div>
                <h1>Ждите обновление в ближайшее время!</h1>
            </div>
        );
    }
}

export default EmptyPage;