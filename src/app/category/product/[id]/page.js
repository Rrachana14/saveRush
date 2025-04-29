"use client";
import { useState, useEffect, useRef } from "react";
import {useParams, useRouter } from 'next/navigation';
import { FaChevronDown, FaSearch, FaChevronUp, FaShare } from "react-icons/fa";
import "../../../../styles/ProductDetail.css"; 
import SimilarProducts from "../../../../components/SimilarProducts"; 
import products from "../../../../data/product"; 

const ProductDetailPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showPanel, setShowPanel] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const triggerRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);
  const pageRef = useRef(null);
  const productInfoRef = useRef(null);

  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);

  const router = useRouter();
  const { id } = useParams();

  const parsedId = parseInt(id);
  const product =
    products.find((product) => product.id === parsedId) || products[0];


  //handles image sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [product]);

  const closePanel = () => {
    setShowPanel(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  //handle scroll and sticky
  const handleScroll = () => {
    if (!productInfoRef.current) {
      console.log("Product info element not found.");
      return;
    }
    const productInfoTop = productInfoRef.current.getBoundingClientRect().top;
    if (productInfoTop <= 0) {
      setShowTitle(true);
    } else {
      setShowTitle(false);
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      handleScroll(); 
    };

    if (pageRef.current) {
      pageRef.current.addEventListener("scroll", handleScrollEvent);
    }

    return () => {
      if (pageRef.current) {
        pageRef.current.removeEventListener("scroll", handleScrollEvent);
      }
    };
  }, []);

  return (
    <div className={`bottom-sheet ${showPanel ? "slide-up" : "slide-down"}`}>
      <div className="product-detail-page" ref={pageRef}>
        <div className={`product-header ${showTitle ? "name" : ""}`}>
          <button
            className={`back-btn ${showTitle ? "no-box-shadow" : ""}`}
            onClick={closePanel}
          >
            <FaChevronDown />
          </button>
          {showTitle && <h4>{product.name}</h4>}

          <div className={`header-actions ${showTitle ? "no-header-actions" : ""}`}>
            <div className="search-container">
              {!showSearch ? (
                <FaSearch
                  className="search-icon"
                  onClick={() => setShowSearch(true)}
                />
              ) : (
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onBlur={() => setShowSearch(false)}
                  autoFocus
                />
              )}
            </div>
            <button className="share-btn">
              <FaShare />
            </button>
          </div>
        </div>

        <div className="product-detail">
          <div className="product-image-slider">
            <div className="thumbnail-slider">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail-image ${index === currentSlide ? "selected" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            <div className="main-image">
              <img
                src={product.images[currentSlide]}
                alt={`${product.name} - Slide ${currentSlide + 1}`}
                className="product-slide-image"
              />
            </div>

            <div className="slider-dots">
              {product.images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
            <div className="product-rating-badge">
              <span className="fresh-icon">⏱ 10 MINS</span>
              <div className="stars">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </div>
              <span className="reviews">
                ({Math.floor(product.rating * 100)})
              </span>
            </div>
          </div>

          <div className="product-info" id="product-trigger" ref={productInfoRef}>
            <p className="product-name">{product.name}</p>
            <button className="prodshare-btn" onClick={() => handleShare()}>
              <FaShare />
            </button>
            <hr />
            <p className="product-quantity">{product.quantity}</p>
            <div className="product-price">
              <p className="discounted-price">₹{product.price}</p>
              <p className="original-price">
                MRP<span>₹24.50</span>
              </p>
              <p className="percent-off">25% OFF</p>
            </div>
            <button
              className="product-more-details-btn"
              onClick={() => setShowMore((prev) => !prev)}
            >
              View More Details {showMore ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {showMore && (
              <div className="extra-product-info">
                <p>This is a delicious item made with authentic ingredients.</p>
                <p>Perfect for lunch or dinner, served fresh!</p>
                <p>Allergen Info: Contains wheat, soy, and seafood.</p>
              </div>
            )}
          </div>
        </div>

        <div className="product-similarProduct">
          <h3>Similar Products</h3>
          <SimilarProducts currentProductId={product.id} products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
