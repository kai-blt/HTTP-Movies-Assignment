import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
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

    //get fields
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => setFormValues(res.data))
            .catch(err => console.log(err.response));
    }, []);


    //handlers
    const onSubmit = () => {

    }

    return(
        <div className="update-movie-card">            
            <form>
                <h2>Update Movie</h2><br/>
                <label>Title
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                    />
                </label>
                <label>Director
                    <input
                        type="text"
                        name="director"
                        value={formValues.director}
                    />
                </label>
                <label>Metascore
                    <input
                        type="text"
                        name="metascore"
                        value={formValues.metascore}
                    />
                </label>
                <label>Actors
                    <select>
                        {formValues.stars.map(star => <option>{star}</option>)}
                    </select>
                </label>
            </form>
        </div>
    )
}

export default UpdateMovie;
