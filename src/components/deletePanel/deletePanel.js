import './deletePanel.scss';
import useStore from '../../appState';


function DeletePanel() {
    const { selectedRecipes, setSelectedRecipes, recipes, setRecipes } = useStore();

    const deleteRecipes = () => {
        const filteredObjects = recipes.filter(obj => !selectedRecipes.includes(obj.id));
        setRecipes(filteredObjects);
        setSelectedRecipes([]);
    }

    return (
        <>
            {selectedRecipes.length > 0 && (
                <div className='deletePanel' >
                    <div className='info'>
                        {recipes.map((recipe) => {
                            if (selectedRecipes.includes(recipe.id)) {
                                return <div key={recipe.id}><p>{recipe.id}. {recipe.name}</p></div>
                            }
                        })}
                    </div>
                    <button onClick={deleteRecipes}>Delete</button>
                </div>
            )}
        </>


    );
}

export default DeletePanel;