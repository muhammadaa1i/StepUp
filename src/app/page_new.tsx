"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Slipper, Category } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Slipper[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useI18n();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          apiClient.get(API_ENDPOINTS.SLIPPERS, { limit: 8 }),
          apiClient.get(API_ENDPOINTS.CATEGORIES),
        ]);

        setFeaturedProducts(
          productsResponse.data.data || productsResponse.data
        );
        setCategories(categoriesResponse.data.data || categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(t('errors.productsLoad'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [t]);

  const handleViewProduct = (slipper: Slipper) => {
    router.push(`/products/${slipper.id}`);
  };

  return (
    <div className="space-y-16">
      <HeroSection t={t} />
      <CategoriesSection categories={categories} t={t} />
      <FeaturedProductsSection
        featuredProducts={featuredProducts}
        isLoading={isLoading}
        onViewProduct={handleViewProduct}
        t={t}
      />
      <FeaturesSection t={t} />
      <CTASection t={t} />
    </div>
  );
}
