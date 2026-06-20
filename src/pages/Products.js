import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiShoppingBag, FiSliders, FiX } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

// MEN KURTA IMAGES
import menKurta1 from '../assets/images/MEN KURTA/floral.jpg';
import menKurta2 from '../assets/images/MEN KURTA/mandla.jpg';
import menKurta3 from '../assets/images/MEN KURTA/floral (2).jpg';
import menKurta4 from '../assets/images/MEN KURTA/mandla (2).jpg';

// MEN SHIRTS IMAGES
import menShirt1 from '../assets/images/MEN SHIRTS/leaves.jpg';
import menShirt2 from '../assets/images/MEN SHIRTS/one side leave.jpg';
import menShirt3 from '../assets/images/MEN SHIRTS/rounded.jpg';
import menShirt4 from '../assets/images/MEN SHIRTS/time fly.jpg';

// MENS T-SHIRT IMAGES
import mensTshirt1 from '../assets/images/MENS\'S T-SHIRT/introvert person.jpg';
import mensTshirt2 from '../assets/images/MENS\'S T-SHIRT/leaf deign.jpg';

// WOMEN KURTI IMAGES
import womenKurti1 from '../assets/images/WOMEN KURTI/boarder mandala.jpg';
import womenKurti2 from '../assets/images/WOMEN KURTI/hand painted.jpg';

// WOMEN SHIRT IMAGES
import womenShirt1 from '../assets/images/WOMEN SHIRT/animal obssed.jpg';
import womenShirt2 from '../assets/images/WOMEN SHIRT/cat path.jpg';
import womenShirt3 from '../assets/images/WOMEN SHIRT/floral.jpg';

// HANDKERCHIEF IMAGES
import handkerchief1 from '../assets/images/handkerchief/Bike obssed.jpg';
import handkerchief2 from '../assets/images/handkerchief/BRO,SIS.jpg';
import handkerchief3 from '../assets/images/handkerchief/couple bear.jpg';
import handkerchief4 from '../assets/images/handkerchief/couple with Name.jpg';
import handkerchief5 from '../assets/images/handkerchief/Evil Eye.jpg';
import handkerchief6 from '../assets/images/handkerchief/Holding Name.jpg';
import handkerchief7 from '../assets/images/handkerchief/rakhi Special customizable hanky_.jpg';

// COUPLE WEAR IMAGES
import coupleWear1 from '../assets/images/Couple wear/Bear.jpg';
import coupleWear2 from '../assets/images/Couple wear/Cartoon.jpg';
import coupleWear3 from '../assets/images/Couple wear/Dudu & Bubu.jpg';
import coupleWear4 from '../assets/images/Couple wear/Harry potter.jpg';
import coupleWear5 from '../assets/images/Couple wear/Pizza Couple.jpg';
import coupleWear6 from '../assets/images/Couple wear/Tom & Jerry.jpg';

// HOODIE IMAGES
import hoodie1 from '../assets/images/Hoodie/Bear.jpg';
import hoodie2 from '../assets/images/Hoodie/Forever.jpg';
import hoodie3 from '../assets/images/Hoodie/Harry Potter.jpg';
import hoodie4 from '../assets/images/Hoodie/Human heart.jpg';
import hoodie5 from '../assets/images/Hoodie/Mine Forever.jpg';
import hoodie6 from '../assets/images/Hoodie/Panda.jpg';
import hoodie7 from '../assets/images/Hoodie/Sun & Moon.jpg';

