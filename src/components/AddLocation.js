import React, { Component, PropTypes } from 'react'

// material-ui
// import Paper from 'material-ui/Paper';
import style from '../css/main.css';

class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleInput  = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleInput(e) {
    this.setState({name: e.target.value.substr(0, 25)});
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.name.trim()) {
      this.props.actions.addLocation(this.state.name)
      this.setState({name: ''})
    }
  }
  render() {
    return (
      <form className='container' onSubmit={this.handleSubmit}>
        <input className='input__text--s' type='text' placeholder='Название вашего города...' 
          onChange={this.handleInput}
          value={this.state.name}  />
        <input className='input__button--s' type='submit' value='отправить' />{' '}
        <input className='input__button--s' type='button' value='геоданные'
          onClick={this.props.actions.findUserByGeoData} />
      </form>
    )
  }
}

export default AddLocation;
