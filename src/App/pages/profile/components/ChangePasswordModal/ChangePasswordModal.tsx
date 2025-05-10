import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';
import Text, { TextColor, TextTag, TextView } from 'components/Text';
import rootStore from 'store/rootStore/instance';
import type { ChangePasswordData } from 'store/rootStore/authStore/types';

import style from './ChangePasswordModal.module.scss';

type ChangePasswordFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

const ChangePasswordModal = observer(({ isOpen, onClose, onSuccess }: ChangePasswordFormProps) => {
  const auth = rootStore.auth;

  const [formData, setFormData] = useState<ChangePasswordData>({
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (auth.error) auth.clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      return;
    }

    const result = await auth.changePassword(formData);
    if (result) {
      setFormData({
        currentPassword: '',
        password: '',
        passwordConfirmation: '',
      });
      onSuccess?.();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <form className={style.form} onSubmit={handleSubmit}>
        {auth.error && (
          <Text tag={TextTag.P} view={TextView.P_14} color={TextColor.ACCENT}>
            {auth.error.message}
          </Text>
        )}

        <div className={style.inputGroup}>
          <label className={style.label} htmlFor="currentPassword">
            Current Password
          </label>
          <Input
            id="currentPassword"
            type="password"
            name="currentPassword"
            placeholder="Enter your current password"
            value={formData.currentPassword}
            onChange={handleChange('currentPassword')}
            required
          />
        </div>

        <div className={style.inputGroup}>
          <label className={style.label} htmlFor="password">
            New Password
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange('password')}
            required
          />
        </div>

        <div className={style.inputGroup}>
          <label className={style.label} htmlFor="passwordConfirmation">
            Confirm New Password
          </label>
          <Input
            id="passwordConfirmation"
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm new password"
            value={formData.passwordConfirmation}
            onChange={handleChange('passwordConfirmation')}
            required
          />
        </div>

        <Button type="submit" loading={auth.isLoading} className={style.button}>
          Change Password
        </Button>
      </form>
    </Modal>
  );
});

export default ChangePasswordModal;
