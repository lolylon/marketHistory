import prd1 from '../images/mainproducts/prd1.svg';
import prd2 from '../images/mainproducts/prd2.svg';
import prd3 from '../images/mainproducts/prd3.svg';
import prd4 from '../images/mainproducts/prd4.svg';
import prd5 from '../images/mainproducts/prd5.svg';
import prd6 from '../images/mainproducts/prd6.svg';
import prd7 from '../images/mainproducts/prd7.svg';
import prd8 from '../images/mainproducts/prd8.svg';
import prd9 from '../images/mainproducts/prd9.svg';
import prd10 from '../images/mainproducts/prd10.svg';
import prd11 from '../images/mainproducts/prd11.svg';
import prd12 from '../images/mainproducts/prd12.svg';
import prd13 from '../images/mainproducts/prd13.svg';
import prd14 from '../images/mainproducts/prd14.svg';
import prd15 from '../images/mainproducts/prd15.svg';
import prd16 from '../images/mainproducts/prd16.svg';
import prd17 from '../images/mainproducts/prd17.svg';
import prd18 from '../images/mainproducts/prd18.svg';
import prd19 from '../images/mainproducts/prd19.svg';
import prd20 from '../images/mainproducts/prd20.svg';
import prd21 from '../images/mainproducts/prd21.svg';
import prd22 from '../images/mainproducts/prd22.svg';
import prd23 from '../images/mainproducts/prd23.svg';
import prd24 from '../images/mainproducts/prd24.svg';
import prd25 from '../images/mainproducts/prd25.svg';
import newPrd1 from '../images/newproducts/prd1.svg';
import newPrd2 from '../images/newproducts/prd2.svg';
import newPrd3 from '../images/newproducts/prd3.svg';
import newPrd4 from '../images/newproducts/prd4.svg';
import newPrd5 from '../images/newproducts/prd5.svg';
import newPrd6 from '../images/newproducts/prd6.svg';

const products = [
  {
    id: 1,
    name: "LapTop",
    price: 999,
    category: "Smartphones",
    brand: "Apple",
    rating: 4.8,
    isNew: true,
    inStock: true,
    discount: null,
    description: "Latest smartphone with advanced features and powerful performance",
    images: {
      main: prd1,
      gallery: [prd1, prd1, prd1]
    }
  },
  {
    id: 2,
    name: "Msi monitor",
    price: 1499,
    category: "Laptops",
    brand: "Dell",
    rating: 4.6,
    isNew: true,
    inStock: true,
    discount: 10,
    description: "Powerful laptop for professionals with high performance and sleek design",
    images: {
      main: prd2,
      gallery: [prd2, prd2, prd2]
    }
  },
  {
    id: 3,
    name: "Msi monitor Pro",
    price: 1990,
    category: "Audio",
    brand: "Sony",
    rating: 4.5,
    isNew: false,
    inStock: true,
    discount: null,
    description: "Premium sound quality with noise cancellation and long battery life",
    images: {
      main: prd3,
      gallery: [prd3, prd3, prd3]
    }
  },
  {
    id: 4,
    name: "gaming computer",
    price: 1200,
    category: "Wearables",
    brand: "Samsung",
    rating: 4.3,
    isNew: true,
    inStock: true,
    discount: 15,
    description: "Track your fitness and stay connected with this advanced smartwatch",
    images: {
      main: prd10,
      gallery: [prd10, prd10, prd10]
    }
  },
  {
    id: 5,
    name: "Tablet Ultra",
    price: 699,
    category: "Tablets",
    brand: "Apple",
    rating: 4.7,
    isNew: false,
    inStock: true,
    discount: null,
    description: "Portable tablet with high-resolution display and powerful performance",
    images: {
      main: prd11,
      gallery: [prd11, prd11, prd11]
    }
  },
  {
    id: 6,
    name: "Gaming Console",
    price: 499,
    category: "Gaming",
    brand: "Sony",
    rating: 4.9,
    isNew: true,
    inStock: false,
    discount: null,
    description: "Next-generation gaming console with stunning graphics and fast performance",
    images: {
      main: prd12,
      gallery: [prd12, prd12, prd12]
    }
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    price: 149,
    category: "Audio",
    brand: "Apple",
    rating: 4.6,
    isNew: false,
    inStock: true,
    discount: 5,
    description: "True wireless earbuds with immersive sound and comfortable fit",
    images: {
      main: prd13,
      gallery: [prd13, prd13, prd13]
    }
  },
  {
    id: 8,
    name: "4K Smart TV",
    price: 899,
    category: "TVs",
    brand: "LG",
    rating: 4.5,
    isNew: true,
    inStock: true,
    discount: null,
    description: "Ultra HD smart TV with vibrant colors and smart features",
    images: {
      main: prd14,
      gallery: [prd14, prd14, prd14]
    }
  },
  {
    id: 9,
    name: "4K Smart TV",
    price: 899,
    category: "TVs",
    brand: "LG",
    rating: 4.5,
    isNew: true,
    inStock: true,
    discount: null,
    description: "Ultra HD smart TV with vibrant colors and smart features",
    images: {
      main: prd9,
      gallery: [prd9, prd9, prd9]
    }
  },
  {
    id: 10,
    name: "4K Smart TV",
    price: 899,
    category: "TVs",
    brand: "LG",
    rating: 4.5,
    isNew: true,
    inStock: true,
    discount: null,
    description: "Ultra HD smart TV with vibrant colors and smart features",
    images: {
      main: prd15,
      gallery: [prd15, prd15, prd15]
    }
  },
  {
    id: 11,
    name: "4K Smart TV",
    price: 899,
    category: "TVs",
    brand: "LG",
    rating: 4.5,
    isNew: true,
    inStock: true,
    discount: null,
    description: "Ultra HD smart TV with vibrant colors and smart features",
    images: {
      main: prd16,
      gallery: [prd16, prd16, prd16]
    }
  },
  {
    id: 12,
    name: "4K Smart TV",
    price: 899,
    category: "TVs",
    brand: "LG",
    rating: 4.5,
    isNew: true,
    inStock: true,
    discount: null,
    description: "Ultra HD smart TV with vibrant colors and smart features",
    images: {
      main: prd17,
      gallery: [prd17, prd17, prd17]
    }
  }
  
];

export default products;