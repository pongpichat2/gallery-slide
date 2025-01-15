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
  const [initialized, setInitialized] = useState(false);
  const [keyword, setKeyword] = useState('');
  
  // load data is first
  const loadInitialImages = useCallback(async (searchKeyword: string) => {
    if (loading) return;
    setLoading(true);
    
    try {
      const imageData = await getImages(1, 9, searchKeyword);
      console.log('Initial load:', imageData);
      
      setImages(imageData.data);
      setIsLoadMore(imageData.pagination.hasMore);
      setPage(2);
    } catch (error) {
      console.error('Error loading initial images:', error);
      setImages([]);
      setIsLoadMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading]);
  
  const loadMoreImages = useCallback(async () => {
    if (loading || !isLoadMore) return;
    setLoading(true);
    try {
      const imageData = await getImages(page, 9, keyword);
      console.log('Load more:', imageData);
      if (imageData.data.length > 0) {
        setImages(prevImages => [...prevImages, ...imageData.data]);
        setPage(prev => prev + 1);
      }
      setIsLoadMore(imageData.pagination.hasMore);
    } catch (error) {
      console.error('Error loading more images:', error);
      setIsLoadMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, keyword, isLoadMore]);
  
  const keyWordClicked = useCallback((newKeyword: string) => {
    if (loading) return;
    setKeyword(newKeyword);
    setIsLoadMore(true);
    loadInitialImages(newKeyword);
  }, [loading, loadInitialImages]);
  
  // Initial load data 
  useEffect(() => {
    if (!initialized) {
      loadInitialImages('');
      setInitialized(true);
    }
  }, [initialized, loadInitialImages]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 100
      ) {
        if (!loading && isLoadMore) {
          loadMoreImages();
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, isLoadMore, loadMoreImages]);

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