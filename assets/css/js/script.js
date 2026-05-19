/*
  REGOLE
  - Continua quello che hai iniziato stamani in classe.
  - Niente eventi (li vediamo domani): chiama le funzioni dalla console o all'avvio.
  - Solo const/let, mai var. Solo querySelector/querySelectorAll per il DOM.
*/

const lista = document.querySelector("#lista-task");
const contatore = document.querySelector("#contatore");

function aggiungiTask(testo) {
  const li = document.createElement("li");
  li.textContent = testo;
  lista.appendChild(li);
  aggiornaContatore();
}

function aggiornaContatore() {
  const tasks = lista.querySelectorAll("li");
  contatore.textContent = tasks.length;
}

aggiungiTask("Studiare JavaScript");
aggiungiTask("Bere il caffè");
aggiungiTask("Riposarsi");

/* SCRIVI QUI LE TUE FUNZIONI:
   1. Modifica aggiungiTask per accettare priorita
   2. Aggiungi bottone Elimina su ogni task
   3. modificaTask(indice, nuovoTesto)
   4. rimuoviUltimo()
   5. svuotaTutto()
   6. evidenzia(indice) / togliEvidenza(indice)
   7. data automatica nel task
   8. contaPerPriorita()
*/
function aggiungiTask(testo, priorita = "media") {
  const li = document.createElement("li");
  li.classList.add("priorita-" + priorita);

 
  const data = document.createElement("span");
  data.classList.add("data");
  const ora = new Date();
  data.textContent = ora.toLocaleString("it-IT");

   const btnElimina = document.createElement("button");
  btnElimina.classList.add("btn-elimina");
  btnElimina.textContent = "Elimina";
  btnElimina.onclick = () => {
    lista.removeChild(li);
    aggiornaContatore();
  };


  const span = document.createElement("span");
  span.textContent = testo;

  const badge = document.createElement("span");
  badge.classList.add("badge");
  badge.textContent = priorita.toUpperCase();

  li.appendChild(span);
  li.appendChild(badge);
  li.appendChild(data);
  li.appendChild(btnElimina);

  lista.appendChild(li);
  aggiornaContatore();
}

function aggiornaContatore() {
  const tasks = lista.querySelectorAll("li");
  contatore.textContent = tasks.length;
}

function modificaTask(indice, nuovoTesto) {
  const tasks = lista.querySelectorAll("li");
  if (indice < 0 || indice >= tasks.length) {
    console.warn("Indice non valido:", indice);
    return;
  }
  const span = tasks[indice].querySelector("span:not(.badge):not(.data)");
  span.textContent = nuovoTesto;
}


function rimuoviUltimo() {
  const tasks = lista.querySelectorAll("li");
  if (tasks.length === 0) return;
  lista.removeChild(tasks[tasks.length - 1]);
  aggiornaContatore();
}


function svuotaTutto() {
  lista.innerHTML = "";
  aggiornaContatore();
}


function evidenzia(indice) {
  const tasks = lista.querySelectorAll("li");
  if (indice < 0 || indice >= tasks.length) return;
  tasks[indice].classList.add("evidenziato");
}

function toglievidenzia(indice) {
  const tasks = lista.querySelectorAll("li");
  if (indice < 0 || indice >= tasks.length) return;
  tasks[indice].classList.remove("evidenziato");
}


function contaPerPriorita() {
  const tasks = lista.querySelectorAll("li");
  const risultato = { alta: 0, media: 0, bassa: 0 };
  tasks.forEach(li => {
    if (li.classList.contains("priorita-alta")) risultato.alta++;
    else if (li.classList.contains("priorita-media")) risultato.media++;
    else if (li.classList.contains("priorita-bassa")) risultato.bassa++;
  });
  console.log("Alta:", risultato.alta, "| Media:", risultato.media, "| Bassa:", risultato.bassa);
  return risultato;
}

aggiungiTask("Pagare le bollette", "alta");
aggiungiTask("Studiare JavaScript", "media");
aggiungiTask("Comprare il pane", "bassa");
aggiungiTask("Chiamare il dentista", "alta");
aggiungiTask("Riposarsi", "bassa");