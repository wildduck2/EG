interface BannerProps {
  banner: string;
}

export const Banner: React.FC<BannerProps> = ({ banner }) => {
  return <div className="h-[230px] rounded-xl"></div>;
};
