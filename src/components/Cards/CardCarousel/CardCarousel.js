import React, {Component} from 'react';
import styles from './CardCarousel.module.scss';
import connect from "react-redux/es/connect/connect";
import {handleCardName, removeCardImage,} from "../../../store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class CardCarousel extends Component {
    state = {
        currentSlide: 0,
        slideNumbers: []
    };

    componentDidMount() {
        this.initializeCarouselData();
    }

    initializeCarouselData = () => {
        let newCurrentSlide = this.state.currentSlide;
        let possibleSlides = [];

        if (this.props.cardModal.data.images !== undefined) {
            newCurrentSlide = this.props.cardModal.data.images[0].id;

            this.props.cardModal.data.images.map(slide => {
                return possibleSlides.push(slide.id);
            });

            this.setState({
                currentSlide: newCurrentSlide,
                slideNumbers: possibleSlides
            });
        }
    };

    changeSlideTo = (num) => {
        let newSlide = this.state.currentSlide;

        newSlide = num;

        this.setState({currentSlide: newSlide});
    };

    prevSlide = () => {
        let newCurrentSlide = this.state.currentSlide;
        let possibleSlides = this.state.slideNumbers;

        let index = possibleSlides.indexOf(newCurrentSlide);

        if (index === 0) {
            newCurrentSlide = possibleSlides[possibleSlides.length - 1];
        } else {
            newCurrentSlide = possibleSlides[index - 1];
        }

        this.setState({currentSlide: newCurrentSlide});
    };

    nextSlide = () => {
        let newCurrentSlide = this.state.currentSlide;
        let possibleSlides = this.state.slideNumbers;

        let index = possibleSlides.indexOf(newCurrentSlide);

        if (index === possibleSlides.length - 1) {
            newCurrentSlide = possibleSlides[0];
        } else {
            newCurrentSlide = possibleSlides[index + 1];
        }

        this.setState({currentSlide: newCurrentSlide});
    };

    handleSlideRemove = (id) => {
        if (window.confirm("Are you sure you want to delete this slide? It can't be undone!")) {
            this.props.removeCardImage(id);
        }
    };

    render() {
        return (
            <div className={styles["card-carousel"]}>
                {/*Arrows*/}
                <div
                    className={[styles["card-c-arrow"], styles["card-c-left"]].join(' ')}
                    onClick={this.prevSlide}><span>&lt;</span></div>
                <div className={[styles["card-c-arrow"], styles["card-c-right"]].join(' ')}
                     onClick={this.nextSlide}><span>&gt;</span></div>

                {/*Slides*/}
                {this.props.cardModal.data.images !== undefined ? (
                    <React.Fragment>
                        {this.props.cardModal.data.images.map(slide => (
                            <div key={slide.id} className={[styles["card-carousel-item"],
                                this.state.currentSlide === slide.id ? styles["card-carousel-item-selected"] : null
                            ].join(' ')}>
                                <div onClick={() => this.handleSlideRemove(slide.id)}>
                                    <FontAwesomeIcon icon='trash-alt' size='1x'/>
                                </div>
                                <img src={slide.data} alt={slide.name}/>
                            </div>
                        ))}
                    </React.Fragment>
                ) : null}

                {/*Dots*/}
                {this.props.cardModal.data.images !== undefined ? (
                    <div className={styles["card-carousel-dots"]}>
                        {this.props.cardModal.data.images.map(slide => (
                            <span key={slide.id}
                                  className={this.state.currentSlide === slide.id ? styles["card-c-dot-selected"] : null}
                                  onClick={() => this.changeSlideTo(slide.id)}><p>slide.id</p></span>
                        ))}
                    </div>
                ) : null}
            </div>
        );
    }
}

const stateToProps = state => {
    return {
        singleBoard: state.singleBoard,
        cardModal: state.cardModal,
    }
};

const dispatchToProps = dispatch => {
    return {
        handleCardName: (name) => dispatch(handleCardName(name)),
        removeCardImage: (id) => dispatch(removeCardImage(id)),
    }
};

export default connect(stateToProps, dispatchToProps)(CardCarousel);