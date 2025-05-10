import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Text, { TextColor, TextTag, TextView } from 'components/Text';
import AvatarIcon from 'components/icons/AvatarIcon';
import PageLoader from 'components/PageLoader';
import Button from 'components/Button';
import { useProfile } from 'store/rootStore/profileStore';
import ChangePasswordModal from './components/ChangePasswordModal/ChangePasswordModal';

import style from './Profile.module.scss';

const Profile = observer(() => {
  const { profile, isLoading, error } = useProfile();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleOpenChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false);
  };

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
            <div className={style.body}>
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
                <Text tag={TextTag.P} view={TextView.P_14} color={TextColor.SECONDARY}>
                  Updated at: {profile.updatedAt.toLocaleDateString()}
                </Text>
              </div>
              <Button onClick={handleOpenChangePassword} className={style.changePasswordButton}>
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
        onSuccess={handleCloseChangePassword}
      />
    </div>
  );
});

export default Profile;
