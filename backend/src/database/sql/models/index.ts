import { Author } from './author';
import { Book } from './book';

export const createAssociations = () => {
  Book.belongsTo(Author, {
    foreignKey: 'authorId',
    targetKey: 'id',
    as: 'books',
    foreignKeyConstraints: true
  });
  Author.hasMany(Book, {
    foreignKey: 'authorId',
    sourceKey: 'id',
    as: 'books',
    foreignKeyConstraints: true
  });

  Author.sync();
  Book.sync();
};

export * from './author';
export * from './book';
