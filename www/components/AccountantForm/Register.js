import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import Feedback from '../Feedback';
import { removeWhiteSpace, addWhiteSpace } from '../../util/whiteSpaceHandlers';

export default class Container extends Component {
  static propTypes = {
    inputs: PropTypes.array,
    request: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      inputs: props.inputs,
      values: props.inputs.reduce(labelReducer, {}),
      isLoading: false,
      alert: false
    };
  }

  onChange = ({ target: { name, value } }) =>
    this.setState(state => ({
      ...state,
      values: { ...state.values, [name]: value }
    }));

  toggleLoading = () => this.setState(toggleStateLoading);

  toggleAlert = () => this.setState(toggleStateAlert);

  removeSpacesInLabel = () =>
    Object.keys(this.state.values).reduce((prev, cur) => {
      const value = this.state.values[cur],
        newKey = removeWhiteSpace(cur);
      prev[newKey] = value;
      return prev;
    }, {});

  onSubmit = async event => {
    try {
      event.preventDefault();
      const { handleRequest, request } = this.props,
        data = { ...request.data, ...this.removeSpacesInLabel() };

      await this.toggleLoading();

      await handleRequest({
        ...request,
        data
      });

      this.toggleAlert();
      setTimeout(() => this.toggleAlert(), 2000);
    } catch (error) {
      error.type === 'validation'
        ? this.setState(state => ({
            ...state,
            inputs: state.inputs.map(input => {
              input.validated = 'true';
              input.inValid = !!error.errors.find(
                ({ param }) => addWhiteSpace(param) === input.label
              );
              return input;
            })
          }))
        : alert(error);
      console.error('error ,', error);
    } finally {
      await this.toggleLoading();
    }
  };

  render() {
    return (
      <Fragment>
        <Feedback
          isActive={this.state.alert}
          color="success"
          text={this.props.feedback}
        />
        <Form
          title="Register A New Invoice"
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          {...this.state}
        />
      </Fragment>
    );
  }
}

// Helper
function labelReducer(prev, { label }) {
  prev[label] = '';
  return prev;
}

function toggleStateLoading(state) {
  return { ...state, isLoading: !state.isLoading };
}

function toggleStateAlert(state) {
  return { ...state, alert: !state.alert };
}
