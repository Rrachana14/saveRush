import React from 'react';
import Image from 'next/image';
import '../styles/SimilarProducts.css';  

const SimilarProducts = ({ currentProductId, products }) => {
  const similarProducts = products.filter((product) => product.id !== currentProductId); // Exclude current product

  return (
    <div className="similar-products-container flex flex-wrap gap-4 pb-2 mx-auto">
      {similarProducts.map((product) => (
        <div className="similar-product-card relative flex flex-col items-start w-[160px] h-[300px] border border-[#eee] rounded-lg  bg-white shadow-sm max-[600px]:w-[150px] max-[450px]:w-[118px] max-[413px]:w-[160px]  max-[362px]:w-[150px] max-[345px]:w-[130px] " key={product.id}>
          <Image
            src={product.images[0]}
            alt={product.name}
            className="similar-product-image w-full h-[110px] object-cover rounded-lg"
            width={200} 
            height={200} 
          />
          <div className="flex items-center justify-center gap-2 mt-5">
            <p className='bg-[#efefef] py-[2px] px-[9px] text-xs rounded-lg'>450g</p>
            <p className='bg-[#efefef] py-[2px] px-[9px] text-xs rounded-lg'>6 months</p>
          </div>
          <p className="similar-product-name text-left text-base font-semibold mt-1 ml-1 max-[450px]:text-[0.8rem] max-[413px]:text-[1.1rem]">{product.name}</p>

          <p className="similar-product-rating text-[14px] text-[#f4b400] my-1 ml-1">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))} <span>(100)</span>
          </p>
          <p className="similar-product-time flex items-center text-xs uppercase gap-1 ml-1">
            <span className="clock-icon text-green-500 text-sm">🕒</span> 10 MINS
          </p>
          <p className='similar-product-offer text-[#0d5d9e] font-bold text-xs ml-1'>6% OFF</p>
          <p className="similar-product-price text-[#333] text-base font-semibold absolute bottom-[1.7px] left-[4%] max-[450px]:text-[0.9rem] max-[413px]:text-[0.8rem]">₹{product.price}</p>
          <button className="add-button absolute top-[87px] right-[5px] bg-white border-2 border-[#28a745] text-[#28a745] py-1 px-3 rounded-sm text-sm font-semibold cursor-pointer">ADD</button>
        </div>
      ))}
    </div>
  );
};

export default SimilarProducts;
