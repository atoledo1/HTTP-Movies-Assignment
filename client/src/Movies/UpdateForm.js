import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: 0,
  stars: [],
};

const UpdateForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const changeHandler = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value);
    }

    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        const newMoviesList = props.movies.map((mv) => {
          if (mv.id === res.data.id) {
            return res.data;
          }
          return mv;
        });
        props.setMovieList(newMoviesList);
        push(`/`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          value={movie.director}
        />
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          value={movie.metascore}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
