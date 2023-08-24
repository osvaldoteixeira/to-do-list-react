// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";
import './TodoList.css';

function TodoList(){
  
  const listaStorage = localStorage.getItem('lista')
  const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage):[])
  const [novoItem, setNovoItem] = useState("")

  useEffect(()=>{
    localStorage.setItem('lista', JSON.stringify(lista))
  },[lista])

  function addItem(form){
    form.preventDefault()
    if(!novoItem){
      return;
    }
    setLista([...lista, {text: novoItem, isCompleted: false}])
    setNovoItem("");
    document.getElementById('input-entrada').focus()
  }

  function clicou(index){
    const listaAux = [...lista]
    listaAux[index].isCompleted = !listaAux[index].isCompleted
    setLista(listaAux)
  }

  function deletar(index){
    const listaAux = [...lista]
    listaAux.splice(index, 1)
    setLista(listaAux)
  }

  function delAll(){
    setLista([])
  }

  return(
    <div>
      
      <div className="topo">
      <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="react-logo mt-4 mb-3 text-link dark:text-link-dark w-24 lg:w-28 self-center text-sm mr-0 flex origin-center transition-all ease-in-out"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
        <span className="logotipo">React</span>
      </div>
      <h1>Lista de Tarefas</h1>
      
      <form action="" onSubmit={addItem}>
        <input type="text" placeholder="Adicione uma terefa..." value={novoItem} onChange={(event)=>{setNovoItem(event.target.value)}} id="input-entrada"/>
        {/* <input type="submit" value="Adicionar"/> */}
        <button type="submit">
          <span className="material-icons">
            add_circle
          </span>
          <span className="txt">Adicionar</span>
        </button>
      </form>

      <div className="listaTarefas">
        {
          lista.length < 1 ?
          <div className="listaVazia">
            <span className="material-icons">ballot</span>
            <div className="txt">
              <h2>Lista Vazia!</h2>
              <p>Adicione uma terefa...</p>
            </div>
          </div>
          :
          lista.map((item, index)=>(
            <div key={index} className={item.isCompleted ? "item completo" : "item incompleto"}>
              <span className="tarefa" onClick={()=>{clicou(index)}}>{item.text}</span>
              <div className="options">
                <div className="feito" onClick={()=>{clicou(index)}}>
                  <span className="material-icons">
                    check_circle
                  </span>
                  <span className="txt">Concluída</span>
                </div>
                <div className="res" onClick={()=>{clicou(index)}}>
                  <span className="material-icons">
                    replay
                  </span>
                  <span className="txt">Refazer</span>
                </div>
                <div className="del" onClick={()=>{deletar(index)}}>
                  <span className="material-icons">
                    delete
                  </span>
                  <span className="txt">Excluir</span>
                </div>
              </div>
            </div>
          ))
        }
        {
          lista.length > 0 &&
          <button className="deleteAll" onClick={()=>{delAll()}}>Excluir Todas</button>
        }
      </div>

    </div>
  )
}

export default TodoList