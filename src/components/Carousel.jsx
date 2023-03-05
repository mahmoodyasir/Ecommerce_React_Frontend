import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselBar = () => {
    return (
        <div className="carousel-height">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded-3"
                        src="https://i.ibb.co/fYL6k2j/rsz-11inkedcarousel-samsung.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded-3"
                        src="https://i.ibb.co/GpHzTgf/rsz-1xiaomi-1.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded-3"
                        src="https://i.ibb.co/S66rVHY/i-Phone14-Pro-Launch-Meta-Image-EN.png"
                        alt="Third slide"
                    />

                    {/*<Carousel.Caption>*/}
                    {/*    <h3>Third slide label</h3>*/}
                    {/*    <p>*/}
                    {/*        Praesent commodo cursus magna, vel scelerisque nisl consectetur.*/}
                    {/*    </p>*/}
                    {/*</Carousel.Caption>*/}
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default CarouselBar;
