// Procurar um jeito de preencher com o botao salvar

document.querySelector("#salvar").addEventListener("click", cadastrar)
console.log

function cadastrar () { 
    // Obtendo valores dos campos do formulário

    const ID = document.querySelector("#ID").value

    const duracao = document.querySelector("#duracao").value
    const nome = document.querySelector("#nome").value
    const genero = document.querySelector("#genero").value
    const autor = document.querySelector("#autor").value
    const ano = document.querySelector("#ano").value
    const notaIMDB = document.querySelector("#notaIMDB").value
    
    const registroAtributos = {
        ID,
        duracao,
        nome,
        genero,
        autor,
        ano,
        notaIMDB
    }
    
    document.querySelector("table tbody").innerHTML += registro



}


// objeto Registro



    // registro de preenchimento

    function criarRegistro (registroAtributos) {
        const registro = ` 

            <tr>
                <!-- <th scope="row"></th> -->
                <!-- <td></td> -->
                <!-- Para adicionar na linha 1 -->
            </tr>
    
           
              <tr>
                <td>${registroAtributos.ID}</td>
                <td>${registroAtributos.nome}</td>
                <td>${registroAtributos.duracao}</td>
                <td>${registroAtributos.genero}</td>
                <td>${registroAtributos.autor}</td>
                <td>${registroAtributos.ano}</td>
                <td>${registroAtributos.notaIMDB}</td>
               
                <td><button class="btn btn-warning">Editar</button> <button class="btn btn-danger">Excluir</td>
              </tr>
          
          

        `

        return registro
    }