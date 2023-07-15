import './recipeList.scss';
import { useEffect} from 'react';
import useStore from '../../appState';
import RecipeComponent from '../recipeComponent/recipeComponent';



function RecipeList() {
    const { recipes, scrolledRecipies } = useStore();

    useEffect(() => {

    }, [recipes]);

    return (
        <div className='recipeList'>
            {recipes.map((recipe, index) => {
                if (index < scrolledRecipies) {
                    return <RecipeComponent key={recipe.id} recipe={recipe} />
                }
            })}
        </div>
    );
}

export default RecipeList;
