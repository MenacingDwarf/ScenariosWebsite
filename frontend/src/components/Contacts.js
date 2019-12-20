import React, {Component} from 'react';

class Contacts extends Component {
    componentDidMount() {
        document.title = "Контакты"
    }
    render() {
        return (
            <div>
                <h1>Контакты</h1>
                <p><b>Контактные данные</b> – Адрес: г.Ростов-на-Дону. тел: 89613329649</p>
                <p>По поводу приобретения готовых сценариев и заказа уникальных сценариев обращаться на электронную
                    почту gurkov65@mail.ru </p>
                <p>Объем работы и оплата по договоренности.</p>
                <p>Моя страница в Контакте: <a href={"https://vk.com/id4152408"}>https://vk.com/id4152408</a></p>
                <p>С уважением, Гурков Андрей Николаевич</p>
            </div>
        );
    }
}

export default Contacts;