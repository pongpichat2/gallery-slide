import { Image, PaginationResult } from '../types/image';
import { images } from '../data/images';

class ImageService {
  public getImages(page: number = 1, pageSize: number = 9): PaginationResult<Image> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedImages = images.slice(startIndex, endIndex);
    
    return {
      data: paginatedImages,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalItems: images.length,
        totalPages: Math.ceil(images.length / pageSize),
        hasMore: endIndex < images.length
      }
    };
  }

  public searchByKeyword(
    keyword: string,
    page: number = 1, 
    pageSize: number = 9
  ): PaginationResult<Image> {
    const filteredImages = images.filter(image => 
      image.keywords.some(imgKeyword => 
        imgKeyword.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedImages = filteredImages.slice(startIndex, endIndex);

    return {
      data: paginatedImages,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalItems: filteredImages.length,
        totalPages: Math.ceil(filteredImages.length / pageSize),
        hasMore: endIndex < filteredImages.length
      }
    };
  }
}

export default new ImageService();