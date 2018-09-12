module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const GalleryImage = sequelize.define(
    'gallery_image', {
      gallery_img_id: {
        type: DataTypes.INTEGER,
        allowNUll: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_date',
      updatedAt: 'updated_date',
      deletedAt: false,
      paranoid: false,
    },
  );
  return GalleryImage;
};
