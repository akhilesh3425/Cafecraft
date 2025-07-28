import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { motion } from "framer-motion";
// import heroimage from "@/assets/kinga-howard.jpg";
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
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* Hero Section */}
      <section className="relative bg-[url('/kinga-howard.jpg')] bg-cover bg-center bg-no-repeat py-24 md:py-32">
        <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm" />

        <div className="relative container mx-auto px-4 text-center text-stone-100 z-10">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-4xl md:text-6xl font-extrabold font-serif leading-tight mb-6 drop-shadow-xl"
          >
            Discover the Future of{" "}
            <span className="text-amber-500 ">Shopping</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 font-light font-serif drop-shadow"
          >
            Curated products. Seamless experience. Delivered to your door.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
          >
            <Button
              size="lg"
              className="bg-amber-800 text-stone-100 text-lg px-8 py-4 rounded-full font-medium shadow-xl hover:bg-amber-900 hover:scale-105 transition-transform"
              asChild
            >
              <Link to="#products">Explore Now</Link>
            </Button>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-stone-100/50 rounded-full flex justify-center items-start">
              <div className="w-1 h-3 bg-stone-100/70 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-center mb-14 text-stone-900">
            Featured Products
          </h2>
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform transition duration-300 hover:-translate-y-1border border-stone-200/80 dark:border-stone-800"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="py-20 bg-stone-100 dark:bg-stone-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">All Products</h2>

          {/* Filters */}
          <div className="mb-10 space-y-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  // variant={
                  //   selectedCategory === category ? "default" : "outline"
                  // }
                  className={`cursor-pointer px-5 py-2.5 text-sm rounded-full transition-all duration-300 hover:opacity-90 ${
                    selectedCategory === category
                      ? "bg-amber-800 text-stone-100 shadow-md border-transparent"
                      : "bg-white text-stone-600 border border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700"
                  }`}
                  onClick={() => setSelectedCategory(category)}
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
                // className="rounded-xl shadow-md focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
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
