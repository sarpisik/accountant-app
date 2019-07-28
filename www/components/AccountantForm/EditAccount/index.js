import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { addWhiteSpace } from '../../../util/whiteSpaceHandlers';
import formatTime from '../../../util/formatTime';
import { EDIT_ACCOUNT, DELETE_ACCOUNT } from '../../../constants/apiUrls';
import RegisterForm from '../Register';

export default class EditAccountForm extends PureComponent {
  static propTypes = {
    account: PropTypes.object,
    error: PropTypes.object
  };
  constructor(props) {
    super(props);

    this.editFormData = {
      inputs: [{ label: 'no' }, { label: 'title' }],
      values: formatAccountDate(props.account),
      button: {
        text: 'Delete',
        request: {
          method: 'delete',
          url: '/' + DELETE_ACCOUNT,
          data: props.account ? { _id: props.account._id } : null
        }
      },
      request: {
        method: 'put',
        url: '/' + EDIT_ACCOUNT,
        data: props.account || null
      },
      title: 'Update Account',
      feedback: {
        onRegister: 'Account registered successfully.',
        onDelete: 'Account deleted successfully.'
      }
    };
  }
  render() {
    return this.props.account ? (
      <RegisterForm {...this.editFormData} />
    ) : (
      this.props.error.message
    );
  }
}

function formatAccountDate(account) {
  if (account) {
    return Object.keys(account).reduce((prev, cur) => {
      let whiteSpacedKey = addWhiteSpace(cur);
      prev[whiteSpacedKey] =
        whiteSpacedKey === 'date' ? formatTime(account[cur]) : account[cur];
      return prev;
    }, {});
  }
  return null;
}
