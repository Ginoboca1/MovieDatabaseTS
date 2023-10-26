//Controladoras relacionadas a las peliculas
import Movies from "../models/Movie";
import { Request, Response } from "express";

//Controladora que se encargar de traer todos las peliculas que se encuentran en la base de datos
export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movies.find();
    if (!movies || movies.length === 0) {
      return res.status(404).json({
        message: "No movies here, add movies to see them!",
      });
    }
    res.status(200).json({
      data: movies,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while fetching movies",
      error: true,
    });
  }
};

//Controladora encargada de traer una pelicula que se encuentra en la base de datos a travez del ID extraido de los params.
export const getMovieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await Movies.findById(id);
    if (!movie) {
      return res
        .status(404)
        .json({ message: `Movie with the ID ${id} not found`, error: true });
    }
    res.status(200).json({ data: movie, error: false });
  } catch (error:any) {
    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
      error: true,
    });
  }
};

//Controladora encargada de crear una nueva pelicula con las propiedades extraidas del body de la request y añadirlo a la base de datos
export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, director, genre, year, imgURL } = req.body;
    const movieCreated = await Movies.create({
      title,
      director,
      genre,
      year,
      imgURL,
    });
    if (!createMovie) {
      throw new Error("Error while creating movie, insert correct data");
    }
    res.status(201).json({
      message: "Movie added!",
      data: movieCreated,
      error: false,
    });
  } catch (error: any) {
    return res.status(422).json({
      message: error.message,
      error: true,
    });
  }
};

//Controladora encargada de actualizar un pelicula ya existente en la base de datos a travez del ID del mismo.
export const updateMovie = async (req:Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, director, genre, year, imgURL } = req.body;
    const movieUpdated = await Movies.findByIdAndUpdate(
      id,
      {
        title,
        director,
        genre,
        year,
        imgURL,
      },
      {
        new: true,
      }
    );

    if (!movieUpdated) {
      return res
        .status(404)
        .json({ message: `Movie with ID ${id} not founded`, error: true });
    }
    res.status(200).json({ data: movieUpdated, error: false });
  } catch (error: any) {
    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
      error: true,
    });
  }
};

//Controladora encargada de eliminar una pelicula ya existente en la base de datos a travez del ID.
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movies.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res
        .status(404)
        .json({ message: `Movie with the ID ${id} not found`, error: true });
    }
    res.status(200).json({ message: "Movie deleted", error: false });
  } catch (error: any) {
    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
      error: true,
    });
  }
};
