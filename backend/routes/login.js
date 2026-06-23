const express = require("express");
const router = express.Router();

const EMAIL_VALIDO = "admin@admin.com";
const SENHA_VALIDA = "123456";

router.post("/", (req, res) => {
	const { email, senha } = req.body;

	if (!email || !senha) {
		return res.status(400).json({
			erro: "Usuário e senha são obrigatórios",
		});
	}

	if (email === EMAIL_VALIDO && senha === SENHA_VALIDA) {
		return res
			.status(200)
			.json({ sucesso: true, mensagem: "login realizado com sucesso" });
	} else {
		return res.status(401).json({ erro: "Usuário ou senha inválidos" });
	}
});

module.exports = router;
