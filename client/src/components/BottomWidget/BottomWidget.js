import React from 'react';
import Parser from 'html-react-parser';

export default function BottomWidget({ bottomWidget, socialMedia }) {

  const widgetItems = bottomWidget.map((widget) =>
    <div key={widget.id} className="col-md-4">
      <div className="contact-widget wow bounceInLeft">
        <i className="fa fa-map-marker fa-4x"></i>
        <h5>{widget.title}</h5>
        <p>{Parser(widget.description)}</p>
      </div>
    </div>
  );

  const socialmediaItems = socialMedia.map((sm) =>
    <li key={sm.id}>
      <a href={sm.link}>
        <span className="fa-stack fa-2x">
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className={"fa fa-"+sm.icon+" fa-stack-1x fa-inverse"}></i>
        </span>
      </a>
    </li>
  );

  return(
    <section id="bottom-widget" className="home-section bg-white">
      <div className="container">
        <div className="row">{ widgetItems }</div>
        <div className="row mar-top30">
          <div className="col-md-12">
            <h5>We're on social networks</h5>
            <ul className="social-network">{ socialmediaItems }</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
