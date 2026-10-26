import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return PRODUCTS.filter((p) => p.slug !== 'keris-tuah').map((p) => ({
    slug: p.slug,
  }));
}

export default function DynamicProductPage({ params }: { params: { slug: string } }) {
  if (params.slug === 'keris-tuah') {
    notFound();
  }

  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
