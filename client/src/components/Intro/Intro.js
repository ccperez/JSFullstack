import React from 'react';

export default function Intro({ slide }) {

  const slideItems = slide.map((slide) =>
    <div key={slide.id} className={"item"+(slide.active ? " active" : "")}>
      <div className="carousel-background"><img src={"img/intro/"+slide.id+".jpg"} alt=""/></div>
      <div className="carousel-container">
        <div className="carousel-content">
          <h2 className="animated fadeInDown">{slide.title}</h2>
          <p className="animated fadeInUp">{slide.description}</p>
          <a href="#about" className="btn-get-started animated fadeInUp">Read More</a>
        </div>
      </div>
    </div>
  );

  const carouselControl = (ctrl) => (
    <a className={"carousel-control-"+ctrl} href="#introCarousel" role="button" data-slide={ctrl}>
      <span className={"carousel-control-"+ctrl+"-icon fa fa-angle-"+(ctrl==="prev" ? "left" : "right")} aria-hidden="true"></span>
      <span className="sr-only">{ctrl==="prev" ? "Previous" : "Next"}</span>
    </a>
  );

  return(
    <section id="intro">
      <div className="intro-container">
        <div id="introCarousel" className="carousel slide carousel-fade" data-ride="carousel">
          <div className="carousel-inner" role="listbox">{ slideItems }</div>
          { carouselControl("prev") } { carouselControl("next") }
        </div>
      </div>
    </section>
  );
}
