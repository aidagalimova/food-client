import Icon, { IconProps } from '../Icon';

export const EquipmentIcon: React.FC<IconProps> = ({ width = 24, height = 24, className, ...props }) => {
  return (
    <Icon {...props} width={width} height={height} className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.94982 1.67442C3.14086 1.67442 1.67442 3.14086 1.67442 4.94982C1.67442 5.41219 1.29958 5.78702 0.837209 5.78702C0.374835 5.78702 0 5.41219 0 4.94982C0 2.2161 2.2161 0 4.94982 0C7.68353 0 9.89963 2.2161 9.89963 4.94982V12.6657C10.3089 12.422 10.7776 12.2108 11.2725 12.0306C12.7604 11.4892 14.6721 11.1628 16.4651 11.1628C18.2598 11.1628 20.0432 11.4899 21.4063 12.0413C22.0855 12.316 22.7023 12.6634 23.1637 13.0894C23.6229 13.5135 24 14.0872 24 14.7907V16.1126C24 20.4687 20.4687 24 16.1126 24C11.7565 24 8.22521 20.4687 8.22521 16.1126V4.94982C8.22521 3.14086 6.75877 1.67442 4.94982 1.67442ZM22.2402 17.1452C21.7485 20.085 19.1922 22.3256 16.1126 22.3256C12.9647 22.3256 10.3636 19.9845 9.95537 16.9484C10.3513 17.1784 10.7998 17.3788 11.2725 17.5508C12.7604 18.0922 14.6721 18.4186 16.4651 18.4186C18.2598 18.4186 20.0432 18.0916 21.4063 17.5401C21.6982 17.422 21.9786 17.2905 22.2402 17.1452ZM22.3256 14.7907C22.3256 14.7235 22.2915 14.5632 22.0278 14.3195C21.7659 14.0777 21.3475 13.8238 20.7783 13.5935C19.6448 13.1349 18.0795 12.8372 16.4651 12.8372C14.8491 12.8372 13.1329 13.1355 11.8451 13.6041C11.198 13.8396 10.7044 14.1018 10.3893 14.356C10.0594 14.6221 10.0465 14.7747 10.0465 14.7907C10.0465 14.8067 10.0594 14.9593 10.3893 15.2254C10.7044 15.4796 11.198 15.7418 11.8452 15.9773C13.1329 16.4459 14.8491 16.7442 16.4651 16.7442C18.0795 16.7442 19.6448 16.4466 20.7783 15.9879C21.3475 15.7577 21.7659 15.5037 22.0278 15.2619C22.2915 15.0182 22.3256 14.8579 22.3256 14.7907Z"
        fill="currentColor"
      />
    </Icon>
  );
};
