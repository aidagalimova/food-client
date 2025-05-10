import Link from 'components/Link';
import Text, { TextTag, TextView, TextWeight } from 'components/Text';
import { useAuth } from 'store/rootStore/authStore/useAuth';

import style from './Main.module.scss';

const Main = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={style.main}>
      <Text tag={TextTag.H1} view={TextView.TITLE}>
        Welcome to the Cookbook
      </Text>

      <Text view={TextView.P_20}>Discover a world of delicious recipes and culinary ideas</Text>

      {isAuthenticated ? (
        <Link to="/recipes" name="Go to recipes" decoration="underline" className={style.link} />
      ) : (
        <Link to="/login" name="Sign in" decoration="underline" className={style.link} />
      )}

      <div className={style.features}>
        <div className={style.feature}>
          <Text tag={TextTag.H3} view={TextView.P_18} weight={TextWeight.SEMIBOLD}>
            Detailed Instructions
          </Text>
          <Text view={TextView.P_16}>Each recipe comes with step-by-step instructions and list of ingredients</Text>
        </div>

        <div className={style.feature}>
          <Text tag={TextTag.H3} view={TextView.P_18} weight={TextWeight.SEMIBOLD}>
            Portion Calculator
          </Text>
          <Text view={TextView.P_16}>Easily adjust ingredient quantities for any number of servings</Text>
        </div>

        <div className={style.feature}>
          <Text tag={TextTag.H3} view={TextView.P_18} weight={TextWeight.SEMIBOLD}>
            Shopping List
          </Text>
          <Text view={TextView.P_16}>Add ingredients to your shopping list with one click</Text>
        </div>

        <div className={style.feature}>
          <Text tag={TextTag.H3} view={TextView.P_18} weight={TextWeight.SEMIBOLD}>
            Personal Account
          </Text>
          <Text view={TextView.P_16}>Create an account to access all website features</Text>
        </div>
      </div>
    </div>
  );
};

export default Main;
