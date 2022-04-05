import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    //Get
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud',homeController.getCRUD)
    router.get('/getCRUD',homeController.displayGetCRUD)
    router.get('/getUser',homeController.getUser)

    //Post
    router.post('/post-crud',homeController.postCRUD)
    router.post('/updateUser',homeController.updateUser)

    return app.use("/", router);
}

module.exports = initWebRoutes;