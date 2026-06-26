const express = require("express");
const router = express.Router();
const usuarios = require("../data/users");

router.post("/", (req, res) => {
	const { email, senha } = req.body;

	if (!email || !senha) {
		return res.status(400).json({
			erro: "Usuário e senha são obrigatórios",
		});
	}
	const usuarioExistente = usuarios.find(function (usuario) {
		return usuario.email === email && usuario.password === senha;
	});
	if (usuarioExistente) {
		return res
			.status(200)
			.json({ sucesso: true, mensagem: "login realizado com sucesso" });
	} else {
		return res.status(401).json({ erro: "Usuário ou senha inválidos" });
	}
});

module.exports = router;
