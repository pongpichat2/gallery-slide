"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = require("../data/images");
class ImageService {
    getImages(page = 1, pageSize = 9) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedImages = images_1.images.slice(startIndex, endIndex);
        return {
            data: paginatedImages,
            pagination: {
                currentPage: page,
                pageSize: pageSize,
                totalItems: images_1.images.length,
                totalPages: Math.ceil(images_1.images.length / pageSize),
                hasMore: endIndex < images_1.images.length
            }
        };
    }
}
exports.default = new ImageService();
