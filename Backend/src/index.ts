import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan"; // keeps a record of all the requests made.
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express(); //creates the server
app.use(express.json()); //express will be able to read the data in the body that is in json format.
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(express.urlencoded({ extended: false }));
app.use(cors());

//ROUTES
//craete home route.
app.get("/", (req, res) => {
  res.send("This is the home route");
});

//PROJECT ROUTES
app.use("/projects", projectRoutes);
//TASK ROUTES
app.use("/tasks", taskRoutes);

//setup server.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
