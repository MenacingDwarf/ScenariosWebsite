import React, {Component} from 'react';
import Loader from "./Loader";

class MainPage extends Component {
    state = {
        categories: null
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

    componentDidMount() {
        this.props.setActiveLink(1);
        document.title = "Главная";
        this.getCategories();
    }

    render() {
        let content = this.state.categories === null ? <Loader/> :
            <div>
                <h1>Добро пожаловать на мой сайт!</h1>
                <div className="row">
                    <div className="col-12 col-lg-6 col-xl-4">
                        <img className={"w-100"} src={"/media/images/logo.png"} alt={"logo"}/>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-8">
                        <p>Уважаемые учителя! Классные руководители! Преподаватели дополнительного образования!
                            Режиссеры
                            детских театров-студий, директора СДК, ЦДК и РДК. На моем сайте, вы найдете сценарии для
                            школьных праздничных постановок, для постановок праздничных програм в Домах Культуры.
                            Сценарии к
                            Праздникам: 1 сентября, к Дню Учителя, к Новому году, 23 февраля и к другим праздникам. По
                            времени сценарии рассчитаны на 45-60 минут. Также предоставляются минусы (в некоторых
                            случаях и
                            +) к авторским песням в сценариях, заставки для экрана. Здесь опубликованы авторские
                            сценарии
                            для праздников в школе и сценарии спектаклей, по популярным сказкам знаменитых сказочников
                            мира
                            для детских театральных коллективов. Также, зд есь вы найдете сценарии ведения праздничных
                            програм в Домах Культуры.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3>Немного обо мне</h3>
                        <p>
                            <img
                                src="/media/images/gurkov_photo.jpg"
                                alt="" className={"left-foto"}/>

                            Гурков Андрей Николаевич 1965 года рождения. Род деятельности – Режиссура, написание
                            сценариев
                            для спектаклей, концертов, развлекательных мероприятий, фестивалей. Постановка городских
                            праздников. Закончил в 1991 году московский театральный институт ГИТИС. Государственный
                            ордена
                            трудового Красного Знамени и ордена Дружбы народов институт театрального искусства им. А.В.
                            Луначарского окончил полный курс названого института по специальности — Режиссура. С 2006
                            года
                            действительный член РАО. (Российское авторское общество).
                        </p>
                    </div>


                </div>
            </div>;
        return (
            <div className={"row"}>
                {content}
            </div>
        );
    }
}

export default MainPage;