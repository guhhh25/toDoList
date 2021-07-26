const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');



function criaLi(){
    const li = document.createElement('li')
    return li
}


inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        criaTarefa(inputTarefa.value)
    }
})





function criaBotaoApagar(li){
    li.innerText += '  ';
    const botaoApagar = document.createElement('button')
    
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
}


function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput
    li.classList = 'liNome'
    tarefas.appendChild(li)
    criaBotaoApagar(li)
    salvarTarefas();
    
}

btnTarefa.addEventListener('click', function (e){
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value);
    limpaInput(inputTarefa.value)
    
    
})


function limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus();
}

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas()
    }
})


function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '')
        listaDeTarefas.push(tarefaTexto)
        
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON)

}


function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefas of listaDeTarefas){
        criaTarefa(tarefas)
    }
}

adicionaTarefasSalvas()