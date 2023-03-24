//controllo credenziali

//prendo dipendenti da localstorage
let dipendenti = JSON.parse(localStorage.getItem("dipendenti"));
let tickets = JSON.parse(localStorage.getItem("tickets"));

const tabellaHandyman = document.getElementById("handyman-table");
//inizializzo tabella
tabellaHandyman.textContent = " ";
const table = document.createElement('table');
table.setAttribute("class", "table");
table.setAttribute("id", "tabellaHandyman");
// Crea l'intestazione della tabella
const intestazioneTabella = table.createTHead();
const rigaIntestazione = intestazioneTabella.insertRow();
const intestazioneNome = rigaIntestazione.insertCell();
intestazioneNome.setAttribute("scope", "col");
const intestazioneEmail = rigaIntestazione.insertCell();
const intestazioneTelefono = rigaIntestazione.insertCell();
const intestazioneDettagli = rigaIntestazione.insertCell();
const intestazioneHandyman = rigaIntestazione.insertCell();
const intestazioneOre = rigaIntestazione.insertCell();
const intestazioneNote = rigaIntestazione.insertCell();
intestazioneNome.textContent = 'Nome';
intestazioneEmail.textContent = 'e-mail';
intestazioneTelefono.textContent = 'Telefono';
intestazioneDettagli.textContent = 'Dettagli';
intestazioneHandyman.textContent = 'Stato';
intestazioneOre.textContent = 'mezzore Lavoro';
intestazioneNote.textContent = 'Note/Materiali';

// Crea il corpo della tabella
const corpoTabella = table.createTBody();
// Itera gli interventi e aggiunge una riga alla tabella per ogni intervento
let cont = 0;
tickets.forEach(ticket => {
    if (ticket.stato == "assegnato") {
        const riga = corpoTabella.insertRow();
        const cellaNome = riga.insertCell();
        const cellaEmail = riga.insertCell();
        const cellaTelefono = riga.insertCell();
        const cellaDettagli = riga.insertCell();
        const cellaHandyman = riga.insertCell();
        const cellaOre = riga.insertCell();
        const cellaNote = riga.insertCell();
        // Popola le celle della riga con i dati dell'intervento
        cellaNome.textContent = ticket.nome;
        cellaEmail.textContent = ticket.email;
        cellaTelefono.textContent = ticket.telefono;
        cellaDettagli.textContent = ticket.dettagli;
        cellaHandyman.textContent = ticket.nomeHandyman;
        let inputTag = document.createElement("input");
        inputTag.setAttribute("class", "form-control");
        inputTag.setAttribute("id", "ore" + cont);
        inputTag.type = "number";
        /*inputTag.value = 0;
        inputTag.addEventListener("change", ()=>{
            ticket.mezzore = inputTag.value
        });*/
        cellaOre.appendChild(inputTag);
        //cella per le note
        let textBox = document.createElement("textarea");
        textBox.setAttribute("name", "nota");
        textBox.setAttribute("id", "notaTuttofare" + cont);
        textBox.setAttribute("class", "fotrm-control");
        cellaNote.appendChild(textBox);
        //assegnazione del lavoro
        /*let assegnazione = document.getElementById("selectAssegnazione");
        console.log(assegnazione);*/
        /*// Crea una lista non ordinata per i prezzi dell'intervento
        const listaPrezzi = document.createElement('ul');
        for (const [servizio, prezzo] of Object.entries(intervento.prezzi)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${servizio}: ${prezzo} euro`;//virgolette inverse per mettere variabili all'interno della stringa
            listaPrezzi.appendChild(listItem);
        }
        // Aggiunge la lista dei prezzi alla cella dei prezzi della riga
        cellaPrezzi.appendChild(listaPrezzi);*/
        cont++;
    }
});
//setting dei tickets
let btnConsegna = document.getElementById("consegna-lavoro");
btnConsegna.addEventListener("click", () => {
    //event.preventDefault();
    let i = 0;
    tickets.forEach(ticket => {
        let inputTag = document.getElementById("ore" + i);
        ticket.mezzore = inputTag.value;
        let textBox = document.getElementById("notaTuttofare" + i);
        ticket.note = textBox.value;
        ticket.stato = "completato";
        let totalePrezzo;
        dipendenti.forEach(dipendente => {
            if (dipendente.nome == ticket.nomeHandyman) {
                if(ticket.intervento == "Pittura"){
                    totalePrezzo = 250 + (ticket.mezzore * dipendente.costoOra);
                }else{
                    totalePrezzo = 250 + (ticket.mezzore * (dipendente.costoOra / 2));
                }
            }
        });
        ticket.prezzo = "" + totalePrezzo;
        //salvataggio ticket
        let ticketsAggiornati = JSON.stringify(tickets);
        console.log(ticketsAggiornati);
        localStorage.setItem("tickets", JSON.stringify(tickets));
        if (i == cont) {
            breack;
        }
        i++;
    });
    location.reload();
});
//console.log(assegnazione.value);
/*assegnazione.addEventListener("change", () => {
    cellaStato.textContent = "Assegnato";
});*/


// Aggiunge la tabella ticket alla pagina HTML

const titolo = document.getElementById("handymanTitle");
//inizializzo il titolo
titolo.textContent = "ecco le tue ticket";
tabellaHandyman.appendChild(table);

