module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        comment_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            autIncement: true,
        },
        post_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            required: true,
        },
        commenter_username: {
            type: DataTypes.STRING,
            required: true,
        },
        commenter_email: {
            type: DataTypes.STRING,
            required: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['approved', 'rejected', 'in review']

        },
    }, {
            timestamps: true,
            createdAt: 'created_date',
            updatedAt: 'updated_date',
            deletedAt: 'deleted_date',
            underscored: true,
        });
    Comment.associate = (models) => {
        Comment.belongsTo(models.Post, {
            onDelete: 'CASCADE',
            foreignKey: 'post_id',
            allowNull: false,
        });
    };
    return Comment;
};