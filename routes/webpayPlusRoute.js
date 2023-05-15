
import express from "express";
const router = express.Router();
import pkg from 'transbank-sdk';
const {WebpayPlus} = pkg
import { commit, create, refund, status } from "../controllers/webpayPlusController.js";


// router.use(function (req, res, next) {
//   if (process.env.WPP_CC && process.env.WPP_KEY) {
//     WebpayPlus.configureForProduction(process.env.WPP_CC, process.env.WPP_KEY);
//     console.log('produccion');
//   } else {
    console.log('testing');
    WebpayPlus.configureForTesting();
//   }
//   next();
// });

router.get("/create", create);
router.get("/commit", commit);
router.post("/commit", commit);
router.post("/status", status);
router.post("/refund", refund);

export default router
