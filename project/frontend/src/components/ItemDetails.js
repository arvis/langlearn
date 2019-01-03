import React from 'react';
import { connect } from 'react-redux';
import { getSuggestion } from '../actions';
import { Link } from 'react-router-dom';


class ItemDetails extends React.Component {


  componentDidMount() {
    const { params } = this.props.match;
    console.log("componentDidMount");
    this.props.getSuggestion(params.pageId);
    this.itemId=params.id;
  }

  render() {
    if (!this.props.suggestion || !this.props.suggestion.link){
      return <div>Something wrong with request, please report to support</div>;
    }
    const  suggestion  = this.props.suggestion;

    return (
      <div className="container" key={this.itemId}>
        <div className="box message-preview" key={this.itemId}>
          <div className="address">
            <div className="name"> <a href={suggestion.link} target="_blank">{suggestion.title}</a></div>
          </div>
          <div className="content">
            <p>{suggestion.description}</p>
            Others: <Link to={"/items/2"} >Other</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    suggestion: state.suggestion
  };
};

//export default ItemDetails;
export default connect(mapStateToProps, { getSuggestion })(ItemDetails);