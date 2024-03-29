const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    database: {
      type: DataTypes.VIRTUAL,
      get() {
        return true;
      },
    },
  },{
    timestamps: false,
  });
};
