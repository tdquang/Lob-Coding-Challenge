var React = require('react');
var PropTypes = React.PropTypes;

var OutputModal = React.createClass({
  getInitialState: function() {
    return {
      text: "",
      display: false,
      error: false
    }
  },
  displayLink: function(link) {
    this.setState({
      text: "<h2>Here is the link to your letter: </h2><p>" + link + "</p>",
      display: true
    });
  },
  displayError: function(error) {
    this.setState({
      text: "<h2>Sorry, there seems to be an error: </h2><p>" + error + "</p>",
      display: true
    });
  },
  hideModal: function() {
    this.setState({text: "", display: false});
  },
  render: function() {
    if (this.state.display){
      return (
        <div id="myModal" ref="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.hideModal}>×</span>
            <div dangerouslySetInnerHTML={{__html: this.state.text}}/>
          </div>
        </div>
      );
    }
    else{
      return null;
    }
  }

});

module.exports = OutputModal;
