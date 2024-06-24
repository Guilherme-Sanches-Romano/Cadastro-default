import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
import ehSenhaForte from "./valida-senha.js";
const camposDoFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]');
const senha = document.getElementById('senha')

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    window.location.href = "./abrir-conta-form-2.html";
})

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    senha:{
        valueMissing: "O campo de senha não pode estar vazio.",
        customError: "A senha deve ter mínimo de 8 caracteres com números, letrar, maiúsculas, minúsculas e pelo menos um caracter especial.",      
        tooShort: "Por favor, preencha uma senha válida."
    },
    confirmarSenha:{
        valueMissing: "O campo de confirmar senha não pode estar vazio.",
        customError: "O campo confirmar senha deve estar condizente com o campo senha.",
       
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        tooShort: "O campo de CEP não tem caractéres suficientes."
    },
    estado:{
        valueMissing: 'O campo de estado não pode estar vazio.'
    },
    cidade:{
        valueMissing: 'O campo de cidade não pode estar vazio.'
    },
    rua:{
        valueMissing: 'O campo de rua não pode estar vazio.'
    },
    enderecoNum:{
        valueMissing: 'O campo de número do endereço não pode estar vazio.'    
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }
    if(campo.name == "senha" && campo.value != ""){
        ehSenhaForte(campo);
    }
    if(campo.name == "confirmarSenha" && campo.value !="" && campo.value != senha.value){
        campo.setCustomValidity("O campo confirmar senha deve estar condizente com o campo senha.")
    }
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}