import express from 'express';
import { getSemrushData, mozData } from '../controllers/seoController.js';
// import multer from 'multer';


const router = express.Router();

// const upload = multer({ dest: 'src/uploads/' });

router.post('/semrush' , getSemrushData);
router.post('/mozdata' , mozData)
// router.post('/convert' ,upload.single('file') , fileConvert)




export default router