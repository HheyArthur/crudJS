//Valida o select do genero e fazer um filtro pro favorito e para o genero

document.querySelector("#salvar").addEventListener("click", cadastrar)

// document.querySelector("#editar").addEventListener("click", editar)


let filmes = []

window.addEventListener("load", () => {
    filmes = JSON.parse(localStorage.getItem("filmes")) || []
    atualizar(filmes)
})

window.addEventListener("load", () => {
    carregarFilmes();
    atribuirEventoFavorito();
    atualizar(filmes);
  });



document.querySelector("#filtrar").addEventListener("click", aplicarFiltros);







// Funções

function cadastrar() {
    // Obtendo valores dos campos do formulário


    const nome = document.querySelector("#nome").value
    const duracao = document.querySelector("#duracao").value
    const genero = document.querySelector("#genero").value
    const autor = document.querySelector("#autor").value
    const ano = document.querySelector("#ano").value
    const notaIMDB = document.querySelector("#notaIMDB").value

    const filmeCadastrado = {
        id: Date.now(),
        nome,
        duracao,
        genero,
        autor,
        ano,
        notaIMDB,
        favorito: false
    }


    if (!isValid(filmeCadastrado.nome, document.querySelector("#nome"))) return
    if (!isValid(filmeCadastrado.duracao, document.querySelector("#duracao"))) return
    if (!isValid(filmeCadastrado.genero, document.querySelector("#genero"))) return
    if (!isValid(filmeCadastrado.ano, document.querySelector("#ano"))) return

    filmes.push(filmeCadastrado)

    atualizar(filmes)

}



function isValid(valor, campo) {
    if (campo.tagName === "SELECT") {
        // Verifica se um item válido foi selecionado
        if (campo.value === "") {
          campo.classList.add("is-invalid");
          campo.classList.remove("is-valid");
          return false;
        }
    }


    if (valor.length == 0) {
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    } else {
        campo.classList.add("is-valid")
        campo.classList.remove("is-invalid")
        return true
    }
    

}




    function excluirFilme(botao) {
        const row = botao.closest("tr"); // Encontra a linha (tr) mais próxima do botão
        const filmeId = parseInt(row.dataset.id); // Obtém o ID do filme armazenado no atributo "data-id"
    
        // Filtra o array de filmes para manter apenas os filmes com IDs diferentes do filme a ser excluído
        filmes = filmes.filter(filme => filme.id !== filmeId);
    
        atualizar(filmes); // Atualiza a tabela após a exclusão
    }
    
    


    function atualizar(lista) {
        localStorage.setItem("filmes", JSON.stringify(filmes));
        const tabela = document.querySelector(".table tbody");
        tabela.innerHTML = "";
        lista.forEach(filme => {
            tabela.innerHTML += criarRegistro(filme);
        });
    
        const favoritos = document.querySelectorAll('.fa-star.fa-regular, .fa-star.fa-solid');
        favoritos.forEach(favorito => {
            favorito.addEventListener('click', favoritar);
        });
    }
    
  

    function favoritar(event) {
        const filmeId = parseInt(event.target.dataset.id);
        const filme = filmes.find(filme => filme.id === filmeId);
        filme.favorito = !filme.favorito; // Alterar o valor de favorito (true ou false)
    
        atualizar(filmes)
        // Atualizar a classe do ícone de favorito com base no valor atual
        event.target.classList.toggle("fa-regular", !filme.favorito);
        event.target.classList.toggle("fa-solid", filme.favorito);
        salvarFilmes()

    }

    function atribuirEventoFavorito() {
        const favoritos = document.querySelectorAll('.fa-solid');
      
        favoritos.forEach(favorito => {
          favorito.addEventListener('click', favoritar);
        })
    
    }

function salvarFilmes() {
  localStorage.setItem("filmes", JSON.stringify(filmes));
}

function carregarFilmes() {
    const filmesSalvos = localStorage.getItem("filmes");
    if (filmesSalvos) {
      filmes = JSON.parse(filmesSalvos);
      atualizar(filmes);
    }
  }


  function aplicarFiltros() {
    const filtroGenero = document.querySelector("#genero").value;
    const filtroAno = parseInt(document.querySelector("#ano").value);
  
    let filmesFiltrados = filmes;
  
    if (filtroGenero) {
      filmesFiltrados = filmesFiltrados.filter(filme => filme.genero === filtroGenero);
    }
  
    if (!isNaN(filtroAno)) {
      filmesFiltrados = filmesFiltrados.filter(filme => filme.ano === filtroAno);
    }
  
    atualizar(filmesFiltrados);
  }
  
  

   



// objeto Registro

// registro de preenchimento

function criarRegistro(filmeCadastrado) {
    const favoritoClass = filmeCadastrado.favorito ? "fa-solid" : "fa-regular";

    const registro = `
        <tr data-id="${filmeCadastrado.id}">
        <td >
                <i class="favorito-icon fa-star fa-2x ${favoritoClass}" data-id="${filmeCadastrado.id}" style="color: #183153;"></i>
                
            </td>
            
            <td>${filmeCadastrado.nome}</td>
            <td>${filmeCadastrado.duracao}</td>
            <td>${filmeCadastrado.genero}</td>
            <td>${filmeCadastrado.autor}</td>
            <td>${filmeCadastrado.ano}</td>
            <td>${filmeCadastrado.notaIMDB}</td>
            <td>
                <button href="#" onClick="excluirFilme(this)" class="btn btn-danger" >Excluir</button>
            </td>
        </tr>
    `;

    return registro;
}

// {/* <button class="btn btn-warning"onClick="editarFilme(this)" > Editar </button> */}