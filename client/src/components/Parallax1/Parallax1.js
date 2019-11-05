import React from 'react';

export default function Parallax1({ parallax1 }) {

  return(
    <section id="parallax1" className="home-section parallax" data-stellar-background-ratio="0.5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="color-light">
              <h2 className="wow bounceInDown" data-wow-delay="0.5s">{ parallax1[0].title }</h2>
              <p className="lead wow bounceInUp" data-wow-delay="1s">{ parallax1[0].description }</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}
