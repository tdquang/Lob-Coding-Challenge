var React = require('react');
var PropTypes = React.PropTypes;
var APIUtils = require('./../controller/api_utils');


var InputForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    let senderInfo = {
      "name": this.refs.name.value,
      "address1": this.refs.address1.value,
      "address2": this.refs.address2.value,
      "city": this.refs.city.value,
      "state": this.refs.state.value,
      "zipcode": this.refs.zipcode.value,
      "message": this.refs.message.value
    }
    APIUtils.sendLetter(senderInfo, this.props.submitHandler);
  },
  render: function() {
    return (
      <div className="fs-form-wrap" id="fs-form-wrap">
				<div className="fs-title">
					<h1>Lob Coding Challenge</h1>
				</div>
				<form id="myform" action="/send" className="fs-form fs-form-full" autoComplete="off" onSubmit={this.handleSubmit}>
					<ol className="fs-fields">
						<li>
							<label className="fs-field-label fs-anim-upper" htmlFor="q1">Please input your name.</label>
							<input className="fs-anim-lower" id="q1" ref="name" type="text" placeholder="Joe Schmoe" required/>
						</li>
						<li>
							<label className="fs-field-label fs-anim-upper" htmlFor="q2">Your address line 1.</label>
							<input className="fs-anim-lower" id="q2" ref="address1" type="text" placeholder="185 Berry Street" required/>
						</li>
            <li>
							<label className="fs-field-label fs-anim-upper" htmlFor="q3">Your address line 2.</label>
							<input className="fs-anim-lower" id="q3" ref="address2" type="text" placeholder="Suite 170" required/>
						</li>
            <li>
							<label className="fs-field-label fs-anim-upper" htmlFor="q4">Your city.</label>
							<input className="fs-anim-lower" id="q4" ref="city" type="text" placeholder="San Francisco" required/>
						</li>
            <li>
							<label className="fs-field-label fs-anim-upper" htmlFor="q5">Your state.</label>
							<input className="fs-anim-lower" id="q5" ref="state" type="text" placeholder="CA" required/>
						</li>
            <li>
							<label className="fs-field-label fs-anim-upper" htmlFor="q6">Your zipcode.</label>
							<input className="fs-anim-lower" id="q6" ref="zipcode" type="text" placeholder="94107" required/>
						</li>
						<li>
							<label className="fs-field-label fs-anim-upper" htmlFor="q7">Your message to the governor.</label>
							<textarea className="fs-anim-lower" id="q7" ref="message" placeholder="Message here"></textarea>
						</li>
					</ol>
					<button className="fs-submit" type="submit">Send letter</button>
				</form>
			</div>
    );
  }

});

module.exports = InputForm;
