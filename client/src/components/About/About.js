import React from 'react';

export default function About({about, name, title, description}) {

  const aboutItems = about.map((about) =>
    <div key={about.id} className="row wow fadeInUp">
      <div className="col-md-6 about-img">
        <img src={"img/"+about.image+".jpg"} alt=""/>
      </div>
      <div className="col-md-6 content">
        <h2>{about.name}</h2>
        <h3>{about.title}</h3>
        <p>{about.description}</p>
      </div>
    </div>
  );

  return(
    <section id={name} className="home-section bg-white">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <div className="section-heading">
              <h2>{title}</h2>
              <div className="heading-line"></div>
              <p>{description}</p>
            </div>
          </div>
        </div>
        {aboutItems}
      </div>
    </section>
  );
}
