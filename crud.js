// Procurar um jeto de resolver o  botao de excluir e o de salvar

document.querySelector("#salvar").addEventListener("click", cadastrar)

let registroAtributos = []

window.addEventListener("load", () => {
    tarefas = JSON.parse( localStorage.getItem("registroAtributos") ) || []
    atualizar()
})


function atualizar(){
    document.querySelector("#registroAtributos").innerHTML = ""
    tarefas.forEach(registroAtributos => 
        document.querySelector("table tbody").innerHTML += criarRegistro(registroAtributos))
    }


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
    
   if (!isValid(registroAtributos.ID, document.querySelector("#ID"))) return
   if (!isValid(registroAtributos.duracao, document.querySelector("#duracao"))) return
   if (!isValid(registroAtributos.nome, document.querySelector("#nome"))) return
   if (!isValid(registroAtributos.genero, document.querySelector("#genero"))) return
   if (!isValid(registroAtributos.autor, document.querySelector("#autor"))) return
   if (!isValid(registroAtributos.ano, document.querySelector("#ano"))) return
   if (!isValid(registroAtributos.notaIMDB, document.querySelector("#notaIMDB"))) return


    registroAtributos.push(registroAtributos)
    localStorage.setItem("registroAtributos", JSON.stringify(registroAtributos))

    atualizar()


    function isValid(valor, campo){
        if(valor.length == 0){
            campo.classList.add("is-invalid")
            campo.classList.remove("is-valid")
            return false
        }else{
            campo.classList.add("is-valid")
            campo.classList.remove("is-invalid")
            return true
        }
    
    }


    function apagar(botao) {
        botao.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
    }


}


// objeto Registro



    // registro de preenchimento

    function criarRegistro (registroAtributos) {
        const registro = ` 

           
    
           
              <tr class ="tablebody">
                <td>${registroAtributos.ID}</td>
                <td>${registroAtributos.nome}</td>
                <td>${registroAtributos.duracao}</td>
                <td>${registroAtributos.genero}</td>
                <td>${registroAtributos.autor}</td>
                <td>${registroAtributos.ano}</td>
                <td>${registroAtributos.notaIMDB}</td>
               
                <td><button class="btn btn-warning">Editar</button> <button a href="#" onClick="apagar(this)" class="btn btn-danger" title = "apagar tablebody" >Excluir</td>
              </tr>
          
          

        `

        return registro
    }