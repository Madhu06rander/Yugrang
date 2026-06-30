import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiShoppingBag, FiSliders, FiX, FiArrowLeft } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// MEN KURTA IMAGES
import menKurta1 from '../assets/images/MEN KURTA/floral.jpg';
import menKurta2 from '../assets/images/MEN KURTA/mandla.jpg';
import menKurta3 from '../assets/images/MEN KURTA/floral (2).jpg';
import menKurta4 from '../assets/images/MEN KURTA/mandla (2).jpg';
import menKurta5 from '../assets/images/MEN KURTA/floral (3).jpg';
import menKurta6 from '../assets/images/MEN KURTA/floral (4).jpg';
import menKurta7 from '../assets/images/MEN KURTA/floral (5).jpg';
import menKurta8 from '../assets/images/MEN KURTA/floral (6).jpg';
import menKurta9 from '../assets/images/MEN KURTA/floral (7).jpg';
import menKurta10 from '../assets/images/MEN KURTA/floral (8).jpg';
import menKurta11 from '../assets/images/MEN KURTA/Kolar Border mandala.jpg';
import menKurta12 from '../assets/images/MEN KURTA/kolar mandala (1).jpg';
import menKurta13 from '../assets/images/MEN KURTA/mandla (3).jpg';
import menKurta14 from '../assets/images/MEN KURTA/mandla (4).jpg';

// MEN SHIRTS IMAGES
import menShirt1 from '../assets/images/MEN SHIRTS/leaves.jpg';
import menShirt2 from '../assets/images/MEN SHIRTS/one side leave.jpg';
import menShirt3 from '../assets/images/MEN SHIRTS/rounded.jpg';
import menShirt4 from '../assets/images/MEN SHIRTS/time fly.jpg';
import menShirt5 from '../assets/images/MEN SHIRTS/Women folaral.jpg';
import menShirt6 from '../assets/images/MEN SHIRTS/Flower pint.jpg';
import menShirt7 from '../assets/images/MEN SHIRTS/Leave Fall.jpg';
import menShirt8 from '../assets/images/MEN SHIRTS/Mashroom print.jpg';
import menShirt9 from '../assets/images/MEN SHIRTS/spotted Flower.jpg';
import menShirt10 from '../assets/images/MEN SHIRTS/Spring Mood.jpg';

// MENS T-SHIRT IMAGES
import mensTshirt1 from '../assets/images/MENS\'S T-SHIRT/introvert person.jpg';
import mensTshirt2 from '../assets/images/MENS\'S T-SHIRT/leaf deign.jpg';
import mensTshirt3 from '../assets/images/MENS\'S T-SHIRT/11_11 Sun Moon.jpg';
import mensTshirt4 from '../assets/images/MENS\'S T-SHIRT/Abstract Sun And Moon.jpg';
import mensTshirt5 from '../assets/images/MENS\'S T-SHIRT/Boho Tribal.jpg';
import mensTshirt6 from '../assets/images/MENS\'S T-SHIRT/Devoite Mandala.jpg';
import mensTshirt7 from '../assets/images/MENS\'S T-SHIRT/Guitar Print.jpg';
import mensTshirt8 from '../assets/images/MENS\'S T-SHIRT/Intricate Geometric.jpg';
import mensTshirt9 from '../assets/images/MENS\'S T-SHIRT/Ocean print.jpg';

// WOMEN KURTI IMAGES
import womenKurti1 from '../assets/images/WOMEN KURTI/boarder mandala.jpg';
import womenKurti2 from '../assets/images/WOMEN KURTI/hand painted.jpg';
import womenKurti3 from '../assets/images/WOMEN KURTI/Floral print.jpg';
import womenKurti4 from '../assets/images/WOMEN KURTI/Lotus print.jpg';
import womenKurti5 from '../assets/images/WOMEN KURTI/Madhubani Painting.jpg';
import womenKurti6 from '../assets/images/WOMEN KURTI/Mandala seeleves.jpg';

// WOMEN SHIRT IMAGES
import womenShirt1 from '../assets/images/WOMEN SHIRT/animal obssed.jpg';
import womenShirt2 from '../assets/images/WOMEN SHIRT/cat path.jpg';
import womenShirt3 from '../assets/images/WOMEN SHIRT/floral.jpg';
import womenShirt4 from '../assets/images/WOMEN SHIRT/Bittersweet.jpg';
import womenShirt5 from '../assets/images/WOMEN SHIRT/Hand paint face print.jpg';
import womenShirt6 from '../assets/images/WOMEN SHIRT/Hummingbird _ Print.jpg';
import womenShirt7 from '../assets/images/WOMEN SHIRT/nature obseed.jpg';

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

