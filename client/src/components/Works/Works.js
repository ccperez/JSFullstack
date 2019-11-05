import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Works extends React.Component {

  state = { li_idWork: 0 }

  render() {
    const { li_idWork } = this.state;
    const { name, title, description, works, auth } = this.props;
    const { isAuthenticated } = auth;

    const workItems = works.map((work) =>
      <li key = { work.id } className = { (li_idWork === work.id) ? "og-expanded" : "" }
      style={(li_idWork===work.id) ? {transition:"height 350ms ease 0s", height:"760px"} : {}} >
        <button onClick={()=>{this.setState({li_idWork: work.id})}} data-largesrc={"img/works/"+work.id+".jpg"} data-title={work.title} data-description={work.description}>
          <img src={"img/works/thumbs/"+work.id+".jpg"} alt="" />
        </button>
        {
          (li_idWork === work.id) &&
          <div className="og-expander" style={{ transition: "height 350ms ease 0s", height: "500px" }}>
          		<div className="og-expander-inner">
          			<span className="og-close" onClick={() => { this.setState({ li_idWork: 0 }) } }>
                </span>
          			<div className="og-fullimg">
          				<div className="og-loading"></div>
          				<img src={"img/works/thumbs/"+work.id+".jpg"} alt="" />
          			</div>
                <div className="og-details">
          				<h4>{isAuthenticated ? work.title : 'Authentication' }</h4>
          				<p>{ isAuthenticated ? work.description : 'Need to register and login to see the detail' }</p>
                  { isAuthenticated && (<button className="btn btn-theme" href="#">External link</button> )}
          			</div>
          		</div>
          </div>
        }
      </li>
    );

    return(
      <section id={ name } className="home-section bg-gray">
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
          <div className="row">
            <div className="col-lg-12">
              <ul id="og-grid" className="og-grid">
                { workItems }
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Works.propTypes = { auth: PropTypes.object.isRequired }

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, {})(Works)
