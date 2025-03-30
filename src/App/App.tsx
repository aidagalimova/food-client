import { Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import Recipes from './pages/recipes';
import Recipe from './pages/recipe';
import NotFound from './pages/notFound';
import Main from './pages/main';

import style from './App.module.scss';

function App() {
  return (
    <>
      <Header />
      <div className={style.pageContainer}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
