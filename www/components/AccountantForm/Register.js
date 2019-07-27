import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import Feedback from './Feedback';
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
      values: props.values || props.inputs.reduce(labelReducer, {}),
      isLoading: false,
      isRemoved: false,
      isSuccess: false
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

  resetForm = () =>
    this.setState(state => ({
      values: Object.keys(state.values).reduce((obj, key) => {
        obj[key] = '';
        return obj;
      }, {})
    }));

  handleFeedback = type => this.setState({ [type]: true });

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
      await this.resetForm();
      await this.handleFeedback('isSuccess');
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
        : alert(
            error.type === 'database' && error.error.name === 'MongoError'
              ? 'This invoice no is already in use.'
              : 'Can not perform submit.'
          );
      console.error(error);
    } finally {
      await this.toggleLoading();
    }
  };

  onDelete = async () => {
    try {
      const {
        handleRequest,
        button: { request }
      } = this.props;
      await this.toggleLoading();
      await handleRequest(request);
      await this.resetForm();
      await this.handleFeedback('isRemoved');
    } catch (error) {
      alert('Failed on delete.');
      console.error(error);
    } finally {
      await this.toggleLoading();
    }
  };

  render() {
    if (this.state.isSuccess)
      return <Feedback text="The invoice registered successfully." />;
    if (this.state.isRemoved)
      return <Feedback text="The invoice deleted successfully." />;
    return (
      <Form
        title="Register A New Invoice"
        delete={
          this.props.button
            ? { ...this.props.button, onDelete: this.onDelete }
            : null
        }
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
