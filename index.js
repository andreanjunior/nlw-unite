
//array > [] <
let participantes = [
  {
    nome: "Andrean Ferreira",
    email: "andrean@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Joana Silva",
    email: "joana.silva@example.com",
    dataInscricao: new Date(2024, 3, 1, 10, 15),
    dataCheckIn: null
  },
  {
    nome: "Pedro Santos",
    email: "pedro.santos@example.com",
    dataInscricao: new Date(2024, 3, 5, 14, 30),
    dataCheckIn: null
  },
  {
    nome: "Mariana Costa",
    email: "mariana.costa@example.com",
    dataInscricao: new Date(2024, 3, 10, 8, 0),
    dataCheckIn: new Date(2024, 3, 14, 12, 15)
  },
  {
    nome: "Rafaela Oliveira",
    email: "rafaela.oliveira@example.com",
    dataInscricao: new Date(2024, 3, 15, 12, 0),
    dataCheckIn: null
  },
  {
    nome: "Carlos Rodrigues",
    email: "carlos.rodrigues@example.com",
    dataInscricao: new Date(2024, 3, 20, 17, 45),
    dataCheckIn: new Date(2024, 3, 24, 20, 0)
  },
  {
    nome: "Ana Sousa",
    email: "ana.sousa@example.com",
    dataInscricao: new Date(2024, 3, 25, 9, 30),
    dataCheckIn: new Date(2024, 3, 28, 13, 45)
  },
  {
    nome: "Daniel Almeida",
    email: "daniel.almeida@example.com",
    dataInscricao: new Date(2024, 3, 30, 14, 15),
    dataCheckIn: new Date(2024, 4, 3, 18, 30)
  },
  {
    nome: "Sara Pereira",
    email: "sara.pereira@example.com",
    dataInscricao: new Date(2024, 4, 5, 18, 0),
    dataCheckIn: new Date(2024, 4, 8, 22, 15)
  },
  {
    nome: "Filipe Martins",
    email: "filipe.martins@example.com",
    dataInscricao: new Date(2024, 4, 10, 11, 45),
    dataCheckIn: new Date(2024, 4, 14, 15, 0)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
       Confirmar check-in
      </button>
    `

  }



  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
          </strong>
          <br>
          <small>
            ${participante.email}
          </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
  </tr>         
  `
}


const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetiçao - loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)

  }
  // substiruir informaçao do HTML

  document
    .querySelector('tbody')
    .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao : new Date(),
    dataCheckIn: null
  }
  //verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) =>  p.email == participante.email
    
  )

  if(participanteExiste) {
    alert('Email ja cadastrado!')
    return
  }
  participantes = [participante, ...participantes]
  atualizarLista(participantes)
  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}
 const fazerCheckIn = (event)=> {
  //confirmar se quer fazer o check-in
  const mensagemConfirmacao ='Tem certeza que deseja fazer o check-in?'
if(confirm(mensagemConfirmacao)== false) {
  return
}

  //encontrar o participante dentro da lista 
  const participante = participantes.find(
    (p)=> p.email == event.target.dataset.email
  )
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  //atualizar a lista do paticipante
  atualizarLista(participantes)
 }