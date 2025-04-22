import Text, { TextView, TextTag } from 'components/Text';

import bannerImg from '@/assets/images/banners/banner1.jpg';
import style from './Banner.module.scss';

const Description = () => {
  return (
    <Text view={TextView.P_20} className={style.description}>
      Find the perfect food and{' '}
      <Text highlighted tag={TextTag.SPAN}>
        drink ideas
      </Text>{' '}
      for every occasion, from{' '}
      <Text highlighted tag={TextTag.SPAN}>
        weeknight dinners
      </Text>{' '}
      to{' '}
      <Text highlighted tag={TextTag.SPAN}>
        holiday feasts
      </Text>
      .
    </Text>
  );
};

const Banner = () => {
  return (
    <section className={style.banner}>
      <img src={bannerImg} alt={'recipes-banner'} className={style.bannerImg} />
      <Description />
    </section>
  );
};

export default Banner;
