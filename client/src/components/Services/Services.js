import React from 'react';

export default function Services({ services, name, title, description }) {

  const serviceItems = services.map((service) =>
    <div key={service.id} className={"item" + (service.active ? " active" : "")}>
      <div className="row">
        <div className="col-sm-12 col-md-offset-1 col-md-6">
          <div className="wow bounceInLeft">
            <h4>{ service.title }</h4>
            <p>{ service.description }</p>
          </div>
        </div>
        <div className="col-sm-12 col-md-5">
          <div className="screenshot wow bounceInRight">
            <img src={"img/screenshots/"+service.id+".png"} className="img-responsive" alt="" />
          </div>
        </div>
      </div>
    </div>
  );

  const indicators = services.map((v, i) =>
    <li key={i} data-target="#carousel-service" data-slide-to={i} className={i>0 ? "" : "active"}></li>
  );

  return(
    <section id={ name } className="home-section bg-white">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <div className="section-heading">
              <h2>{ title }</h2>
              <div className="heading-line"></div>
              <p>{ description }</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div id="carousel-service" className="service carousel slide">
              {/* slides */}
              <div className="carousel-inner">{ serviceItems }</div>
              {/* Indicators */}
              <ol className="carousel-indicators">{ indicators }</ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
