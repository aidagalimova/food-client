import Loader from 'components/Loader';
import style from './PageLoader.module.scss';

const PageLoader = () => {
  return (
    <div className={style.loaderContainer}>
      <Loader />
    </div>
  );
};

export default PageLoader;
