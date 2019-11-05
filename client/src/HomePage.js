import React from 'react';

import Navigation   from './components/Navigation';
import Intro        from './components/Intro';
import About        from './components/About';
import Parallax1    from './components/Parallax1';
import Services     from './components/Services';
import Works        from './components/Works';
import Parallax2    from './components/Parallax2';
import Team         from './components/Team';
import Contact      from './components/Contact';
import BottomWidget from './components/BottomWidget';
import Footer       from './components/Footer';

export default class HomePage extends React.Component {

  state = { error: null, isLoaded: false, items: [] }

  componentDidMount() {
    fetch("./items.json").then(res => res.json()).then(
      (result) => this.setState({ isLoaded: true, items: result }),
      (error)  => this.setState({ isLoaded: true, error })
    )
  }

  render() {
    const { error, isLoaded, items } = this.state;

    return (
      <div className="App">
        { error ? (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Ooops!</strong> Error: {error.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : (
          !isLoaded ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div>
              <Navigation
                navMenu      = { items.navMenu }
              />
              <Intro
                slide        = { items.slide }
              />
              <About
                name         = { items.navMenu[0].name }
                title        = { items.navMenu[0].title }
                description  = { items.navMenu[0].description }
                about        = { items.about }
              />
              <Parallax1
                parallax1    = { items.parallax1 }
              />
              <Services
                name         = { items.navMenu[1].name }
                title        = { items.navMenu[1].title }
                description  = { items.navMenu[1].description }
                services     = { items.services }
              />
              <Works
                name         = { items.navMenu[2].name }
                title        = { items.navMenu[2].title }
                description  = { items.navMenu[2].description }
                works        = { items.works }
              />
              <Parallax2
                parallax2    = { items.parallax2 }
              />
              <Team
                name         = { items.navMenu[3].name }
                title        = { items.navMenu[3].title }
                description  = { items.navMenu[3].description }
                team         = { items.team }
              />
              <Contact
                name         = { items.navMenu[4].name }
                title        = { items.navMenu[4].title }
                description  = { items.navMenu[4].description }
                contact      = { items.contact }
              />
              <BottomWidget
                bottomWidget = { items.bottomWidget }
                socialMedia  = { items.socialMedia }
              />
              <Footer />
              <a href="#" className="back-to-top">
                <i className="fa fa-chevron-up"></i>
              </a>
            </div>
          )
        )}
      </div>
    );

  }
}
