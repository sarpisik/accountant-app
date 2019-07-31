import React, { PureComponent } from 'react';
import { object, string } from 'prop-types';
import { addWhiteSpace } from '../../../util/whiteSpaceHandlers';
import { inputDateFormat } from '../../../util/formatTime';
import { EDIT_ACCOUNT, DELETE_ACCOUNT } from '../../../constants/apiUrls';
import RegisterForm from '../Register';
import { authHeader } from '../../../util/auth';

export default class EditAccountForm extends PureComponent {
  static propTypes = {
    account: object,
    error: object,
    token: string.isRequired
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
          headers: authHeader(props.token),
          url: '/' + DELETE_ACCOUNT,
          data: props.account ? { _id: props.account._id } : null
        }
      },
      request: {
        method: 'put',
        headers: authHeader(props.token),
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
        whiteSpacedKey === 'date'
          ? inputDateFormat(account[cur])
          : account[cur];
      return prev;
    }, {});
  }
  return null;
}
