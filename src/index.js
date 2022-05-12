const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");
const userRouter = require("./routes/user");
const typesRouter = require("./routes/types");
const authRouter = require("./routes/auth");
const reportRouter = require("./routes/report");
const cors = require("cors");

app.use(bodyParser.json());

app.use((req, res, prox) => {
	let requestedType = req.header("Accept");

	if (requestedType === "*/*") {
		requestedType = "application/json";
	}

	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE",
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Headers", [
		"Origin",
		"Content-Type",
		"X-Auth-Token",
	]);

	prox();
});

app.use("/user", userRouter);
app.use("/types", typesRouter);
app.use("/auth", authRouter);
app.use("/report", reportRouter);

app.use((err, req, res, prox) => {
	res.status(400).send(err);
});

app.listen(config.get("api.porta"), () => console.log("API RUNNING PORT 4547"));
