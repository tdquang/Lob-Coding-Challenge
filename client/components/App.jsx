var React = require('react');
var PropTypes = React.PropTypes;
var InputForm = require('./InputForm')
var OutputModal = require('./OutputModal');

var App = React.createClass({
  displayOutput: function(output, error){
    if (!error)
      this.refs.outputModal.displayLink(output);
    else
      this.refs.outputModal.displayError(error);
  },
  render: function() {
    return (
      <div id="root">
        <InputForm submitHandler={this.displayOutput}/>
        <OutputModal ref="outputModal"/>
      </div>
    );
  }

});

module.exports = App;
