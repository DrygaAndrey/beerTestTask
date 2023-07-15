import './App.scss';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import useStore from './appState';
import RecipeList from './components/recipeList/recipeList';
import DeletePanel from './components/deletePanel/deletePanel';


function App() {
  const targetRef = useRef(null);
  const [isBlockReached, setIsBlockReached] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { recipes, setRecipes, scrolledRecipies, incrementRecipies } = useStore();

  useEffect(() => {
    if (!loading) {
      getRecipes();
    }
  }, [])
  useEffect(() => {
    if (!loading) {
      if (recipes.length === 0) {
        setPage(page + 1);
        getRecipes();
      }
      if (scrolledRecipies > recipes.length) {
        setPage(page + 1);
        getRecipes();
      }
    }
  }, [recipes, scrolledRecipies]);

  const getRecipes = () => {
    setLoading(true);
    axios.get('https://api.punkapi.com/v2/beers', {
      params: {
        page,
        per_page: 25,
      },
    })
      .then(response => {
        let newArray = recipes.concat(response.data);
        setRecipes(newArray);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  }



  useEffect(() => {
    const handleScroll = () => {
      if (!isBlockReached) {
        const targetElement = targetRef.current;

        if (targetElement) {
          const { top } = targetElement.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          if (top <= windowHeight) {
            setIsBlockReached(true);
            incrementRecipies();
            setTimeout(() => {
              setIsBlockReached(false);
            }, 300)
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBlockReached]);

  return (
    <div className='app'>
      <RecipeList />
      <DeletePanel />
      <div className='targetDiv' ref={targetRef}></div>
    </div>
  );
}

export default App;
