//struttura dati per tenere contodei dipendenti
//dati dei dipendenti
const dipendenti = [
    {
        id: 1,
        nome: 'Mario Rossi',
        password: "1234",
        eta: 35,
        specializzazione: 'Idraulica',
        esperienza: 8,
        telefono: '3331234567',
        email: 'mario.rossi@gmail.com',
        indirizzo: 'Via Roma 123, Milano',
        costoOra: "15"
    },
    {
        id: 2,
        nome: 'Luca Bianchi',
        password: "1234",
        eta: 40,
        specializzazione: 'Carpenteria',
        esperienza: 12,

        telefono: '3332345678',
        email: 'luca.bianchi@gmail.com',
        indirizzo: 'Via Dante 456, Roma',
        costoOra: "25"

    },
    {
        id: 3,
        nome: 'Giuseppe Verdi',
        password: "1234",
        eta: 28,
        specializzazione: 'Elettricità',
        esperienza: 5,
        telefono: '3333456789',
        email: 'giuseppe.verdi@gmail.com',
        indirizzo: 'Via Garibaldi 789, Napoli',
        costoOra: "10"
    },
    {
        id: 4,
        nome: 'Paolo Neri',
        password: "1234",
        eta: 45,
        specializzazione: 'Interventi domestici',
        esperienza: 15,
        telefono: '3334567890',
        email: 'paolo.neri@gmail.com',
        indirizzo: 'Via Mazzini 321, Firenze',
        costoOra: "30"
    }
];
localStorage.setItem("dipendenti", JSON.stringify(dipendenti));



//prendo il valore dal local storage
let interventi = JSON.parse(localStorage.getItem("interventi"));
//prendo tasks
let tickets = JSON.parse(localStorage.getItem("tickets"));
console.log(tickets);
// Selezione l'elemento della pagina HTML dove inserire la tabella
const tabellaTicket = document.getElementById('ticket-table');

// Crea la tabella HTML per i tiket
const table = document.createElement('table');
table.setAttribute("class", "table");
table.setAttribute("id", "tabellaTicket");
// Crea l'intestazione della tabella
const intestazioneTabella = table.createTHead();
const rigaIntestazione = intestazioneTabella.insertRow();
const intestazioneNome = rigaIntestazione.insertCell();
intestazioneNome.setAttribute("scope", "col");
const intestazioneEmail = rigaIntestazione.insertCell();
const intestazioneTelefono = rigaIntestazione.insertCell();
const intestazioneDettagli = rigaIntestazione.insertCell();
const intestazioneStato = rigaIntestazione.insertCell();
const intestazioneAssegnazione = rigaIntestazione.insertCell();
const intestazionePrezzo = rigaIntestazione.insertCell();
intestazioneNome.textContent = 'Nome';
intestazioneEmail.textContent = 'e-mail';
intestazioneTelefono.textContent = 'Telefono';
intestazioneDettagli.textContent = 'Dettagli';
intestazioneStato.textContent = 'Stato';
intestazioneAssegnazione.textContent = 'Assegnazione';
intestazionePrezzo.textContent = "Prezzo ore/lavoro"; 

// Crea il corpo della tabella
const corpoTabella = table.createTBody();
let cont = 0;//creazione di id
// Itera gli interventi e aggiunge una riga alla tabella per ogni intervento
tickets.forEach(ticket => {
    const riga = corpoTabella.insertRow();
    const cellaNome = riga.insertCell();
    const cellaEmail = riga.insertCell();
    const cellaTelefono = riga.insertCell();
    const cellaDettagli = riga.insertCell();
    const cellaStato = riga.insertCell();
    const cellaAssegnazione = riga.insertCell();
    const cellaPrezzo = riga.insertCell();
    
    
    if(ticket.stato == "In attesa")
        cellaStato.setAttribute("id","cellaStato"+cont);
   
    
    if(ticket.stato == "In attesa")
        cellaAssegnazione.setAttribute("id","cellaAssegnazione"+cont);
    
    // Popola le celle della riga con i dati dell'intervento
    cellaNome.textContent = ticket.nome;
    cellaEmail.textContent = ticket.email;
    cellaTelefono.textContent = ticket.telefono;
    cellaDettagli.textContent = ticket.dettagli;
    cellaStato.textContent = ticket.stato;
    //assegnazione del lavoro

    
    if(ticket.stato == "In attesa"){
        let select = document.createElement("select");
        select.setAttribute("id", "selectAssegnazione"+cont);
        cont++;
        select.setAttribute("class", "form-select");
        dipendenti.forEach(dipendente => {
            let option = document.createElement("option");
            option.textContent = dipendente.nome;
            select.appendChild(option);
        
         });
         cellaAssegnazione.appendChild(select);
    }
    if((ticket.stato == "assegnato")|| (ticket.stato == "completato")){
        cellaAssegnazione.textContent = ticket.nomeHandyman;
    }
    cellaPrezzo.textContent = ticket.prezzo;
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

});

