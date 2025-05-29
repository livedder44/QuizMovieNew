const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const fetchMoviesByTitle = async (title: string) => {
  const res = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
  return res.json();
};

export const fetchMovieById = async (id: string) => {
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
  return res.json();
};
