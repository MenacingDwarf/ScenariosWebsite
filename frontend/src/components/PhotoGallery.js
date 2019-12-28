import React, {Component} from 'react';
import Photo from "./Photo";

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
        this.getPhotos();
    }

    render() {
        return (
            <div className={"row"}>
                {this.state.photos ? <div className="row">
                        {this.state.photos.map((photo, index) => {
                            return <div className="col-6 col-lg-4 col-xl-3 mb-2" key={index}>
                                <Photo photo={photo.image} index={index}/>
                            </div>
                        })}
                    </div> : <div className="spinner-border text-info mx-auto mt-3" role="status">
                    <span className="sr-only">Loading...</span>
                </div>}

            </div>
        );
    }
}

export default PhotoGallery;