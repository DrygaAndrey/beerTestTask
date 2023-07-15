import './detailsPanel.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DetailsPage() {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(1);
    
    const { id } = useParams();
    useEffect(() => {
        getRecipes();
    }, []);

    const buttonHandler = () => {
        navigate(`/`);
    }

    const getRecipes = () => {
        axios.get('https://api.punkapi.com/v2/beers', {
            params: {
                page: id,
                per_page: 1,
            },
        })
            .then(response => {
                setRecipe(response.data[0])
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (

        <div className='detailsPanel'>
            <div className='info'>
                <p>Description: {recipe.description}</p><hr />
                <p>Tagline: {recipe.tagline}</p><hr />
                <p>Alcohol by volume: {recipe.abv}</p><hr />
                <p>Attenuation level: {recipe.attenuation_level}</p><hr />
                <p>International Bitterness Unit:{recipe.ibu}</p><hr />
                <p>pH:{recipe.ph}</p><hr />
                <p>Standard Research Method Value: {recipe.srm}</p><hr />
                <p>First brewed: {recipe.first_brewed}</p><hr />
                <p>European Brewery Convention value: {recipe.ebc}</p><hr />
                <p>Brewers tips: {recipe.brewers_tips}</p><hr />
                <p>Contributed by: {recipe.contributed_by}</p><hr />

            </div>
            <div className='picture'>
                <img src={recipe.image_url} alt={`${recipe.name}`} />
            </div>
            <button onClick={buttonHandler}>⬅</button>
        </div>




    );
}

export default DetailsPage;