const express = require("express");
const router = express.Router();
const usuarios = require("../data/users");

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
	const usuario = {
		id: usuarios.length + 1,
		username: nome,
		email: email,
		password: senha,
		recruiter: recrutador,
		companyName: nome_empresa,
	};
	usuarios.push(usuario);
	return res
		.status(201)
		.json({ sucesso: true, mensagem: "Cadastro realizado com sucesso" });
});

module.exports = router;
