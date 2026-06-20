//Formulários
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

//Fomulário login
const emailInputLogin = document.getElementById("email-login");
const passwordInputLogin = document.getElementById("password-login");
const loginHeader = document.getElementById("login-header");
const registerButton = document.getElementById("register-button");
const returnLoginButton = document.getElementById("login-button");
//Componentes
const toast = document.getElementById("toast");

loginForm.addEventListener("submit", function (event) {
	event.preventDefault();
	const emailDigitado = emailInputLogin.value;
	const senhaDigitada = passwordInputLogin.value;

	if (emailDigitado.trim() === "") {
		exibirMensagem("O e-mail não pode estar vazio", "erro");
		return;
	}
	if (senhaDigitada.trim() === "") {
		exibirMensagem("A senha não pode estar vazia", "erro");
		return;
	} else {
		enviarDados(emailDigitado, senhaDigitada);
	}
});

async function enviarDados(email, senha) {
	const url = "http://localhost:3000/login";

	const dados = {
		email,
		senha,
	};

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dados),
	});

	const data = await response.json();

	if (response.ok) {
		window.location.href = "home.html";
	} else {
		exibirMensagem(data.erro, "erro");
	}
}

function exibirMensagem(mensagem, tipo) {
	toast.style.display = "block";
	toast.textContent = mensagem;
	if (tipo === "erro") {
		toast.style.backgroundColor = "red";
	}
	setTimeout(function () {
		toast.style.display = "none";
	}, 3000);
}
registerButton.addEventListener("click", changeToRegister);
returnLoginButton.addEventListener("click", changeToLogin);

function changeToRegister(event) {
	event.preventDefault();

	loginForm.style.display = "none";
	registerForm.style.display = "block";
	loginHeader.style.display = "none";
}

function changeToLogin(event) {
	event.preventDefault();

	loginForm.style.display = "block";
	registerForm.style.display = "none";
	loginHeader.style.display = "block";
}
