import {
  DataTypes,
  NonAttribute,
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
import { Author } from './author';

export type BookAttributes = {
  title: string;
  description: string;
  publishedDate: string;
  authorId: string;
};

export type BookCreationAttributes = {
  id: string;
};

Table({
  tableName: 'Books',
  timestamps: true
});
export class Book extends Model<
  InferAttributes<Book>,
  InferCreationAttributes<Book>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(() => `${v4()}`)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(DataTypes.TEXT)
  declare description: string;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare publishedDate: string;

  // foreign key to its author
  @Attribute(DataTypes.STRING)
  @NotNull
  declare authorId: string;

  declare author: NonAttribute<Author>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
