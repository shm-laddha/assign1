import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from '@sequelize/core';
import {
  Table,
  PrimaryKey,
  Attribute,
  Default,
  NotNull
} from '@sequelize/core/decorators-legacy';
import { v4 } from 'uuid';

export type AuthorAttributes = {
  name: string;
  biography: string;
  bornDate: string;
};

export type AuthorCreationAttributes = {
  id: string;
};

@Table({
  tableName: 'Authors',
  timestamps: true
})
export class Author extends Model<
  InferAttributes<Author>,
  InferCreationAttributes<Author>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(() => `${v4()}`)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare biography: string;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare bornDate: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
