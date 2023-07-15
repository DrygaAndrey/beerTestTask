import './recipeComponent.scss';
import { useState, useEffect } from 'react';
import useStore from '../../appState';
import { useNavigate } from 'react-router-dom';


function RecipeComponent({ recipe, }) {
    const [className, setClassName] = useState('recipeComponent');
    const { selectedRecipes, setSelectedRecipes} = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedRecipes.includes(recipe.id)) {
            setClassName('recipeComponent selected');
        } else {
            setClassName('recipeComponent');
        }
    }, [selectedRecipes, recipe.id]);

    const rightClickHandler = (e) => {
        e.preventDefault();

        if (selectedRecipes.includes(recipe.id)) {
            const filteredRecipes = selectedRecipes.filter(number => number !== recipe.id);
            setSelectedRecipes(filteredRecipes);
        } else {
            setSelectedRecipes([...selectedRecipes, recipe.id]);
        }
    }
    const leftClickHandler = () => {
        navigate(`/details/${recipe.id}`);
    }

    return (
        <div className={className}
            onContextMenu={(e) => { rightClickHandler(e) }}
            onClick={leftClickHandler}
        >
            <div className='descripition'>
                <h2>{recipe.id}. {recipe.name}</h2>
                <h4>{recipe.tagline}</h4>
            </div>
            <div className='picture'>
                <img src={recipe.image_url} alt={`${recipe.name}`} />
            </div>

        </div>
    );
}

export default RecipeComponent;