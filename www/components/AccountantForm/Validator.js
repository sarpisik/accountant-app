import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import { removeWhiteSpace, addWhiteSpace } from '../../util/whiteSpaceHandlers';
import withApiHandler from '../withApiHandler';

class Container extends Component {
  static propTypes = {
    inputs: PropTypes.array,
    request: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      inputs: props.inputs,
      values: props.inputs.reduce(labelReducer, {}),
      isLoading: false
    };
  }

  onChange = ({ target: { name, value } }) =>
    this.setState(state => ({
      ...state,
      values: { ...state.values, [name]: value }
    }));

  toggleLoading = () => this.setState(toggleStateLoading);

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
      const { handleRequest, request, onSuccess } = this.props,
        { values } = this.state,
        data = { ...request.data, ...values };

      await this.toggleLoading();

      const response = await handleRequest({
        ...request,
        data
      });

      await onSuccess({ ...values, ...response });
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
      <Form
        title={`Enter ${this.props.title}`}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        {...this.state}
      />
    );
  }
}

export default withApiHandler(Container);

// Helper
function labelReducer(prev, { label }) {
  prev[label] = '';
  return prev;
}

function toggleStateLoading(state) {
  return { ...state, isLoading: !state.isLoading };
}
