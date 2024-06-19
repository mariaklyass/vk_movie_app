export type Genre = {
  name: string;
};

export type Movie = {
  description: string;
  genres: Genre[];
  id: number;
  name: string;
  poster: {
    url: string;
    previewUrl: string;
  };
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  year: number;
};
