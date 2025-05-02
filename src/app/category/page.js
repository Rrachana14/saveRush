"use client";
import HeaderBar from "../../components/HeaderBar";
import CategoryBanner from "../../components/CategoryBanner";
import ActionBar from "../../components/ActionBar";
import ProductCard from "../../components/ProductCard";
import Image from "next/image"; 
import "../../styles/CategoryPage.css";

const CategoryPage = () => {
  const products = [
    {
      id: 1,
      name: "Chicken Chashu Collagen Ramen",
      price: "18.50",
      image: "/assets/categories/rice3.jpg", 
      tag: "Most ordered",
    },
    {
      id: 2,
      name: "Chicken Chashu Collagen Udon",
      price: "19.50",
      image: "/assets/categories/rice4.jpg", 
    },
    {
      id: 3,
      name: "Takoyaki Balls (5 Pieces)",
      price: "7.90",
      image: "/assets/categories/rice1.jpg", 
    },
    {
      id: 4,
      name: "Prawn Paste Ramen",
      price: "19.50",
      image: "/assets/categories/rice2.jpg",
      tag: "Most ordered",
    },
    {
      id: 5,
      name: "Takoyaki Balls (5 Pieces)",
      price: "7.90",
      image: "/assets/categories/rice5.jpg", 
    },
    {
      id: 6,
      name: "Chicken Chashu Collagen Udon",
      price: "19.50",
      image: "/assets/categories/rice4.jpg", 
    },
    {
      id: 7,
      name: "Takoyaki Balls (5 Pieces)",
      price: "7.90",
      image: "/assets/categories/rice1.jpg", 
    },
  ];

  return (
    <div className="page-container ">
      <HeaderBar />
      <div className="banner-wrapper">
        <CategoryBanner
          categoryName="Rice"
          categoryImage="../../publi/assets/categories/rice.jpg" 
          rating={4.5}
          totalCount={120}
          timeEstimate={30}
        />
      </div>
      <div className="action-wrapper">
        <ActionBar />
      </div>
      <h4 className="page-container tag font-semibold">For You</h4>
      <div className="product-list">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
