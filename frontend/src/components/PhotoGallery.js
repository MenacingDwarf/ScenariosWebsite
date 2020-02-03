import React, {Component} from 'react';
import Photo from "./Photo";
import Loader from "./Loader";

class PhotoGallery extends Component {
    state = {
        photos: null
    };

    getPhotos() {
        fetch(`/api/photos`)
            .then(response => response.json())
            .then(result => {
                this.setState({photos: result.data});
            })
    }

    componentDidMount() {
        document.title = "Фотогалерея";
        this.props.setActiveLink(3);
        this.getPhotos();
    }

    render() {
        return (
            <div className={"row"}>
                {this.state.photos ? <div className="row">
                        {this.state.photos.map((photo, index) => {
                            return <div className="col-6 col-lg-4 col-xl-3 mb-2" key={index}>
                                <Photo photo={photo} index={index}/>
                            </div>
                        })}
                    </div> : <Loader/>}

            </div>
        );
    }
}

export default PhotoGallery;