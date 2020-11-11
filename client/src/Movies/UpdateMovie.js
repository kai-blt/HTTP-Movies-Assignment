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

const UpdateMovie = (props) => {
    const [formValues, setFormValues] = useState(initialValues);
    const params = useParams();
    const history = useHistory();

    //get fields
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => setFormValues(res.data))
            .catch(err => console.log(err.response));       
    }, []);

    console.log(formValues)

 
    //handlers
    const onSubmit =(e) => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${params.id}`, formValues)
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
                <h2>Update Movie</h2><br/>
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
                    {/* <select>
                        {formValues.stars.map(star => <option>{star}</option>)}
                    </select> */}
                </label>
                <button>Accept Changes</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
