const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('plataform', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING
      },
      image_background: {
        type: DataTypes.TEXT
      }
    }, {
        timestamps: false,
        hooks: {
            beforeValidate: plataform => {
                plataform.slug = plataform.name.toLowerCase().replace(/ /g, "");
            }
        }
    });
  };
  