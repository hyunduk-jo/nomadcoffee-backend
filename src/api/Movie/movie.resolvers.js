import client from '../../client';

export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => client.movie.findUnique({ where: { id } })
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) => client.movie.create({ data: { title, year, genre } }),
    deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
    updateMovie: (_, { id, title, year, genre }) => client.movie.update({
      where: { id },
      data: { title, year, genre }
    })
  }
}