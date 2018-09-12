module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const Gallery = sequelize.define(
    'vnps_gallery', {
    gallery_d: {
      type: DataTypes.INTEGER,
      allowNUll: false,
      primaryKey: true,
      autoIncrement: true,
    },
    gallery_name: DataTypes.STRING(100),
    gallery_type: DataTypes.STRING(50),
    link_img_src: DataTypes.STRING,
    sortOrder: DataTypes.INTEGER,
  },
    {
      timestamps: true,
      createdAt: 'created_date',
      updatedAt: 'updated_date',
      deletedAt: false,
      paranoid: false,
    },
  );
  return Gallery;
};
