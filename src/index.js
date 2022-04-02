const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");
const userRouter = require("./routes/user");
const typesRouter = require("./routes/types");
const authRouter = require("./routes/auth");

app.use(bodyParser.json());
app.use((req, res, prox) => {
	let requestedType = req.header("Accept");

	if (requestedType === "*/*") {
		requestedType = "application/json";
	}

	res.setHeader("Content-Type", requestedType);
	prox();
});

app.use("/user", userRouter);
app.use("/types", typesRouter);
app.use("/auth", authRouter);

app.use((err, req, res, prox) => {
	res.status(400).send(err);
});

app.listen(config.get("api.porta"), () => console.log("API RUNNING PORT 4547"));
