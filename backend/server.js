const express = require("express");
const { timeStamp } = require("node:console");
const { uptime } = require("node:process");
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/health", (req, res) => {
	res.status(200).json({
		status: "Servidor funcionando",
		timeStamp: new Date(),
		uptime: process.uptime(),
	});

	console.log(timeStamp);
	console.log(uptime);
});

const EMAIL_VALIDO = "admin@admin.com";
const SENHA_VALIDA = "123456";

app.post("/login", (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			erro: "Usuário e senha são obrigatórios",
		});
	} //validação de campo vazio. Manter dupla validação ou obrigação do back?

	if (email === EMAIL_VALIDO && password === SENHA_VALIDA) {
		return res
			.status(200)
			.json({ sucesso: true, mensagem: "login realizado com sucesso" });
	} else {
		return res.status(401).json({ erro: "Usuário ou senha inválidos" });
	}
});

app.listen(PORT, () => {
	console.log(
		`Servidor rodando na porta ${PORT} - Acesse http://localhost:${PORT}`,
	);
});
