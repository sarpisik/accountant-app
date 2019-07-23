module.exports = ({ connection, model, property }) => {
  return async function(doc, next) {
    try {
      const _id = this.getQuery()._id,
        Model = connection.model(model);
      await Model.findByIdAndUpdate(_id, { [property]: new Date() });
      next();
    } catch (error) {
      next(error);
    }
  };
};
