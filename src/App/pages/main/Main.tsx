import Link from 'components/Link';

import style from './Main.module.scss';

const Main = () => {
  return (
    <div className={style.main}>
      <Link to="/recipes" name="Go to recipes" decoration="underline" className={style.link} />
    </div>
  );
};

export default Main;
