export const MovieDetails = ({ movie }) => {
  return (
    <div>
      <h3>{movie.title}</h3>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        height={"100px"}
        width={"70px"}
      />
      <p>{movie.overview}</p>
    </div>
  );
};
