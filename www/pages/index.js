import React, { Fragment } from 'react';
import { LinkBox, LinkRow } from '../components';

export default () => (
  <Fragment>
    <LinkRow>
      <LinkBox sm="6" link="invoices" text="Invoices" />
      <LinkBox sm="6" link="accounts" text="Accounts" />
    </LinkRow>
    <LinkRow>
      <LinkBox sm="6" link="receivables" text="Receivables" />
      <LinkBox sm="6" link="debts" text="Debts" />
    </LinkRow>
  </Fragment>
);
