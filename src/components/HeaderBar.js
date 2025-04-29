"use client"; 
import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa'; 



const HeaderBar = () => {
  // const router = useRouter();

  return (
    <div className="header-bar sticky top-0 z-10 h-[150px] px-4 py-3 flex items-center justify-between bg-cover bg-center bg-no-repeat shadow-md"
      style={{
        backgroundImage: `linear-gradient(
          rgba(24, 23, 23, 0.579), rgba(0, 0, 0, 0.69)
        ), url('/assets/categories/wallpaperRamen.jpg')`,
      }}>
      <div className="flexbox w-full flex justify-between ">
        <button className="icon-button bg-black bg-opacity-75 text-white text-[18px] px-[16px] py-[10px] rounded-full">←</button>
        <div className="action-buttons flex gap-5">
          <button className="icon-button bg-black bg-opacity-75 text-white text-lg px-[16px] py-[10px] rounded-full">♡</button>
          <button className="delivery-button flex items-center bg-black bg-opacity-70 text-white text-xs px-5 py-1.5 rounded-full">
            <span className="mr-1">Delivery</span> <FaChevronDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