//console.log(assegnazione.value);
/*assegnazione.addEventListener("change", () => {
    cellaStato.textContent = "Assegnato";
});*/


// Aggiunge la tabella ticket alla pagina HTML
tabellaTicket.appendChild(table);
//fine tabella tiket
let buttonAssign = document.createElement("button");
buttonAssign.setAttribute("id","buttonAssegna");
buttonAssign.setAttribute("class","btn btn-primary");
buttonAssign.textContent = "Assegna Tutti";
tabellaTicket.appendChild(buttonAssign);
buttonAssign.addEventListener("click",()=>{
    for(let i=0; i<cont;i++){
        let assegnazione = document.getElementById("selectAssegnazione"+i);
        console.log(assegnazione.value);
        //let cellaStato = document.getElementById("cellaStato"+i);
        //cellaStato.textContent = "assegnato";
        //let cellaAssegnazione = document.getElementById("cellaAssegnazione"+i);
        //cellaAssegnazione.textContent = `${assegnazione.value}`;
        console.log("stato: "+tickets[i].stato);
        tickets[i].stato = "assegnato";
        tickets[i].nomeHandyman = `${assegnazione.value}`;
    }
    let ticketsAggiornati = JSON.stringify(tickets);
    console.log(ticketsAggiornati);     
    localStorage.setItem("tickets",JSON.stringify(tickets));
    location.reload();
});
let buttonReset = document.createElement("button");
buttonReset.setAttribute("id","buttonReset");
buttonReset.setAttribute("class","btn btn-primary");
buttonReset.textContent = "Completati";
tabellaTicket.appendChild(buttonReset);
buttonReset.addEventListener("click",()=>{
    localStorage.clear();
    location.reload();
});







//tabella dipendenti
let tabellaDipendenti = document.getElementById("dipendenti-table");
const table1 = document.createElement('table');
table1.setAttribute("class", "table");
table1.setAttribute("id", "tabellaDipendenti");
// Crea l'intestazione della tabella
const intestazioneTabella1 = table1.createTHead();
const rigaIntestazione1 = intestazioneTabella1.insertRow();
const intestazioneId = rigaIntestazione1.insertCell();
const intestazioneNome1 = rigaIntestazione1.insertCell();
const intestazioneEta = rigaIntestazione1.insertCell();
const intestazioneSpecializzazione = rigaIntestazione1.insertCell();
const intestazioneEsperienza = rigaIntestazione1.insertCell();
const intestazioneCosto = rigaIntestazione1.insertCell();
const intestazioneTelefono1 = rigaIntestazione1.insertCell();
const intestazioneEmail1 = rigaIntestazione1.insertCell();
const intestazioneIndirizzo = rigaIntestazione1.insertCell();

intestazioneId.textContent = '#';
intestazioneNome1.textContent = 'Nome';
intestazioneEta.textContent = 'Eta';
intestazioneSpecializzazione.textContent = 'Specializzazione';
intestazioneEsperienza.textContent = 'Esperienza';
intestazioneCosto.textContent = 'Costo/ora';
intestazioneEmail1.textContent = 'e-mail';
intestazioneTelefono1.textContent = 'Telefono';
intestazioneIndirizzo.textContent = 'Indirizzo';

// Crea il corpo della tabella
const corpoTabella1 = table1.createTBody();

// Itera gli interventi e aggiunge una riga alla tabella per ogni intervento
dipendenti.forEach(dipendente => {
    const riga = corpoTabella1.insertRow();
    const cellaId = riga.insertCell();
    const cellaNome = riga.insertCell();
    const cellaEta = riga.insertCell();
    const cellaSpecializzazione = riga.insertCell();
    const cellaEsperienza = riga.insertCell();
    const cellaCosto = riga.insertCell();
    const cellaTelefono1 = riga.insertCell();
    const cellaEmail = riga.insertCell();
    const cellaIndirizzo = riga.insertCell();
    // Popola le celle della riga con i dati dell'intervento
    cellaId.textContent = dipendente.id;
    cellaNome.textContent = dipendente.nome;
    cellaEta.textContent = dipendente.eta;
    cellaSpecializzazione.textContent = dipendente.specializzazione;
    cellaEsperienza.textContent = dipendente.esperienza;
    cellaCosto.textContent = dipendente.costoOra;
    cellaTelefono1.textContent = dipendente.telefono;
    cellaEmail.textContent = dipendente.email;
    cellaIndirizzo.textContent = dipendente.indirizzo;
    /*// Crea una lista non ordinata per i prezzi dell'intervento
    const listaPrezzi = document.createElement('ul');
    for (const [servizio, prezzo] of Object.entries(intervento.prezzi)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${servizio}: ${prezzo} euro`;//virgolette inverse per mettere variabili all'interno della stringa
        listaPrezzi.appendChild(listItem);
    }
    // Aggiunge la lista dei prezzi alla cella dei prezzi della riga
    cellaPrezzi.appendChild(listaPrezzi);*/
});

// Aggiunge la tabella dipendenti alla pagina HTML
tabellaDipendenti.appendChild(table1);

