'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageData } from '@/types';
import { getImages } from '@/services/images';


const ImageGallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [initialized, setInitialized] = useState(false); // เพิ่ม state เพื่อควบคุมการโหลดครั้งแรก
  const [keywordFilter, setKeywordFilter] = useState('');
  
  const loadMoreImages = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const imageData = await getImages(page,9,keywordFilter);
    if (!imageData.pagination.hasMore) {
      setIsLoadMore(false);
    } else {
      setImages(prevImages => [...prevImages, ...imageData.data]);
      setPage(prev => prev + 1);
    }
    setLoading(false);
  }, [page, loading]);
  // แยก useEffect load data
  useEffect(() => {
    if (!initialized) {
      loadMoreImages();
      setInitialized(true);
    }
  }, [initialized, loadMoreImages]);
  
  // useEffect for scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 100 // เพิ่ม threshold
      ) {
        if (!loading && isLoadMore) {
          loadMoreImages();
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, isLoadMore, loadMoreImages]);
  const keyWordClicked = (keyword:string) =>{
      setKeywordFilter(keyword);
  }
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images?.map((image) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative aspect-[4/3]">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {image.keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="secondary" onClick={() => keyWordClicked(keyword)}>
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((n) => (
            <Card key={`skeleton-${n}`} className="overflow-hidden">
              <CardContent className="p-4">
                <Skeleton className="w-full aspect-[4/3] rounded-md" />
                <Skeleton className="h-6 w-3/4 mt-4" />
                <div className="mt-2 flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;