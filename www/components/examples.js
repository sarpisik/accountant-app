import { connect } from 'react-redux';
import Clock from './clock';
import Counter from './counter';

function Examples({ lastUpdate, light, user }) {
  return (
    <div>
      <Clock lastUpdate={lastUpdate} light={light} />
      <Counter />
      {user && (
        <div>
          <h2>Data from API</h2>
          <p>FirstName : {user.firstname}</p>
          <p>LastName : {user.lastname}</p>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { lastUpdate, light } = state;
  return { lastUpdate, light };
}

export default connect(mapStateToProps)(Examples);
