import { Product } from "@/contexts/CartContext";
import nescafeSachet from "@/assets/nescafe-sachet.jpg";
import nescafeSachet2 from "@/assets/nescafe.jpg";
export const products: Product[] = [
  {
    id: "1",
    name: "Nescafé Classic Sachet",
    price: 99.99,
    image: nescafeSachet,
    description:
      "Aromatic and rich instant coffee sachet for a quick and energizing brew.",
    category: "Coffee",
    rating: 4.5,
    reviews: 12,
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 18.99,
    image: nescafeSachet2,
    description: "Aromatic and rich coffee.",
    category: "Coffee",
    rating: 4.7,
    reviews: 89,
    inStock: true,
  },
  {
    id: "3",
    name: "Laptop Backpack",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    description:
      "Durable laptop backpack with multiple compartments and water-resistant material.",
    category: "Accessories",
    rating: 4.3,
    reviews: 156,
    inStock: true,
  },
  {
    id: "4",
    name: "Smartphone",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    description:
      "Latest smartphone with advanced camera system and lightning-fast processor.",
    category: "Electronics",
    rating: 4.8,
    reviews: 234,
    inStock: true,
  },
  {
    id: "5",
    name: "Running Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    description:
      "Comfortable running shoes with advanced cushioning and breathable material.",
    category: "Sports",
    rating: 4.4,
    reviews: 167,
    inStock: true,
  },
  {
    id: "6",
    name: "Coffee Maker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    description:
      "Programmable coffee maker with thermal carafe and built-in grinder.",
    category: "Home",
    rating: 4.2,
    reviews: 98,
    inStock: true,
  },
  {
    id: "7",
    name: "Wireless Mouse",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    description:
      "Ergonomic wireless mouse with precision tracking and long battery life.",
    category: "Electronics",
    rating: 4.1,
    reviews: 203,
    inStock: true,
  },
  {
    id: "8",
    name: "Yoga Mat",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    description:
      "Non-slip yoga mat with superior grip and cushioning for comfortable practice.",
    category: "Sports",
    rating: 4.6,
    reviews: 145,
    inStock: true,
  },
];

export const categories = [
  "All",
  "Electronics",
  "Accessories",
  "Sports",
  "Home",
];
