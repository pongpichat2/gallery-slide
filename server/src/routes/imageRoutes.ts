import { Router, Request, Response } from 'express';
import imageService from '../services/imageService';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 9;
    const keyword = req.query.keyword as string;

    const result = keyword 
      ? imageService.searchByKeyword(keyword, page, pageSize)
      : imageService.getImages(page, pageSize);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
