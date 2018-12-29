import React from "react";
import { connect } from 'react-redux';

import { getSuggestions } from '../actions'


class Suggestions extends React.Component {
  componentDidMount(){
    this.props.getSuggestions();
  }

  render() {
    return (
      <section className="container">
      <div className="box content">
      {this.props.suggestions.map((item, i) =>
        <article className="post" key={i}>
          <h4>{item.title}</h4>
          <div className="media">
            <div className="media-left">
              <p className="image is-128x128">
                <img src="http://bulma.io/images/placeholders/128x128.png"/>
              </p>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                {item.link}<br/>
                  {item.description}
                </p>
              </div>
            </div>

            <div className="media-right">
              <span className="has-text-grey-light"><i className="fa fa-comments"></i></span>
            </div>

          </div>
        
        </article>
      )}
      </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    suggestions: state.suggestions,
    showModal: state.showModal
  };
};


//export default connect(mapStateToProps,{getSuggestions,toggleModal})(MainArea);
export default connect(mapStateToProps, { getSuggestions })(Suggestions);