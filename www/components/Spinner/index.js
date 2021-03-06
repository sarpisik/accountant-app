export default ({ color }) => (
  <div className="text-center">
    <div
      className={`spinner-border spinner-border-sm ml-3 ${color}-text`}
      role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
