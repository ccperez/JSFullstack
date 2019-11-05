import React from 'react';

export default function Parallax2({ parallax2 }) {

  const parallax2Items = parallax2.map((parallax2) =>
    <li key={parallax2.id} className="wow fadeInDown" data-wow-delay={parallax2.delay}>
      <a href={parallax2.link}>
        <img src={"img/clients/"+parallax2.id+".png"} alt="" />
      </a>
    </li>
  );

  return(
    <section id="parallax2" className="home-section parallax" data-stellar-background-ratio="0.5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ul className="clients">
              { parallax2Items }
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
