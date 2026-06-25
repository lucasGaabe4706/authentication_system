//sections Formulário
const sectionLogin = document.getElementById("login-section");
const sectionRegister = document.getElementById("register-section");

//Formulários
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

//Fomulário login
const emailInputLogin = document.getElementById("email-login");
const passwordInputLogin = document.getElementById("password-login");
const registerButton = document.getElementById("register-button");
const returnLoginButton = document.getElementById("login-button");

//Formulário Registro
const usernameRegister = document.getElementById("register-username");
const emailInputRegister = document.getElementById("register-email");
const passwordInputRegister = document.getElementById("register-password");
//toggleRecruiter
const companyRegister = document.getElementById("nome-empresa");

//Componentes
const toast = document.getElementById("toast");
const toggleRecruiter = document.getElementById("isRecruiter");
const companyInputs = document.getElementById("question-company");

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

registerForm.addEventListener("submit", function (event) {
	event.preventDefault();
	const username = usernameRegister.value;
	const email = emailInputRegister.value;
	const password = passwordInputRegister.value;
	const recrutador = toggleRecruiter.checked;
	const companyName = companyRegister.value;

	if (username.trim() === "") {
		exibirMensagem("Por favor, digite o seu nome", "aviso");
		return;
	}
	if (email.trim() === "") {
		exibirMensagem("O e-mail não pode estar vazio", "erro");
		return;
	}
	if (password.trim() === "") {
		exibirMensagem("A senha não pode estar vazia", "erro");
		return;
	}
	if (recrutador === true && companyName.trim() === "") {
		exibirMensagem("Por favor, digite o nome da empresa", "aviso");
		return;
	}
	enviarDadosRegistro(username, email, password, recrutador, companyName);
});

function exibirMensagem(mensagem, tipo) {
	toast.style.display = "block";
	toast.textContent = mensagem;
	if (tipo === "erro") {
		toast.style.backgroundColor = "red";
	} else if (tipo === "sucesso") {
		toast.style.backgroundColor = "green";
	} else if (tipo === "aviso") {
		toast.style.backgroundColor = "orange";
	}
	setTimeout(function () {
		toast.style.display = "none";
	}, 3000);
}

registerButton.addEventListener("click", changeToRegister);
returnLoginButton.addEventListener("click", changeToLogin);

function changeToRegister(event) {
	event.preventDefault();
	sectionLogin.classList.add("hidden");
	sectionRegister.classList.remove("hidden");
}

function changeToLogin(event) {
	event.preventDefault();

	sectionLogin.classList.remove("hidden");
	sectionRegister.classList.add("hidden");
}

toggleRecruiter.addEventListener("change", showCompanyInput);

function showCompanyInput(event) {
	if (toggleRecruiter.checked) {
		companyInputs.classList.remove("hidden");
	} else {
		companyInputs.classList.add("hidden");
	}
}

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

async function enviarDadosRegistro(
	nome,
	email,
	senha,
	recrutador,
	nome_empresa,
) {
	const url = "http://localhost:3000/register";

	const dadosRegistro = {
		nome,
		email,
		senha,
		recrutador,
		nome_empresa,
	};

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dadosRegistro),
	});

	const data = await response.json();

	if (response.ok) {
		exibirMensagem(data.mensagem, "sucesso");
		sectionLogin.classList.remove("hidden");
		sectionRegister.classList.add("hidden");
	} else {
		exibirMensagem(data.erro, "erro");
	}
}
