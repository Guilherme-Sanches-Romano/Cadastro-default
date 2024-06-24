export default function ehSenhaForte(campo){
    const senha = campo.value;
    if(!validaSenha(senha)){
        campo.setCustomValidity("A senha deve ter mínimo de 8 caracteres com números, letrar, maiúsculas, minúsculas e pelo menos um caracter especial.");
    }

}

function validaSenha(senha){
    var temLetraMinuscula = false;
    var temLetraMaiuscula = false;
    var temNumero = false;
    var temCaractereEspecial = false;

    var caracteresEspeciais = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    for (var i = 0; i < senha.length; i++) {
        var char = senha.charAt(i);

        if (char >= 'a' && char <= 'z') {
            temLetraMinuscula = true;
        } else if (char >= 'A' && char <= 'Z') {
            temLetraMaiuscula = true;
        } else if (char >= '0' && char <= '9') {
            temNumero = true;
        } else if (caracteresEspeciais.test(char)) {
            temCaractereEspecial = true;
        }
    }

    // Verificar se a senha possui todos os requisitos
    return temLetraMinuscula && temLetraMaiuscula && temNumero && temCaractereEspecial;
}
