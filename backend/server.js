const express = require("express");
const { timeStamp } = require("node:console");
const { uptime } = require("node:process");
const cors = require("cors");
const app = express();
const PORT = 3000;

//Rotas
const loginRouter = require("./routes/login.js");

app.use(express.json());

const corsOption = {
	origin: "http://127.0.0.1:5500",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOption));

app.get("/health", (req, res) => {
	res.status(200).json({
		status: "Servidor funcionando",
		timeStamp: new Date(),
		uptime: process.uptime(),
	});

	console.log(timeStamp);
	console.log(uptime);
});

app.use("/login", loginRouter);

app.listen(PORT, () => {
	console.log(
		`Servidor rodando na porta ${PORT} - Acesse http://localhost:${PORT}`,
	);
});

app.use("/login", loginRouter);
