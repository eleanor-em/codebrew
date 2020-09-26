/* Purpose: Renders the landing page for first-time users */

import React, { Component } from 'react';
import '../static/sass/pages/landing.scss';

class Landing extends Component {

    render() {
        return (

            <div>
                <div class="banner-section">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-1">
                                <img src="/images/logo.png" alt="logo"  width="100px" height="100px"></img>
                            </div>
                        </div>

                        <div class="row justify-content-center">
                            <h1 className="title">Life is About Family</h1>
                        </div>
                        <div class="row justify-content-center">
                            <h3 className="slogan">Bridge is the way to connect with your family</h3>
                        </div>


                    </div>

                </div>

                <div class="about-us-section">
                    <div class="container">
                        <div class="row align-items-center justify-content-center">
                            <h3 className="section-title">About Us</h3>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-sm-4 family-img row justify-content-center pr-0">
                                <img src="./images/Happy-Family.png" alt="Happy Family" width="250px"></img>
                            </div>
                            <div class="col-sm-8 us-info">
                                <div class="row justify-content-center">
                                    <p className="normal-text">
                                        Internet is being invented to shorten the distance across people, but sometimes 
                                        the distance is actually longer. As a group of young people, we are keen to use 
                                        the technology to bring families closer in the scale of time. By sharing, viewing 
                                        and commenting artifacts that have carried memories about our families, everyone 
                                        in the families can get closer.
                                     </p>
                                </div>
                                <div class="row justify-content-end">
                                    <a href="/authentication" className="join-us">JOIN US</a>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>

                <div class="features-section">
                    <div class="features-container">
                        <div class="row align-items-center justify-content-center">
                            <h3 className="section-title">Our Features</h3>
                        </div>
                        <div className="normal-text row features justify-content-center">
                            <div className="column">
                                <img className="features-images" src="/images/historical_memory.jpg" alt="logo" width="100%"></img>
                                <p className="row justify-content-center">Record Historical Memories</p>
                            </div>
                            <div class="column">
                                <img className="features-images" src="/images/whole_family.jpg" alt="logo" width="100%"></img>
                                <p className=" row justify-content-center">Decrease Distance With Families</p>
                            </div>
                            <div class="column">
                                <img className="features-images" src="/images/share.jpg" alt="logo" width="100%"></img>
                                <p className="row justify-content-center">Share Memoriable Moments</p>
                            </div>
                        </div>

                    </div>

                </div>






                {/* <div className="third-section">
                    <div className="container">
                        <div className="row align-items-center justify-content-center ">
                            <p>Team Bridge</p>
                        </div>
                    </div>
                </div> */}
            </div>



        );
    }
}

export default Landing;
