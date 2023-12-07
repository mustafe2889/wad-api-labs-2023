export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=41c614617bb51b48c60e1b9c7b39145b&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };

  