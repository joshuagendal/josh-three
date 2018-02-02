import React, {Component,PropTypes} from 'react'
import {Link} from 'react-router'
import Config from   '../config/app';
var request = require('superagent');
import NavBar from '../components/NavBar'

class App extends Component {

	constructor(props) {
	    super(props);
	    this.state = {value: '',status:'',title:''};

	    this.handleChange = this.handleChange.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
	    this.handleSubmitFirebase = this.handleSubmitFirebase.bind(this);
        this.handleSubmitOneSignal = this.handleSubmitOneSignal.bind(this);
	    this.sendCallback = this.sendCallback.bind(this);
        this.displayTitle=this.displayTitle.bind(this);
	 }

	handleChange(event) {
		this.setState({value: event.target.value});
	}

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }

	sendCallback(e,r){
		console.log(r);
    	console.log(e);
		this.setState({
            title:"",
			value:"",
			status:": SEND"
		})
	}

	handleSubmitFirebase(event) {
		//alert('A push was submitted: ' + this.state.value);
		event.preventDefault();

		var url='https://fcm.googleapis.com/fcm/send';
		var json = '{"to":"'+Config.pushSettings.pushTopic+'","notification": {"body":"'+this.state.value+'",},"priority":10,}';
		request.post(url)
    		.set('Content-Type', 'application/json')
    		.set('Authorization', 'key='+Config.pushSettings.Firebase_AuthorizationPushKey)
    		.send(json)
    		.end(this.sendCallback)
	}


    handleSubmitOneSignal(event) {
        //alert('A push was submitted: ' + this.state.value);
        event.preventDefault();

        var url='https://onesignal.com/api/v1/notifications';
        var json = {
          "app_id":Config.pushSettings.oneSignal_APP_KEY,
          "included_segments":Config.pushSettings.included_segments,
          "headings":{"en": this.state.title},
          "contents":{"en": this.state.value}
        }

        request.post(url)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic '+Config.pushSettings.oneSignal_REST_API_KEY)
            .send(json)
            .end(this.sendCallback)
    }

    displayTitle(){
        if(Config.pushSettings.pushType!="firebase"){
                            return (<div className="form-group label-floating is-empty">
                                <label className="control-label">Message title</label>
                                <input type="text" className="form-control" value={this.state.title} onChange={this.handleChangeTitle} />
                            <span className="material-input"></span></div>)}else{ return (<div></div>)}
    }





  render() {
    return (
			<div className="content">
			<NavBar></NavBar>
      <div className="row">
      	<div className="col-md-6">
            <div className="card">
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">mail_outline</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">Send push notification with {Config.pushSettings.pushType=="firebase"?"Firebse":"OneSignal"} {this.state.status}</h4>
                    <form onSubmit={Config.pushSettings.pushType=="firebase"?this.handleSubmitFirebase:this.handleSubmitOneSignal}>
                        <div className="form-group label-floating is-empty">
                            <label className="control-label">Message text</label>
                            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
                        <span className="material-input"></span></div>
                        {this.displayTitle()}

                        <button type="submit" className="btn btn-fill btn-rose">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="card">
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">smartphone</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">Preview</h4>
                    <div className="iphone">
                    	<img className="iphoneImg" src="iphone.png" alt="" />
      					<span className="pushText">{this.state.title}  {Config.pushSettings.pushType=="firebase"?"":<br />} {this.state.value}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
			</div>
    )
  }
}
export default App;
