import { Router } from "express";
import boardController from "../controllers/board.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middlewares.js";

const boardRouter = Router();

boardRouter.get("/", boardController.findAllBoardController);
boardRouter.get("/:id", boardController.findBoardByIdBoardController);

boardRouter.use(authMiddleware);
boardRouter.get("/byUser/:id", boardController.findAllBoardsUserController);
boardRouter.post("/create", boardController.createBoardController);

boardRouter.use(validId);
boardRouter.patch("/update/:id", boardController.updateBoardController);
boardRouter.patch("/update/:id/addUser", boardController.addUserInBoardController);
boardRouter.delete("/delete/:id", boardController.deleteBoardController)

export default boardRouter;