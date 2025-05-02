"use client"; 
import Link from 'next/link'; 

const ProductCard = ({ product }) => {
  return (
    <div className="product-card relative w-[160px] h-[240px] border border-gray-200 shadow-lg rounded-xl overflow-hidden bg-white  transition-transform duration-200 hover:-translate-y-1 m-2 flex-shrink-0  max-[700px]:m-0.5 max-[545px]:w-[150px] max-[391px]:w-[45%] max-[391px]:m-[1%]">
      <div className="image-container relative w-full h-[140px] max-[391px]:h-[120px] overflow-hidden rounded-xl border-b border-gray-100">
        <Link href={`/category/product/${product.id}`}>
          <img src={product.image} alt={product.name} className='w-full h-full object-cover block'/>
    
        </Link>
        {product.tag && <span className="badge absolute top-2 left-2 bg-indigo-800 text-white px-2 py-1 rounded-xl text-xs font-bold">{product.tag}</span>}
        <button className="add-btn absolute bottom-2 right-2 w-8 h-8 max-[391px]:w-7 max-[391px]:h-7 bg-[#b3ff53] text-white border-none rounded-full text-lg max-[391px]:text-base cursor-pointer hover:bg-green-600 transition-colors duration-200">+</button>
      </div>
      <p className=" text-md font-medium mt-2 mb-1  mx-1 text-gray-800 max-[391px]:text-[13px]">{product.name}</p>
      <p className=" absolute bottom-0 text-[15px] mx-1 font-bold  text-gray-600 mb-2 max-[391px]:text-[15px]">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
