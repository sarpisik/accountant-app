import { LinkRow, LinkBox } from '../../components';

export default () => (
  <LinkRow>
    <LinkBox sm="6" link="invoices/purchases" text="Purchases" />
    <LinkBox sm="6" link="invoices/sales" text="Sales" />
  </LinkRow>
);
