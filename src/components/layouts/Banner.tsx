interface BannerProps {
  banner: string;
}

export const Banner: React.FC<BannerProps> = ({ banner }) => {
  return (
    <div className="px-8 mx-28 py-8">
      <div className="h-[230px] rounded-xl">
        <img
          src={banner}
          alt="banner"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};
