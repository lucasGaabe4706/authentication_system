const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
	const { nome, email, senha, recrutador, nome_empresa } = req.body;

	if (!nome || !email || !senha) {
		return res.status(400).json({
			erro: "Campos obrigatórios não preenchidos",
		});
	}
	if (recrutador === true && !nome_empresa) {
		return res.status(400).json({
			erro: "Por favor, digite o nome da empresa",
		});
	}

	return res
		.status(201)
		.json({ sucesso: true, mensagem: "Cadastro realizado com sucesso" });
});

module.exports = router;
