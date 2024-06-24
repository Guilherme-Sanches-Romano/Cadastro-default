function consultarCEP() {
    var cepInput = document.getElementById('cep');
    var estadoInput = document.getElementById('estado');
    var cidadeInput = document.getElementById('cidade');
    var ruaInput = document.getElementById('rua');

    // Função para tratar a resposta da requisição
    function preencherCamposComCEP(dados) {
        estadoInput.value = dados.uf;
        cidadeInput.value = dados.localidade;
        ruaInput.value = dados.logradouro;
    }

    // Event listener para o evento blur no input "cep"
    cepInput.addEventListener('blur', function() {
        var cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP

        if (cep.length !== 8) {
            alert('CEP inválido. Informe um CEP válido com 8 dígitos.');
            return;
        }

        // Monta a URL da requisição para o serviço ViaCEP
        var url = 'https://viacep.com.br/ws/' + cep + '/json/';

        // Faz a requisição HTTP GET usando fetch
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado. Verifique o CEP informado.');
                } else {
                    preencherCamposComCEP(data);
                }
            })
            .catch(error => {
                console.error('Erro ao consultar ViaCEP:', error);
                alert('Erro ao consultar ViaCEP. Por favor, tente novamente mais tarde.');
            });
    });
}
consultarCEP()