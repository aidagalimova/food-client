import Icon, { IconProps } from '../Icon';

const MenuIcon: React.FC<IconProps> = ({ width = 24, height = 18, className, ...props }) => {
  return (
    <Icon {...props} width={width} height={height} className={className}>
      <path
        d="M0 -0.00012207H24V2.99988H0V-0.00012207ZM0 7.49988H24V10.4999H0V7.49988ZM24 14.9999H0V17.9999H24V14.9999Z"
        fill="currentColor"
      />
    </Icon>
  );
};

export default MenuIcon;
