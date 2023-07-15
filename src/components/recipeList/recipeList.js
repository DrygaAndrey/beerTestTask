import './recipeList.scss';
import useStore from '../../appState';
import RecipeComponent from '../recipeComponent/recipeComponent';

function RecipeList() {
    const { recipes, scrolledRecipies } = useStore();


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
