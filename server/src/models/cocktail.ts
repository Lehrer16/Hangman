import { DataTypes, Sequelize, Model, Optional} from 'sequelize';



interface CocktailAttributes {
    id: number;
    name: string;
}

interface CocktailCreationAttributes extends Optional<CocktailAttributes, 'id'> {}

export class Cocktail extends Model<CocktailAttributes, CocktailCreationAttributes> implements CocktailAttributes {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

export function CocktailFactory(sequelize: Sequelize): typeof Cocktail {
    Cocktail.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'cocktails',
            sequelize: sequelize 
        }
    );
    return Cocktail;
}
