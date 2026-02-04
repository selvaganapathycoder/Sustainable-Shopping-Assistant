import logo from '../../assets/logo.svg';
import titleImg from '../../assets/title.svg';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showAvatar?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, showAvatar = true }) => {
  return (
    <header className="px-6 pt-8 pb-4 flex justify-between items-center">
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-1.5">
            <img src={logo} alt="EcoScan Logo" className="w-full h-full object-contain" />
          </div>
          {title ? (
            <h1 className="text-2xl font-black tracking-tight text-text dark:text-white">
              {title}
            </h1>
          ) : (
            <img src={titleImg} alt="EcoScan" className="h-8 object-contain" />
          )}
        </div>
        {subtitle && (
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1 leading-tight">{subtitle}</p>
        )}
      </div>
      {showAvatar && (
        <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 border-2 border-primary/20 dark:border-primary/30 p-0.5">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
            alt="User Avatar" 
            className="rounded-full"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
