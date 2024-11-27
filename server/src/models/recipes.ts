import { DataTypes, Sequelize, Model, Optional} from 'sequelize';


interface RecipeAttributes {
    id: number;
    title: string;
}
interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
    public id!: number;
    public title!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function recipeFactory(sequelize: Sequelize): typeof Recipe {
    Recipe.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'recipes',
            sequelize: sequelize 
        }
    );
    return Recipe;
}
