import React from 'react';

export default function Team({ team, name, title, description }) {

  const teamItems = team.map((team) =>
    <div key={team.id} className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
      <div className="box-team wow bounceInUp" data-wow-delay={team.delay}>
        <img src={"img/team/"+team.id+".jpg"} alt="" className="img-circle img-responsive" />
        <h4>{team.title}</h4>
        <p>{team.description}</p>
      </div>
    </div>
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
          { teamItems }
        </div>
      </div>
    </section>
  );
}
