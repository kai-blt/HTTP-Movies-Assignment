import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';


//Initial form values
const initialValues = {
  id: null,
  title: '',
  director: '',
  metascore: null,
  stars: []
}

const AddMovie = (props) => {
    const [formValues, setFormValues] = useState(initialValues);
    const params = useParams();
    const history = useHistory();

  
    //handlers
    const onSubmit =(e) => {
        e.preventDefault();
        axios
        .post(`http://localhost:5000/api/movies`, formValues)
            .then(res => {
                setFormValues(initialValues);
                props.getMovieList();
                history.push('/');
            })
            .catch(err => console.log(err.response));
    }

    const handleChange = (e) => {
        if (e.target.name === 'stars') {
            const starsArray = e.target.value.split(',');
           console.log(starsArray)
            setFormValues({
                ...formValues,
                stars: starsArray
            })
        } else {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value
            })
        }
    }

    return(
        <div className="update-movie-card">            
            <form onSubmit={onSubmit}>
                <h2>Add Movie</h2><br/>
                <label>Title
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                    />
                </label>
                <label>Director
                    <input
                        type="text"
                        name="director"
                        value={formValues.director}
                        onChange={handleChange}
                    />
                </label>
                <label>Metascore
                    <input
                        type="number"
                        name="metascore"
                        value={formValues.metascore}
                        onChange={handleChange}
                    />
                </label>
                <label>Actors (comma separated ",")
                    <input
                        type="text"
                        name="stars"
                        value={formValues.stars}
                        onChange={handleChange}
                    />
                </label>
                <button>Accept Changes</button>
            </form>
        </div>
    )
}

export default AddMovie;
