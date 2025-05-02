"use client"; 
import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";


const CategoryBanner = ({
  categoryName,
  categoryImage,
  rating,
  totalCount,
  timeEstimate,
}) => {
  const imagePath = `/assets/categories/rice1.jpg`;

  return (
    <div className="category-banner flex m-4 p-2 bg-white shadow-md rounded-xl h-[135px] z-10">
      <img src={imagePath} alt={categoryName} className="category-banner-img w-[35%] h-[95%] object-cover rounded-xl mr-3 transition-transform duration-300 ease-in-out" />
      <div className="banner-content flex flex-col ">
        <h2 className="text-[24.8px] font-bold mt-[3px]">{categoryName}</h2>
        <p className="text-[14.3px] font-normal text-[#252422] ">Delicious {categoryName} dishes just for you.</p>

        <div className="category-meta flex flex-col gap-1 text-[#333]">
          <div className="rating text-[12px] font-semibold">
            ⭐ {rating}/5 <span className="total-count text-[11px] text-[#777] font-normal ml-1">({totalCount}+)</span>
          </div>

          <div className="info-tags flex gap-5 items-center flex-wrap text-[12px]">
            <div className="info-tag free-delivery  flex items-center gap-1">
              <FaShippingFast className="tag-icon" />
              <span className="old-price line-through text-[#999]">₹49</span>
              <span className="new-price text-green-600 font-semibold">Free</span>
                
            </div>
            <div className="info-tag price-change flex items-center gap-1">
                    <FaRegClock className="tag-icon w-[12px] h-[12px]" />
                    <span>From 55 min</span> 
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
