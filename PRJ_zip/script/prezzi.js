//prendo il valore dal local storage
let interventi = JSON.parse(localStorage.getItem("interventi"));
//ceck per vederese l'oggetto ce oppure no
//console.log("pagina script prezzi" + interventi);

//lavoro con l'oggetto per creare la pagina
//manipolazione DOM discussione
/*const interventi = [
    {
        id: 1,
        nome: 'Idraulica',
        descrizione: 'Riparazione di perdite, installazione di rubinetti, scarichi, ecc.',
        prezzi: {
            'Riparazione perdite': 50,
            'Installazione rubinetti': 80,
            'Installazione scarichi': 100
        }
    },
    {
        id: 2,
        nome: 'Carpenteria',
        descrizione: 'Montaggio di mobili, riparazione di porte e finestre, ecc.',
        prezzi: {
            'Montaggio mobili': 120,
            'Riparazione porte': 60,
            'Riparazione finestre': 80
        }
    },
    {
        id: 3,
        nome: 'Elettricità',
        descrizione: 'Riparazione di impianti elettrici, installazione di prese e interruttori, ecc.',
        prezzi: {
            'Riparazione impianti elettrici': 80,
            'Installazione prese e interruttori': 60,
            'Sostituzione lampadine': 20
        }
    },
    {
        id: 4,
        nome: 'Interventi domestici',
        descrizione: 'Pulizia, verniciatura, assemblaggio di elettrodomestici, ecc.',
        prezzi: {
            'Pulizia casa': 100,
            'Verniciatura': 150,
            'Assemblaggio elettrodomestici': 80
        }
    }
];*/
//prezzi maggiori
  
// Selezione l'elemento della pagina HTML dove inserire la tabella
const tabellaInterventi = document.getElementById('tabella-interventi');

// Crea la tabella HTML
const tabella = document.createElement('table');
tabella.setAttribute("class","table");
tabella.setAttribute("id","tabellaPrezzi");
// Crea l'intestazione della tabella
const intestazioneTabella = tabella.createTHead();
const rigaIntestazione = intestazioneTabella.insertRow();
const intestazioneId = rigaIntestazione.insertCell();
intestazioneId.setAttribute("scope","col");
const intestazioneNome = rigaIntestazione.insertCell();
const intestazioneDescrizione = rigaIntestazione.insertCell();
const intestazionePrezzi = rigaIntestazione.insertCell();
intestazioneId.textContent = '#';
intestazioneNome.textContent = 'Nome';
intestazioneDescrizione.textContent = 'Descrizione';
intestazionePrezzi.textContent = 'Prezzi';

// Crea il corpo della tabella
const corpoTabella = tabella.createTBody();

// Itera gli interventi e aggiunge una riga alla tabella per ogni intervento
interventi.forEach(intervento => {
    const riga = corpoTabella.insertRow();
    const cellaId = riga.insertCell();
    const cellaNome = riga.insertCell();
    const cellaDescrizione = riga.insertCell();
    const cellaPrezzi = riga.insertCell();

    // Popola le celle della riga con i dati dell'intervento
    cellaId.textContent = intervento.id;
    cellaNome.textContent = intervento.nome;
    cellaDescrizione.textContent = intervento.descrizione;

    // Crea una lista non ordinata per i prezzi dell'intervento
    const listaPrezzi = document.createElement('ul');
    for (const [servizio, prezzo] of Object.entries(intervento.prezzi)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${servizio}: ${prezzo} euro`;//virgolette inverse per mettere variabili all'interno della stringa
        listaPrezzi.appendChild(listItem);
    }
    // Aggiunge la lista dei prezzi alla cella dei prezzi della riga
    cellaPrezzi.appendChild(listaPrezzi);
});
//calcolo massima spesa
let prezziMaggiori = interventi.reduce((acc, intervento) => {
    let prezzi = Object.values(intervento.prezzi);
    let prezzoMaggiore = Math.max(...prezzi);
    if (prezzoMaggiore > acc) {
      return prezzoMaggiore;
    }
    return acc;
  }, 0);
  
  console.log(prezziMaggiori);
  let maxSpesa = document.getElementById("maxSpesa");
  maxSpesa.textContent = "il costo maggiore dei materiali è: "+prezziMaggiori;
// Aggiunge la tabella alla pagina HTML
tabellaInterventi.appendChild(tabella);