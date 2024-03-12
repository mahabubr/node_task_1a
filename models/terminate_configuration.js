const coreModel = require("./../core/models");

module.exports = (sequelize, DataTypes) => {
  const Terminate = sequelize.define("terminate_configuration", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    disclaimer: DataTypes.STRING,
    count: DataTypes.INTEGER,
  });

  coreModel.call(this, Terminate);

  Terminate._preCreateProcessing = function (data) {
    return data;
  };
  Terminate._postCreateProcessing = function (data) {
    return data;
  };
  Terminate._customCountingConditions = function (data) {
    return data;
  };

  Terminate._filterAllowKeys = function (data) {
    return data;
  };

  return Terminate;
};
