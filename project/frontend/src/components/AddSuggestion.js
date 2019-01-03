import React from "react";
import { connect } from 'react-redux';
import { addSuggestion } from '../actions'


class AddSuggestion extends React.Component {
  state = {
    url : "",
    urlIncorrect : false
  };

  onChange = (e) => {
    const url = e.target.value;
    if (this.validateUrl(url)){
      this.setState({urlIncorrect: false});
    } else {
      this.setState({urlIncorrect: true});
    }
    this.setState({url: e.target.value});
  };

  validateUrl = (value) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }

  render() {
    return (
      <section className="container">
        <div className="box content">
          <h2>Add Suggestion</h2>

          {/* <div className="control">
            <input className="input" type="text" placeholder="Text input" value={this.state.url} onChange={this.onChange}/>
          </div> */}

          <div className="field">
            <label className="label">Suggestion url</label>
            <div className="control">
              <input className={ this.state.urlIncorrect ? "input is-danger" : "input" } type="text" placeholder="Suggest url" value={this.state.url} onChange={this.onChange} />
              <span className="icon is-small is-left">
                <i className="fas fa-link"></i>
              </span>
              { this.state.urlIncorrect ? <span id="incorrect_icon" className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
                </span> : null }
              
            </div>
            { this.state.urlIncorrect ? <p id="incorrect_text" className="help is-danger">Url is not correct</p> : null }
            
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={(e) =>{e.preventDefault(); this.props.addSuggestion(this.state.url)} }>Submit</button>
            </div>
          </div>



        </div>
      </section>



    );
  }

}

const mapStateToProps = (state) => {
  return {
    addSuggestion: state.addSuggestion,
  };
};

//export default AddSuggestion;
export default connect(mapStateToProps, { addSuggestion })(AddSuggestion);