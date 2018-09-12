module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'Post',
        {
            post_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                required: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            }
        },
        {
            timestamps: true,
            createdAt: 'created_date',
            updatedAt: 'updated_date',
            deletedAt: 'deleted_date',
            underscored: true,
        }
    );
    Post.associate = (models) => {
        Post.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'user_id',
                sourceKey: 'user_id',
                allowNull: false,
            },
        });
    };
    Post.associate = (models) => { Post.hasMany(models.Comment, { foreignKey: 'post_id' }); };
    return Post;
};