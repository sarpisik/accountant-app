module.exports = ({ connection, model, property }) => {
  return async function({ _id }, next) {
    try {
      const Model = connection.model(model);
      await Model.findByIdAndUpdate(_id, { [property]: new Date() });
      next();
    } catch (error) {
      next(error);
    }
  };
};
