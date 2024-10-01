import express from 'express';
import { getSemrushData, mozData ,linkedin_scraper } from '../controllers/seoController.js';



const router = express.Router();



router.post('/semrush' , getSemrushData);
router.post('/mozdata' , mozData)
router.post('/linkedin-scrape' , linkedin_scraper)




export default router