import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.slice(0, 4);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-[url('/kinga-howard.jpg')] bg-cover bg-center bg-no-repeat py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg tracking-tight"
          >
            Elevate Your <span className="text-primary">Shopping</span> Game
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light text-white/80"
          >
            Premium picks. Smooth experience. Delivered with style.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
          >
            <Button
              size="lg"
              className="backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 text-white text-lg px-8 py-4 rounded-xl font-medium shadow-md"
              asChild
            >
              <Link to="#products">Explore Now</Link>
            </Button>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center items-start">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-serif tracking-tight">
            Featured <span className="text-primary">Products</span>
          </h2>

          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="rounded-3xl p-1 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-xl backdrop-blur-sm hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="rounded-[inherit] overflow-hidden bg-stone-900 text-white">
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="py-24 bg-muted text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-14 tracking-tight">
            All <span className="text-primary">Products</span>
          </h2>

          {/* Filters */}
          <div className="mb-12 space-y-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer px-5 py-2.5 text-sm rounded-full transition-all duration-300 border ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-md border-transparent"
                      : "bg-background text-muted-foreground border-border dark:bg-stone-800"
                  }`}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className="max-w-md mx-auto">
              <Input
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-full px-5 py-3 bg-white dark:bg-stone-900 border border-border shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="transition-transform hover:scale-[1.02]"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
