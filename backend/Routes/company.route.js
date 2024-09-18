import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getCompanyById, getCompanyDetails, registerCompany, updateCompany } from '../controllers/company.controller.js';
import { singleUpload } from '../middlewares/multer.js';
const router = express.Router();

router.route("/registerCompany").post(isAuthenticated, registerCompany);
router.route("/getCompany").get(isAuthenticated, getCompanyDetails);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);

export default router;