// WOMEN TISHIRT IMAGES
import womenTshirt1 from '../assets/images/WOMEN TISHIRT/Animal,Floral,Geometric..jpg';
import womenTshirt2 from '../assets/images/WOMEN TISHIRT/Animal,Tribal.jpg';
import womenTshirt3 from '../assets/images/WOMEN TISHIRT/download.jpg';
import womenTshirt4 from '../assets/images/WOMEN TISHIRT/Panda Dream.jpg';
import womenTshirt5 from '../assets/images/WOMEN TISHIRT/Spiritual Goddess.jpg';
import womenTshirt6 from '../assets/images/WOMEN TISHIRT/Sun and Moon.jpg';
import womenTshirt7 from '../assets/images/WOMEN TISHIRT/Sunflower Theory.jpg';

const mainCategories = ['All', 'Men', 'Women', 'Couple', 'Winter', 'Handkerchief'];

const subCategoryMap = {
  'Men': ['All', 'Men Shirts', 'Mens T-Shirt', 'Men Kurta'],
  'Women': ['All', 'Women Kurti', 'Women Shirt', 'Women T-Shirt'],
  'Couple': ['All', 'Couple Wear'],
  'Winter': ['All', 'Hoodie'],
  'Handkerchief': ['All', 'Handkerchief'],
};

