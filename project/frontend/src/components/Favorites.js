import React from "react";
import { connect } from 'react-redux';
import { getFavorites } from '../actions'
import { Link } from 'react-router-dom';



class Favorites extends React.Component {
  componentDidMount(){
    this.props.getFavorites();
  }

  render() {
    console.log(this.props.favorites);
    return (
      <section className="container">
      <div className="box content">
      {this.props.favorites.map((item, i) =>
        <article className="post" key={i}>
          <h4><Link to={"/items/"+item.suggestion.id} >{item.suggestion.title}</Link></h4>
          <div className="media">
            <div className="media-left">
              <p className="image is-128x128">
                <img src="http://bulma.io/images/placeholders/128x128.png"/>
              </p>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                {item.suggestion.link}<br/>
                <Link to={"/items/"+item.suggestion.id} >{item.description}</Link>
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
    favorites: state.favorites,
  };
};


// export default Favorites;
export default connect(mapStateToProps, { getFavorites })(Favorites);