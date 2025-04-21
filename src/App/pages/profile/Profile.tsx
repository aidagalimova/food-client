import { observer } from 'mobx-react-lite';
import Text, { TextColor, TextTag, TextView, TextWeight } from 'components/Text';
import AvatarIcon from 'components/icons/AvatarIcon';
import PageLoader from 'components/PageLoader';
import { useProfile } from 'store/rootStore/profileStore';

import style from './Profile.module.scss';

const Profile = observer(() => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className={style.profile}>
        <div className={style.container}>
          <Text tag={TextTag.P} view={TextView.P_14} color={TextColor.ACCENT}>
            {error.message}
          </Text>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={style.profile}>
        <div className={style.container}>
          <Text tag={TextTag.P} view={TextView.P_14}>
            Profile not found
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={style.profile}>
      <div className={style.container}>
        <Text tag={TextTag.H1} view={TextView.TITLE}>
          My Profile
        </Text>

        <div className={style.profileContent}>
          <div className={style.userInfo}>
            <div className={style.avatarContainer}>
              <div className={style.avatar} />
              <AvatarIcon className={style.avatarIcon} />
            </div>
            <div className={style.details}>
              <Text tag={TextTag.H2} view={TextView.TITLE}>
                {profile.username}
              </Text>
              <Text tag={TextTag.P} view={TextView.P_16} color={TextColor.SECONDARY}>
                Email: {profile.email}
              </Text>
              <Text tag={TextTag.P} view={TextView.P_14} color={TextColor.SECONDARY}>
                Created at: {profile.createdAt.toLocaleDateString()}
              </Text>
            </div>
          </div>
          <div className={style.stats}>
            <div className={style.statItem}>
              <Text tag={TextTag.SPAN} view={TextView.P_16} color={TextColor.SECONDARY}>
                Recipes Created
              </Text>
              <Text tag={TextTag.SPAN} view={TextView.P_18} weight={TextWeight.BOLD}>
                0
              </Text>
            </div>
            <div className={style.statItem}>
              <Text tag={TextTag.SPAN} view={TextView.P_16} color={TextColor.SECONDARY}>
                Favorite Recipes
              </Text>
              <Text tag={TextTag.SPAN} view={TextView.P_18} weight={TextWeight.BOLD}>
                0
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