const allProducts = [
  // ── MEN SHIRTS ──
  {
    id: 1, category: 'Men Shirts', subCategory: 'Hand Painted',
    img: menShirt1, img2: menShirt2, img3: menShirt3, img4: menShirt4,
    name: 'Custom Leaves Print Shirt',
    desc: 'Premium cotton shirt with unique custom leaf print design.',
    price: 899, badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#FFFFFF', '#1B3A6B', '#8B0000', '#2D5A27'],
  },
  {
    id: 2, category: 'Men Shirts', subCategory: 'Normal Print',
    img: menShirt3, img2: menShirt4,
    name: 'Rounded Art Print Shirt',
    desc: 'Unique rounded art print on premium cotton.',
    price: 949, badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1a1a1a', '#C9A84C'],
  },
  {
    id: 36, category: 'Men Shirts', subCategory: 'Floral Print',
    img: menShirt5, img2: menShirt6,
    name: 'Avalipt Kyaari Shirt',
    desc: 'Beautiful Avalipt Kyaari floral print on premium cotton shirt.',
    price: 899, badge: 'New',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1a1a1a', '#C9A84C'],
  },
  {
    id: 37, category: 'Men Shirts', subCategory: 'Floral Print',
    img: menShirt6, img2: menShirt7,
    name: 'Flower Print Shirt',
    desc: 'Elegant flower print on soft cotton.',
    price: 849, badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C'],
  },
  {
    id: 38, category: 'Men Shirts', subCategory: 'Hand Painted',
    img: menShirt7, img2: menShirt8,
    name: 'Leave Fall Shirt',
    desc: 'Hand painted leave fall design on premium cotton.',
    price: 949, badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#2D5A27', '#FFFFFF', '#1a1a1a'],
  },
  {
    id: 39, category: 'Men Shirts', subCategory: 'Normal Print',
    img: menShirt8, img2: menShirt9,
    name: 'Mushroom Print Shirt',
    desc: 'Quirky mushroom print on soft cotton.',
    price: 849, badge: 'Trending',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFA500', '#FFFFFF', '#1a1a1a'],
  },
  {
    id: 40, category: 'Men Shirts', subCategory: 'Floral Print',
    img: menShirt9, img2: menShirt10,
    name: 'Spotted Flower Shirt',
    desc: 'Delicate spotted flower print on premium cotton shirt.',
    price: 899, badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1B3A6B', '#C9A84C'],
  },
  {
    id: 41, category: 'Men Shirts', subCategory: 'Floral Print',
    img: menShirt10, img2: menShirt5,
    name: 'Spring Mood Shirt',
    desc: 'Fresh spring mood floral print on soft cotton.',
    price: 899, badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#2D5A27', '#FFFFFF', '#F4C2C2'],
  },

  // ── MENS T-SHIRT ──
  {
    id: 3, category: 'Mens T-Shirt', subCategory: 'Normal Print',
    img: mensTshirt1, img2: mensTshirt2,
    name: 'Introvert Graphic Tee',
    desc: 'Soft 100% cotton tee with bold custom graphic print.',
    price: 499, badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#FFFFFF', '#C9A84C', '#800080'],
  },
  {
    id: 4, category: 'Mens T-Shirt', subCategory: 'Hand Painted',
    img: mensTshirt2, img2: mensTshirt1,
    name: 'Leaf Design Tee',
    desc: 'Unique leaf design printed tee on soft cotton fabric.',
    price: 549, badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#2D5A27', '#1a1a1a', '#FFFFFF'],
  },
  {
    id: 48, category: 'Mens T-Shirt', subCategory: 'Mandala Print',
    img: mensTshirt3, img2: mensTshirt4,
    name: 'Sun Moon Tee',
    desc: 'Mystical sun and moon mandala print on soft cotton tee.',
    price: 549, badge: 'Trending',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 49, category: 'Mens T-Shirt', subCategory: 'Mandala Print',
    img: mensTshirt4, img2: mensTshirt5,
    name: 'Abstract Sun Moon Tee',
    desc: 'Abstract sun and moon design on premium cotton tee.',
    price: 599, badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#C9A84C', '#8B6914'],
  },
  {
    id: 50, category: 'Mens T-Shirt', subCategory: 'Normal Print',
    img: mensTshirt5, img2: mensTshirt6,
    name: 'Boho Tribal Tee',
    desc: 'Cool boho tribal print tee on soft cotton.',
    price: 499, badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#FFA500', '#1a1a1a'],
  },
  {
    id: 51, category: 'Mens T-Shirt', subCategory: 'Mandala Print',
    img: mensTshirt6, img2: mensTshirt7,
    name: 'Devoite Mandala Tee',
    desc: 'Stunning devoite mandala print on premium cotton tee.',
    price: 549, badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1B3A6B', '#1a1a1a', '#C9A84C'],
  },
  {
    id: 52, category: 'Mens T-Shirt', subCategory: 'Normal Print',
    img: mensTshirt7, img2: mensTshirt8,
    name: 'Guitar Print Tee',
    desc: 'Cool guitar print on soft cotton.',
    price: 499, badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#FFFFFF', '#8B0000'],
  },
  {
    id: 53, category: 'Mens T-Shirt', subCategory: 'Normal Print',
    img: mensTshirt8, img2: mensTshirt9,
    name: 'Intricate Geometric Tee',
    desc: 'Bold intricate geometric design on premium cotton tee.',
    price: 549, badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 54, category: 'Mens T-Shirt', subCategory: 'Normal Print',
    img: mensTshirt9, img2: mensTshirt3,
    name: 'Ocean Print Tee',
    desc: 'Refreshing ocean print on soft cotton tee.',
    price: 499, badge: 'New',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1B3A6B', '#FFFFFF', '#40E0D0'],
  },

  // ── MEN KURTA ──
  {
    id: 5, category: 'Men Kurta', subCategory: 'Floral Print',
    img: menKurta1, img2: menKurta2, img3: menKurta3, img4: menKurta4,
    name: 'Floral Print Kurta',
    desc: 'Elegant floral print short kurta on plain cotton.',
    price: 849, badge: 'New',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C', '#1B3A6B'],
  },
  {
    id: 6, category: 'Men Kurta', subCategory: 'Mandala Print',
    img: menKurta2, img2: menKurta3,
    name: 'Mandala Print Kurta',
    desc: 'Premium mandala block print short kurta.',
    price: 899, badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#1B3A6B', '#8B6914'],
  },
  {
    id: 42, category: 'Men Kurta', subCategory: 'Floral Print',
    img: menKurta5, img2: menKurta6,
    name: 'Floral Kurta Vol 2',
    desc: 'Premium floral print short kurta on plain cotton.',
    price: 849, badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C'],
  },
  {
    id: 43, category: 'Men Kurta', subCategory: 'Floral Print',
    img: menKurta7, img2: menKurta8,
    name: 'Floral Kurta Vol 3',
    desc: 'Beautiful floral design short kurta.',
    price: 899, badge: 'New',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1B3A6B', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 44, category: 'Men Kurta', subCategory: 'Floral Print',
    img: menKurta9, img2: menKurta10,
    name: 'Floral Kurta Vol 4',
    desc: 'Unique floral print kurta with premium stitching.',
    price: 949, badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#2D5A27', '#C9A84C'],
  },
  {
    id: 45, category: 'Men Kurta', subCategory: 'Mandala Print',
    img: menKurta11, img2: menKurta12,
    name: 'Kolar Border Mandala Kurta',
    desc: 'Stunning kolar border mandala print kurta.',
    price: 999, badge: 'Premium',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1a1a1a', '#C9A84C', '#8B6914'],
  },
  {
    id: 46, category: 'Men Kurta', subCategory: 'Mandala Print',
    img: menKurta12, img2: menKurta13,
    name: 'Kolar Mandala Kurta',
    desc: 'Classic kolar mandala design short kurta.',
    price: 949, badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1B3A6B', '#1a1a1a', '#C9A84C'],
  },
  {
    id: 47, category: 'Men Kurta', subCategory: 'Mandala Print',
    img: menKurta13, img2: menKurta14,
    name: 'Mandala Kurta Vol 2',
    desc: 'Rich mandala print short kurta on premium cotton.',
    price: 899, badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#8B6914', '#1B3A6B'],
  },

  // ── WOMEN KURTI ──
  {
    id: 7, category: 'Women Kurti', subCategory: 'Mandala Print',
    img: womenKurti1, img2: womenKurti2,
    name: 'Border Mandala Kurti',
    desc: 'Beautiful border mandala print short kurti on soft cotton.',
    price: 749, badge: 'New',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#C9A84C', '#800080', '#FFFFFF'],
  },
  {
    id: 8, category: 'Women Kurti', subCategory: 'Hand Painted',
    img: womenKurti2, img2: womenKurti1,
    name: 'Hand Painted Kurti',
    desc: 'Unique hand painted design on premium cotton kurti.',
    price: 849, badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 55, category: 'Women Kurti', subCategory: 'Floral Print',
    img: womenKurti3, img2: womenKurti4,
    name: 'Floral Print Kurti',
    desc: 'Elegant floral print short kurti on soft cotton.',
    price: 749, badge: 'New',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#FFFFFF', '#C9A84C', '#800080'],
  },
  {
    id: 56, category: 'Women Kurti', subCategory: 'Floral Print',
    img: womenKurti4, img2: womenKurti5,
    name: 'Lotus Print Kurti',
    desc: 'Beautiful lotus print on premium cotton kurti.',
    price: 799, badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#FFFFFF', '#800080'],
  },
  {
    id: 57, category: 'Women Kurti', subCategory: 'Hand Painted',
    img: womenKurti5, img2: womenKurti6,
    name: 'Madhubani Painting Kurti',
    desc: 'Unique Madhubani hand painting on premium cotton kurti.',
    price: 899, badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#FFFFFF', '#C9A84C', '#FFA500'],
  },
  {
    id: 58, category: 'Women Kurti', subCategory: 'Mandala Print',
    img: womenKurti6, img2: womenKurti1,
    name: 'Mandala Sleeves Kurti',
    desc: 'Stunning mandala print on sleeves of premium cotton kurti.',
    price: 849, badge: 'Trending',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#2D5A27', '#FFFFFF', '#C9A84C'],
  },

  // ── WOMEN SHIRT ──
  {
    id: 9, category: 'Women Shirt', subCategory: 'Normal Print',
    img: womenShirt1, img2: womenShirt2, img3: womenShirt3,
    name: 'Animal Print Shirt',
    desc: 'Bold and unique animal obsessed print on premium cotton shirt.',
    price: 799, badge: 'Trendy',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#1a1a1a', '#FFFFFF', '#8B0000'],
  },
  {
    id: 10, category: 'Women Shirt', subCategory: 'Normal Print',
    img: womenShirt2, img2: womenShirt3,
    name: 'Cat Path Print Shirt',
    desc: 'Cute and quirky cat path print on soft cotton.',
    price: 749, badge: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#F4C2C2', '#1a1a1a'],
  },
  {
    id: 59, category: 'Women Shirt', subCategory: 'Floral Print',
    img: womenShirt4, img2: womenShirt5,
    name: 'Bittersweet Print Shirt',
    desc: 'Sweet and elegant bittersweet print on premium cotton shirt.',
    price: 799, badge: 'New',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 60, category: 'Women Shirt', subCategory: 'Hand Painted',
    img: womenShirt5, img2: womenShirt6,
    name: 'Hand Paint Face Print Shirt',
    desc: 'Unique hand painted face print on premium cotton.',
    price: 899, badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#1a1a1a', '#C9A84C'],
  },
  {
    id: 61, category: 'Women Shirt', subCategory: 'Normal Print',
    img: womenShirt6, img2: womenShirt7,
    name: 'Hummingbird Print Shirt',
    desc: 'Beautiful hummingbird print on soft cotton shirt.',
    price: 849, badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#2D5A27', '#F4C2C2'],
  },
  {
    id: 62, category: 'Women Shirt', subCategory: 'Normal Print',
    img: womenShirt7, img2: womenShirt1,
    name: 'Nature Obsessed Shirt',
    desc: 'Nature inspired print on premium cotton shirt.',
    price: 799, badge: 'Trending',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#2D5A27', '#FFFFFF', '#8B6914'],
  },

  // ── WOMEN T-SHIRT ──
  {
    id: 63, category: 'Women T-Shirt', subCategory: 'Floral Print',
    img: womenTshirt1, img2: womenTshirt2,
    name: 'Animal Floral Geometric Tee',
    desc: 'Unique animal floral geometric print on soft cotton tee.',
    price: 449, badge: 'New',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C'],
  },
  {
    id: 64, category: 'Women T-Shirt', subCategory: 'Normal Print',
    img: womenTshirt2, img2: womenTshirt3,
    name: 'Animal Tribal Tee',
    desc: 'Bold animal tribal print on premium cotton tee.',
    price: 499, badge: 'Trending',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#1a1a1a', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 65, category: 'Women T-Shirt', subCategory: 'Normal Print',
    img: womenTshirt3, img2: womenTshirt4,
    name: 'Abstract Face Tee',
    desc: 'Modern abstract face design on soft cotton tee.',
    price: 449, badge: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#F4C2C2', '#1a1a1a'],
  },
  {
    id: 66, category: 'Women T-Shirt', subCategory: 'Normal Print',
    img: womenTshirt4, img2: womenTshirt5,
    name: 'Panda Dream Tee',
    desc: 'Cute panda dream print on soft cotton tee.',
    price: 449, badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#FFFFFF', '#1a1a1a'],
  },
  {
    id: 67, category: 'Women T-Shirt', subCategory: 'Hand Painted',
    img: womenTshirt5, img2: womenTshirt6,
    name: 'Spiritual Goddess Tee',
    desc: 'Beautiful spiritual goddess hand painted design on premium cotton tee.',
    price: 549, badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#C9A84C', '#800080'],
  },
  {
    id: 68, category: 'Women T-Shirt', subCategory: 'Mandala Print',
    img: womenTshirt6, img2: womenTshirt7,
    name: 'Sun and Moon Tee',
    desc: 'Mystical sun and moon mandala print on soft cotton tee.',
    price: 499, badge: 'Trending',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#2D5A27', '#1a1a1a', '#C9A84C'],
  },
  {
    id: 69, category: 'Women T-Shirt', subCategory: 'Floral Print',
    img: womenTshirt7, img2: womenTshirt1,
    name: 'Sunflower Theory Tee',
    desc: 'Beautiful sunflower theory print on premium cotton tee.',
    price: 449, badge: 'New',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFA500', '#FFFFFF', '#2D5A27'],
  },

  // ── HANDKERCHIEF ──
  {
    id: 11, category: 'Handkerchief', subCategory: 'Normal Print',
    img: handkerchief1, img2: handkerchief2, img3: handkerchief3,
    name: 'Bike Obsessed Handkerchief',
    desc: 'Custom printed handkerchief for bike lovers.',
    price: 149, badge: 'Gift',
    sizes: ['Free Size'],
    colors: ['#FFFFFF', '#1a1a1a', '#C9A84C', '#1B3A6B'],
  },
  {
    id: 12, category: 'Handkerchief', subCategory: 'Normal Print',
    img: handkerchief2, img2: handkerchief3,
    name: 'Bro & Sis Special',
    desc: 'Beautiful custom handkerchief for brothers and sisters.',
    price: 149, badge: 'Gift',
    sizes: ['Free Size'],
    colors: ['#FFFFFF', '#F4C2C2', '#1B3A6B'],
  },
  {
    id: 13, category: 'Handkerchief', subCategory: 'Normal Print',
    img: handkerchief3, img2: handkerchief4,
    name: 'Couple Bear Handkerchief',
    desc: 'Cute couple bear design custom handkerchief.',
    price: 179, badge: 'Couple',
    sizes: ['Free Size'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C'],
  },
  {
    id: 14, category: 'Handkerchief', subCategory: 'Personalised',
    img: handkerchief4, img2: handkerchief5,
    name: 'Couple with Name',
    desc: 'Personalised couple handkerchief with custom names.',
    price: 199, badge: 'Personalised',
    sizes: ['Free Size'],
    colors: ['#FFFFFF', '#F4C2C2', '#800080'],
  },
  {
    id: 15, category: 'Handkerchief', subCategory: 'Normal Print',
    img: handkerchief5, img2: handkerchief6,
    name: 'Evil Eye Protection',
    desc: 'Unique evil eye design custom handkerchief.',
    price: 149, badge: '',
    sizes: ['Free Size'],
    colors: ['#1B3A6B', '#FFFFFF', '#40E0D0'],
  },
  {
    id: 16, category: 'Handkerchief', subCategory: 'Personalised',
    img: handkerchief6, img2: handkerchief7,
    name: 'Holding Hands Special',
    desc: 'Heartwarming holding hands design.',
    price: 179, badge: 'Special',
    sizes: ['Free Size'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C'],
  },
  {
    id: 17, category: 'Handkerchief', subCategory: 'Personalised',
    img: handkerchief7, img2: handkerchief1,
    name: 'Rakhi Special Custom',
    desc: 'Special Rakhi custom handkerchief.',
    price: 199, badge: 'Festival',
    sizes: ['Free Size'],
    colors: ['#FFA500', '#FFFFFF', '#8B0000'],
  },

  // ── COUPLE WEAR ──
  {
    id: 23, category: 'Couple Wear', subCategory: 'Normal Print',
    img: coupleWear1, img2: coupleWear2, img3: coupleWear3,
    name: 'Bear Couple Wear',
    desc: 'Adorable bear theme matching outfit for couples.',
    price: 999, badge: 'Couple',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F4C2C2', '#C9A84C', '#1a1a1a'],
  },
  {
    id: 24, category: 'Couple Wear', subCategory: 'Normal Print',
    img: coupleWear2, img2: coupleWear3,
    name: 'Cartoon Couple Wear',
    desc: 'Fun cartoon theme matching couple outfit.',
    price: 1099, badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1a1a1a', '#C9A84C'],
  },
  {
    id: 25, category: 'Couple Wear', subCategory: 'Personalised',
    img: coupleWear3, img2: coupleWear4,
    name: 'Dudu & Bubu Special',
    desc: 'Sweet Dudu & Bubu theme couple matching wear.',
    price: 1199, badge: 'Special',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F4C2C2', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 26, category: 'Couple Wear', subCategory: 'Normal Print',
    img: coupleWear4, img2: coupleWear5,
    name: 'Harry Potter Couple',
    desc: 'Magical Harry Potter theme matching couple outfit.',
    price: 1299, badge: 'Trending',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#8B0000', '#C9A84C'],
  },
  {
    id: 27, category: 'Couple Wear', subCategory: 'Normal Print',
    img: coupleWear5, img2: coupleWear6,
    name: 'Pizza Couple Wear',
    desc: 'Fun and quirky pizza theme couple matching wear.',
    price: 999, badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFA500', '#FFFFFF', '#1a1a1a'],
  },
  {
    id: 28, category: 'Couple Wear', subCategory: 'Normal Print',
    img: coupleWear6, img2: coupleWear1,
    name: 'Tom & Jerry Couple',
    desc: 'Classic Tom & Jerry theme couple matching outfit.',
    price: 1099, badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#C9A84C', '#1a1a1a', '#FFFFFF'],
  },

  // ── HOODIE ──
  {
    id: 29, category: 'Hoodie', subCategory: 'Normal Print',
    img: hoodie1, img2: hoodie2, img3: hoodie3,
    name: 'Bear Hoodie',
    desc: 'Cozy and warm custom hoodie with cute bear design.',
    price: 1299, badge: 'New',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1a1a1a', '#F4C2C2', '#C9A84C'],
  },
  {
    id: 30, category: 'Hoodie', subCategory: 'Normal Print',
    img: hoodie2, img2: hoodie3,
    name: 'Forever Hoodie',
    desc: 'Premium custom hoodie with Forever print.',
    price: 1399, badge: 'Popular',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 31, category: 'Hoodie', subCategory: 'Normal Print',
    img: hoodie3, img2: hoodie4,
    name: 'Harry Potter Hoodie',
    desc: 'Magical Harry Potter themed custom hoodie.',
    price: 1499, badge: 'Trending',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#8B0000', '#C9A84C', '#1B3A6B'],
  },
  {
    id: 32, category: 'Hoodie', subCategory: 'Hand Painted',
    img: hoodie4, img2: hoodie5,
    name: 'Human Heart Hoodie',
    desc: 'Unique human heart design custom hoodie.',
    price: 1399, badge: 'Unique',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#8B0000', '#1a1a1a', '#FFFFFF'],
  },
  {
    id: 33, category: 'Hoodie', subCategory: 'Personalised',
    img: hoodie5, img2: hoodie6,
    name: 'Mine Forever Hoodie',
    desc: 'Romantic Mine Forever custom hoodie.',
    price: 1299, badge: 'Gift',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#F4C2C2', '#FFFFFF', '#C9A84C'],
  },
  {
    id: 34, category: 'Hoodie', subCategory: 'Normal Print',
    img: hoodie6, img2: hoodie7,
    name: 'Panda Hoodie',
    desc: 'Cute panda design premium custom hoodie.',
    price: 1299, badge: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#1a1a1a', '#888'],
  },
  {
    id: 35, category: 'Hoodie', subCategory: 'Normal Print',
    img: hoodie7, img2: hoodie1,
    name: 'Sun & Moon Hoodie',
    desc: 'Beautiful sun and moon design custom hoodie.',
    price: 1399, badge: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFA500', '#1a1a1a', '#C9A84C', '#1B3A6B'],
  },
];

export default function Products() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const getInitialCategory = () => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (!cat) return { main: 'All', category: 'All' };
    if (['Men Shirts', 'Mens T-Shirt', 'Men Kurta'].includes(cat))
      return { main: 'Men', category: cat };
    if (['Women Kurti', 'Women Shirt', 'Women T-Shirt'].includes(cat))
      return { main: 'Women', category: cat };
    if (cat === 'Couple Wear') return { main: 'Couple', category: cat };
    if (cat === 'Hoodie') return { main: 'Winter', category: cat };
    if (cat === 'Handkerchief') return { main: 'Handkerchief', category: cat };
    return { main: 'All', category: 'All' };
  };

  const initial = getInitialCategory();
  const [activeMain, setActiveMain] = useState(initial.main);
  const [activeCategory, setActiveCategory] = useState(initial.category);
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currentImg, setCurrentImg] = useState(0);
  const [cartMsg, setCartMsg] = useState('');

  const getCategoriesForMain = (main) => {
    if (main === 'All') return [];
    return subCategoryMap[main] || [];
  };

  const filtered = allProducts
    .filter(p => {
      if (activeMain === 'All') return true;
      const cats = subCategoryMap[activeMain] || [];
      const allCats = cats.filter(c => c !== 'All');
      return allCats.includes(p.category);
    })
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => activeSubCategory === 'All' || p.subCategory === activeSubCategory)
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0;
    });

  const subCategories = ['All', ...new Set(
    allProducts
      .filter(p => activeCategory === 'All' || p.category === activeCategory)
      .map(p => p.subCategory)
      .filter(Boolean)
  )];

  const openProduct = (p) => {
    setSelectedProduct(p);
    setSelectedSize('');
    setSelectedColor('');
    setCurrentImg(0);
    setCartMsg('');
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setCartMsg('');
  };

  const getImages = (p) => [p.img, p.img2, p.img3, p.img4].filter(Boolean);

  const handleBuyNow = () => {
    if (!user) { navigate('/login'); return; }
    if (!selectedSize) { alert('Please select a size.'); return; }
    navigate('/checkout', {
      state: {
        item: {
          ...selectedProduct,
          size: selectedSize,
          color: selectedColor,
          quantity: 1,
          cartId: Date.now(),
        }
      }
    });
  };

  const handleAddToCart = () => {
    if (!user) { navigate('/login'); return; }
    if (!selectedSize) { alert('Please select a size.'); return; }
    addToCart(selectedProduct, selectedSize, selectedColor);
    setCartMsg(`✅ "${selectedProduct.name}" added to cart!`);
  };

  return (
    <>
      <style>{`
        .products-page {
          min-height: 100vh;
          padding: 100px 60px 80px;
          background: #0A0A0A;
        }
        .back-btn-prod {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #888;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          margin-bottom: 32px;
          transition: color 0.2s;
          padding: 0;
        }
        .back-btn-prod:hover { color: #C9A84C; }
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
        .sub-filter-wrap { margin-top: 16px; }
        .sub-filter-label {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 10px;
        }
        .sub-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .sub-tab {
          padding: 7px 16px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: 1px solid rgba(201,168,76,0.15);
          background: transparent;
          color: #666;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
        }
        .sub-tab:hover { border-color: rgba(201,168,76,0.4); color: #C9A84C; }
        .sub-tab.active {
          border-color: #C9A84C;
          background: rgba(201,168,76,0.12);
          color: #C9A84C;
        }
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
        .product-card:hover .product-img-area img { transform: scale(1.05); }
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
          margin-bottom: 4px;
        }
        .product-subcategory {
          font-size: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
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
        .modal-thumb.active { border-color: #C9A84C; opacity: 1; }
        .modal-right { padding: 28px; overflow-y: auto; }
        .modal-category {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 4px;
        }
        .modal-subcategory {
          font-size: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
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
        .cart-success-msg {
          background: rgba(76,175,80,0.1);
          border: 1px solid rgba(76,175,80,0.3);
          color: #4CAF50;
          padding: 10px 14px;
          font-size: 11px;
          letter-spacing: 1px;
          margin-bottom: 12px;
          text-align: center;
        }
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
        <button className="back-btn-prod" onClick={() => navigate(-1)}>
          <FiArrowLeft size={14} /> Back
        </button>

        <div className="products-header">
          <p className="section-eyebrow">Our Collection</p>
          <h1 className="section-title">All Products</h1>
          <div className="section-line"></div>

          <div className="filter-row">
            <div className="category-tabs">
              {mainCategories.map(main => (
                <button
                  key={main}
                  className={`cat-tab ${activeMain === main ? 'active' : ''}`}
                  onClick={() => {
                    setActiveMain(main);
                    setActiveCategory('All');
                    setActiveSubCategory('All');
                  }}
                >
                  {main}
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

          {activeMain !== 'All' && getCategoriesForMain(activeMain).length > 2 && (
            <div className="sub-filter-wrap">
              <p className="sub-filter-label">Filter by Type</p>
              <div className="sub-tabs">
                {getCategoriesForMain(activeMain).map(cat => (
                  <button
                    key={cat}
                    className={`sub-tab ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat);
                      setActiveSubCategory('All');
                    }}
                  >
                    {cat === 'All' ? 'All' :
                     cat === 'Men Shirts' ? 'Shirts' :
                     cat === 'Mens T-Shirt' ? 'T-Shirt' :
                     cat === 'Men Kurta' ? 'Kurta' :
                     cat === 'Women Kurti' ? 'Kurti' :
                     cat === 'Women Shirt' ? 'Shirt' :
                     cat === 'Women T-Shirt' ? 'T-Shirt' :
                     cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeCategory !== 'All' && subCategories.length > 2 && (
            <div className="sub-filter-wrap" style={{ marginTop: '12px' }}>
              <p className="sub-filter-label">Filter by Print Type</p>
              <div className="sub-tabs">
                {subCategories.map(sub => (
                  <button
                    key={sub}
                    className={`sub-tab ${activeSubCategory === sub ? 'active' : ''}`}
                    onClick={() => setActiveSubCategory(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="products-count">{filtered.length} Products Found</p>
        </div>

        <div className="products-grid">
          {filtered.map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-img-area">
                {p.img ? (
                  <img src={p.img} alt={p.name} />
                ) : (
                  <div style={{
                    width: '100%', height: '280px',
                    background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '12px',
                  }}>
                    <span style={{ fontSize: '72px' }}>{p.icon}</span>
                    <span style={{ fontSize: '10px', letterSpacing: '3px', color: '#444', textTransform: 'uppercase' }}>
                      Image Coming Soon
                    </span>
                  </div>
                )}
                {p.badge && <span className="product-badge">{p.badge}</span>}
              </div>
              <div className="product-info">
                <p className="product-category">{p.category}</p>
                {p.subCategory && <p className="product-subcategory">{p.subCategory}</p>}
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
            <div className="modal-left">
              <button className="modal-close-btn" onClick={closeProduct}>
                <FiX size={14} />
              </button>
              <div style={{ position: 'relative' }}>
                <img
                  className="modal-main-img"
                  src={getImages(selectedProduct)[currentImg]}
                  alt={selectedProduct.name}
                />
                {selectedColor && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: selectedColor,
                      mixBlendMode: 'multiply',
                      opacity: selectedColor === '#FFFFFF' ? 0 : 0.35,
                      pointerEvents: 'none',
                      transition: 'opacity 0.3s',
                    }}
                  />
                )}
                {selectedColor && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(0,0,0,0.7)',
                      border: '1px solid rgba(201,168,76,0.4)',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '10px',
                      letterSpacing: '1px',
                      color: '#F5F0E8',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: selectedColor,
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}
                    />
                    Preview
                  </div>
                )}
              </div>
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

            <div className="modal-right">
              <p className="modal-category">{selectedProduct.category}</p>
              {selectedProduct.subCategory && (
                <p className="modal-subcategory">✦ {selectedProduct.subCategory}</p>
              )}
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

              {cartMsg && <div className="cart-success-msg">{cartMsg}</div>}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '11px', letterSpacing: '2px' }}
                  onClick={handleBuyNow}
                >
                  {user ? '🛍️ Buy Now →' : 'Login to Buy →'}
                </button>
                <button
                  className="btn-outline"
                  style={{ width: '100%', padding: '14px', fontSize: '11px', letterSpacing: '2px', textAlign: 'center' }}
                  onClick={handleAddToCart}
                >
                  🛒 Add to Cart
                </button>
                <button
                  style={{
                    width: '100%', padding: '12px', fontSize: '10px',
                    letterSpacing: '2px', textAlign: 'center',
                    background: 'transparent',
                    border: '1px dashed rgba(201,168,76,0.3)',
                    color: '#888', cursor: 'pointer',
                    fontFamily: "'Jost', sans-serif",
                    textTransform: 'uppercase', transition: 'all 0.2s',
                  }}
                  onClick={() => {
                    closeProduct();
                    navigate('/customize', {
                      state: {
                        product: selectedProduct.name,
                        size: selectedSize,
                        color: selectedColor,
                      }
                    });
                  }}
                >
                  ✏️ Want Custom Design Instead?
                </button>
              </div>

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