const allProducts = [
  {
    id: 1,
    category: 'Men Shirts',
    img: menShirt1,
    img2: menShirt2,
    img3: menShirt3,
    img4: menShirt4,
    name: 'Custom Leaves Print Shirt',
    desc: 'Premium cotton shirt with unique custom leaf print design. Perfect for casual and semi-formal occasions.',
    price: 899,
    badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#FFFFFF', '#1B3A6B', '#8B0000', '#2D5A27'],
  },
  {
    id: 2,
    category: 'Men Shirts',
    img: menShirt3,
    img2: menShirt4,
    name: 'Rounded Art Print Shirt',
    desc: 'Unique rounded art print on premium cotton. A one of a kind custom design shirt.',
    price: 949,
    badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1a1a1a', '#C9A84C'],
  },
  {
    id: 3,
    category: 'Mens T-Shirt',
    img: mensTshirt1,
    img2: mensTshirt2,
    name: 'Introvert Graphic Tee',
    desc: 'Soft 100% cotton tee with bold custom graphic print. Great for casual wear and gifting.',
    price: 499,
    badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#FFFFFF', '#C9A84C', '#800080'],
  },
  {
    id: 4,
    category: 'Mens T-Shirt',
    img: mensTshirt2,
    img2: mensTshirt1,
    name: 'Leaf Design Tee',
    desc: 'Unique leaf design printed tee on soft cotton fabric. Fully customisable.',
    price: 549,
    badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#2D5A27', '#1a1a1a', '#FFFFFF'],
  },
  {
    id: 5,
    category: 'Men Kurta',
    img: menKurta1,
    img2: menKurta2,
    img3: menKurta3,
    img4: menKurta4,
    name: 'Floral Print Kurta',
    desc: 'Elegant floral print short kurta on plain cotton. Perfect for festive and casual occasions.',
    price: 849,
    badge: 'New',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C', '#1B3A6B'],
  },
  {
    id: 6,
    category: 'Men Kurta',
    img: menKurta2,
    img2: menKurta3,
    name: 'Mandala Print Kurta',
    desc: 'Premium mandala block print short kurta. A stunning custom design for every occasion.',
    price: 899,
    badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#1B3A6B', '#8B6914'],
  },
  {
    id: 7,
    category: 'Women Kurti',
    img: womenKurti1,
    img2: womenKurti2,
    name: 'Border Mandala Kurti',
    desc: 'Beautiful border mandala print short kurti on soft cotton. Elegant and fully customisable.',
    price: 749,
    badge: 'New',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#C9A84C', '#800080', '#FFFFFF'],
  },
  {
    id: 8,
    category: 'Women Kurti',
    img: womenKurti2,
    img2: womenKurti1,
    name: 'Hand Painted Kurti',
    desc: 'Unique hand painted design on premium cotton kurti. Every piece is one of a kind.',
    price: 849,
    badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 9,
    category: 'Women Shirt',
    img: womenShirt1,
    img2: womenShirt2,
    img3: womenShirt3,
    name: 'Animal Print Shirt',
    desc: 'Bold and unique animal obsessed print on premium cotton shirt for women.',
    price: 799,
    badge: 'Trendy',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#1a1a1a', '#FFFFFF', '#8B0000'],
  },
  {
    id: 10,
    category: 'Women Shirt',
    img: womenShirt2,
    img2: womenShirt3,
    name: 'Cat Path Print Shirt',
    desc: 'Cute and quirky cat path print on soft cotton. A perfect custom design for cat lovers.',
    price: 749,
    badge: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#F4C2C2', '#1a1a1a'],
  },
  {
    id: 11,
    category: 'Handkerchief',
    img: handkerchief1,
    img2: handkerchief2,
    img3: handkerchief3,
    name: 'Bike Obsessed Handkerchief',
    desc: 'Custom printed handkerchief for bike lovers. Perfect personalised gifting option.',
    price: 149,
    badge: 'Gift',
    sizes: ['Free Size'],
    colors: ['#FFFFFF', '#1a1a1a', '#C9A84C', '#1B3A6B'],
  },
  {
    id: 12,
    category: 'Handkerchief',
    img: handkerchief2,
    img2: handkerchief3,
    name: 'Bro & Sis Special',
    desc: 'Beautiful custom handkerchief for brothers and sisters. A unique gifting choice.',
    price: 149,
    badge: 'Gift',
    sizes: ['Free Size'],
    colors: ['#FFFFFF', '#F4C2C2', '#1B3A6B'],
  },
  {
    id: 13,
    category: 'Handkerchief',
    img: handkerchief3,
    img2: handkerchief4,
    name: 'Couple Bear Handkerchief',
    desc: 'Cute couple bear design custom handkerchief. Perfect for couples and gifting.',
    price: 179,
    badge: 'Couple',
    sizes: ['Free Size'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C'],
  },
  {
    id: 14,
    category: 'Handkerchief',
    img: handkerchief4,
    img2: handkerchief5,
    name: 'Couple with Name',
    desc: 'Personalised couple handkerchief with custom names. A truly unique gift.',
    price: 199,
    badge: 'Personalised',
    sizes: ['Free Size'],
    colors: ['#FFFFFF', '#F4C2C2', '#800080'],
  },
  {
    id: 15,
    category: 'Handkerchief',
    img: handkerchief5,
    img2: handkerchief6,
    name: 'Evil Eye Protection',
    desc: 'Unique evil eye design custom handkerchief. Stylish and meaningful gift.',
    price: 149,
    badge: '',
    sizes: ['Free Size'],
    colors: ['#1B3A6B', '#FFFFFF', '#40E0D0'],
  },
  {
    id: 16,
    category: 'Handkerchief',
    img: handkerchief6,
    img2: handkerchief7,
    name: 'Holding Hands Special',
    desc: 'Heartwarming holding hands design. Perfect for anniversaries and special occasions.',
    price: 179,
    badge: 'Special',
    sizes: ['Free Size'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C'],
  },
  {
    id: 17,
    category: 'Handkerchief',
    img: handkerchief7,
    img2: handkerchief1,
    name: 'Rakhi Special Custom',
    desc: 'Special Rakhi custom handkerchief for brothers and sisters. A memorable gift.',
    price: 199,
    badge: 'Festival',
    sizes: ['Free Size'],
    colors: ['#FFA500', '#FFFFFF', '#8B0000'],
  },

  {
    id: 23,
    category: 'Couple Wear',
    img: coupleWear1,
    img2: coupleWear2,
    img3: coupleWear3,
    name: 'Bear Couple Wear',
    desc: 'Adorable bear theme matching outfit for couples. Cute and fully customisable.',
    price: 999,
    badge: 'Couple',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C', '#1a1a1a'],
  },
  {
    id: 24,
    category: 'Couple Wear',
    img: coupleWear2,
    img2: coupleWear3,
    name: 'Cartoon Couple Wear',
    desc: 'Fun cartoon theme matching couple outfit. Perfect for casual outings and gifting.',
    price: 1099,
    badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1a1a1a', '#C9A84C'],
  },
  {
    id: 25,
    category: 'Couple Wear',
    img: coupleWear3,
    img2: coupleWear4,
    name: 'Dudu & Bubu Special',
    desc: 'Sweet Dudu & Bubu theme couple matching wear. A unique personalised gift.',
    price: 1199,
    badge: 'Special',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 26,
    category: 'Couple Wear',
    img: coupleWear4,
    img2: coupleWear5,
    name: 'Harry Potter Couple',
    desc: 'Magical Harry Potter theme matching couple outfit. Perfect for Potterheads.',
    price: 1299,
    badge: 'Trending',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#8B0000', '#C9A84C'],
  },
  {
    id: 27,
    category: 'Couple Wear',
    img: coupleWear5,
    img2: coupleWear6,
    name: 'Pizza Couple Wear',
    desc: 'Fun and quirky pizza theme couple matching wear. Great for foodie couples!',
    price: 999,
    badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFA500', '#FFFFFF', '#1a1a1a'],
  },
  {
    id: 28,
    category: 'Couple Wear',
    img: coupleWear6,
    img2: coupleWear1,
    name: 'Tom & Jerry Couple',
    desc: 'Classic Tom & Jerry theme couple matching outfit. Playful and fully customisable.',
    price: 1099,
    badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#C9A84C', '#1a1a1a', '#FFFFFF'],
  },
  {
    id: 29,
    category: 'Hoodie',
    img: hoodie1,
    img2: hoodie2,
    img3: hoodie3,
    name: 'Bear Hoodie',
    desc: 'Cozy and warm custom hoodie with cute bear design. Perfect for winters.',
    price: 1299,
    badge: 'New',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1a1a1a', '#F4C2C2', '#C9A84C'],
  },
  {
    id: 30,
    category: 'Hoodie',
    img: hoodie2,
    img2: hoodie3,
    name: 'Forever Hoodie',
    desc: 'Premium custom hoodie with Forever print. Warm, stylish and fully customisable.',
    price: 1399,
    badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 31,
    category: 'Hoodie',
    img: hoodie3,
    img2: hoodie4,
    name: 'Harry Potter Hoodie',
    desc: 'Magical Harry Potter themed custom hoodie. A must have for every Potterhead.',
    price: 1499,
    badge: 'Trending',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#8B0000', '#C9A84C', '#1B3A6B'],
  },
  {
    id: 32,
    category: 'Hoodie',
    img: hoodie4,
    img2: hoodie5,
    name: 'Human Heart Hoodie',
    desc: 'Unique human heart design custom hoodie. Bold and artistic statement piece.',
    price: 1399,
    badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#8B0000', '#1a1a1a', '#FFFFFF'],
  },
  {
    id: 33,
    category: 'Hoodie',
    img: hoodie5,
    img2: hoodie6,
    name: 'Mine Forever Hoodie',
    desc: 'Romantic Mine Forever custom hoodie. Perfect gift for couples and loved ones.',
    price: 1299,
    badge: 'Gift',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#F4C2C2', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 34,
    category: 'Hoodie',
    img: hoodie6,
    img2: hoodie7,
    name: 'Panda Hoodie',
    desc: 'Cute panda design premium custom hoodie. Cozy, warm and super adorable.',
    price: 1299,
    badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1a1a1a', '#888'],
  },
  {
    id: 35,
    category: 'Hoodie',
    img: hoodie7,
    img2: hoodie1,
    name: 'Sun & Moon Hoodie',
    desc: 'Beautiful sun and moon design custom hoodie. Mystical and fully customisable.',
    price: 1399,
    badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFA500', '#1a1a1a', '#C9A84C', '#1B3A6B'],
  },
];

const categories = ['All', 'Men Shirts', 'Mens T-Shirt', 'Men Kurta', 'Women Kurti', 'Women Shirt', 'Women T-Shirt', 'Couple Wear', 'Hoodie', 'Handkerchief'];

export default function Products() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getInitialCategory = () => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    return cat ? cat : 'All';
  };

  const [activeCategory, setActiveCategory] = useState(getInitialCategory());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currentImg, setCurrentImg] = useState(0);

  const filtered = allProducts
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0;
    });

  const openProduct = (p) => {
    setSelectedProduct(p);
    setSelectedSize('');
    setSelectedColor('');
    setCurrentImg(0);
  };

  const closeProduct = () => setSelectedProduct(null);

  const getImages = (p) => {
    return [p.img, p.img2, p.img3, p.img4].filter(Boolean);
  };

  const handleOrder = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    navigate('/customize', {
      state: {
        product: selectedProduct.name,
        size: selectedSize,
        color: selectedColor,
      }
    });
  };

  return (
    <>
      <style>{`
        .products-page {
          min-height: 100vh;
          padding: 100px 60px 80px;
          background: #0A0A0A;
        }
        .products-header { margin-bottom: 60px; }
        .filter-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 40px;
        }
        .category-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cat-tab {
          padding: 9px 20px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: 1px solid rgba(201,168,76,0.2);
          background: transparent;
          color: #888;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
        }
        .cat-tab:hover { border-color: rgba(201,168,76,0.5); color: #C9A84C; }
        .cat-tab.active { background: #C9A84C; border-color: #C9A84C; color: #0A0A0A; }
        .sort-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.2);
          color: #888;
          padding: 9px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 1px;
          outline: none;
          cursor: pointer;
        }
        .sort-select option { background: #1A1A1A; }
        .products-count {
          font-size: 11px;
          color: #888;
          letter-spacing: 2px;
          margin-top: 20px;
          text-transform: uppercase;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }
        .product-card {
          background: #111;
          border: 1px solid rgba(201,168,76,0.08);
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .product-card:hover {
          border-color: rgba(201,168,76,0.35);
          transform: translateY(-4px);
        }
        .product-img-area {
          position: relative;
          overflow: hidden;
        }
        .product-img-area img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s;
        }
        .product-card:hover .product-img-area img {
          transform: scale(1.05);
        }
        .product-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #C9A84C;
          color: #0A0A0A;
          font-size: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 5px 10px;
          font-weight: 500;
          z-index: 1;
        }
        .product-info { padding: 24px; }
        .product-category {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 8px;
        }
        .product-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #F5F0E8;
          margin-bottom: 10px;
        }
        .product-desc {
          font-size: 12px;
          color: #888;
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .product-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .product-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #C9A84C;
        }
        .btn-view {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.3);
          color: #888;
          padding: 9px 18px;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
        }
        .btn-view:hover {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #0A0A0A;
        }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .modal-box {
          background: #1A1A1A;
          border: 1px solid rgba(201,168,76,0.25);
          max-width: 680px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .modal-left { position: relative; }
        .modal-main-img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          display: block;
        }
        .modal-thumbnails {
          display: flex;
          gap: 6px;
          padding: 8px;
          background: #111;
          flex-wrap: wrap;
        }
        .modal-thumb {
          width: 56px;
          height: 56px;
          object-fit: cover;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
          opacity: 0.6;
        }
        .modal-thumb.active {
          border-color: #C9A84C;
          opacity: 1;
        }
        .modal-right { padding: 28px; overflow-y: auto; }
        .modal-category {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 8px;
        }
        .modal-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
          color: #F5F0E8;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .modal-desc {
          font-size: 12px;
          color: #888;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        .modal-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          color: #C9A84C;
          margin-bottom: 24px;
        }
        .modal-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 10px;
        }
        .sizes-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .size-btn {
          padding: 8px 16px;
          border: 1px solid rgba(201,168,76,0.2);
          background: transparent;
          color: #888;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .size-btn:hover, .size-btn.active {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #0A0A0A;
        }
        .colors-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .color-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
        }
        .color-dot:hover, .color-dot.active {
          border-color: #C9A84C;
          transform: scale(1.15);
        }
        .modal-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(201,168,76,0.2);
          color: #888;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }
        .modal-close-btn:hover { color: #C9A84C; border-color: #C9A84C; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .products-page { padding: 100px 24px 60px; }
          .products-grid { grid-template-columns: 1fr; }
          .filter-row { flex-direction: column; align-items: flex-start; }
          .modal-box { grid-template-columns: 1fr; }
          .modal-main-img { height: 260px; }
          .modal-right { padding: 20px; }
        }
      `}</style>

      <div className="products-page">
        <div className="products-header">
          <p className="section-eyebrow">Our Collection</p>
          <h1 className="section-title">All Products</h1>
          <div className="section-line"></div>

          <div className="filter-row">
            <div className="category-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FiSliders size={14} color="#888" />
              <select
                className="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
          <p className="products-count">{filtered.length} Products Found</p>
        </div>

        {/* GRID */}
        <div className="products-grid">
          {filtered.map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-img-area">
                <img src={p.img} alt={p.name} />
                {p.badge && <span className="product-badge">{p.badge}</span>}
              </div>
              <div className="product-info">
                <p className="product-category">{p.category}</p>
                <h3 className="product-name">{p.name}</h3>
                <p className="product-desc">{p.desc}</p>
                <div className="product-bottom">
                  <span className="product-price">₹{p.price}</span>
                  <button className="btn-view" onClick={() => openProduct(p)}>
                    <FiShoppingBag size={12} style={{ marginRight: 6 }} />
                    View & Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeProduct}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>

            {/* LEFT — IMAGES */}
            <div className="modal-left">
              <button className="modal-close-btn" onClick={closeProduct}>
                <FiX size={14} />
              </button>
              <img
                className="modal-main-img"
                src={getImages(selectedProduct)[currentImg]}
                alt={selectedProduct.name}
              />
              {getImages(selectedProduct).length > 1 && (
                <div className="modal-thumbnails">
                  {getImages(selectedProduct).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className={`modal-thumb ${currentImg === i ? 'active' : ''}`}
                      onClick={() => setCurrentImg(i)}
                      alt={`view ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — DETAILS */}
            <div className="modal-right">
              <p className="modal-category">{selectedProduct.category}</p>
              <h2 className="modal-name">{selectedProduct.name}</h2>
              <p className="modal-desc">{selectedProduct.desc}</p>
              <div className="modal-price">₹{selectedProduct.price}</div>

              <p className="modal-label">Select Size</p>
              <div className="sizes-row">
                {selectedProduct.sizes.map(s => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <p className="modal-label">Select Color</p>
              <div className="colors-row">
                {selectedProduct.colors.map((c, i) => (
                  <div
                    key={i}
                    className={`color-dot ${selectedColor === c ? 'active' : ''}`}
                    style={{
                      background: c,
                      border: c === '#FFFFFF'
                        ? '2px solid #444'
                        : selectedColor === c
                          ? '2px solid #C9A84C'
                          : '2px solid transparent'
                    }}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>

              <button
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '11px', letterSpacing: '2px' }}
                onClick={handleOrder}
              >
                {user ? 'Customise & Order →' : 'Login to Order →'}
              </button>

              {!user && (
                <p style={{ fontSize: '11px', color: '#888', textAlign: 'center', marginTop: '12px' }}>
                  Please <span style={{ color: '#C9A84C' }}>login</span> to place an order
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}