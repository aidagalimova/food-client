import Icon, { IconProps } from '../Icon';

const ArrowLeftIcon: React.FC<IconProps> = ({ width = 32, height = 32, className, ...props }) => {
  return (
    <Icon {...props} width={width} height={height} className={className} fill="none">
      <path
        d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowLeftIcon;
