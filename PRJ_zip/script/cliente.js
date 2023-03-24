//struttura dati 
const interventi = [
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
        //faccio oggetti per prezzi e non un oggetto unico.
        id: 2,
        nome: 'Edile',
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
        nome: 'Serramenti',
        descrizione: 'Lavorazioni finestre, montaggio ecc.',
        prezzi: {
            'Riparazione finestre': 100,
            'Persiane': 150,
            'Assemblaggio': 80
        }
    },
    {
        id: 5,
        nome: 'Falegnameria',
        descrizione: 'Pulizia, assemblaggio, ristrutturazione ecc.',
        prezzi: {
            'Montaggio mobili': 100,
            'Ristrutturazione mobili': 150,
            'Recupero mobili': 80
        }
    },
    {
        id: 6,
        nome: 'Facchinaggio',
        descrizione: 'Lavori di giardinaggio, abbellimenti ecc.',
        prezzi: {
            'Giardinaggio': 100,
            'Taglio erba': 150,
            'Decorazioni': 80
        }
    },
    {
        id: 7,
        nome: 'Pittura',
        descrizione: 'Verniciatura oggetti',
        prezzi: {
            'Colore': 'variabile',
            'ore': 'ore/'
        }
    },
    {
        id: 8,
        nome: 'Altro',
        descrizione: 'Descrivi nella sezione dettagli ',
        prezzi: {
            'Variabile': "variabile"
        }
    }
];
localStorage.setItem('interventi', JSON.stringify(interventi));
//options dinamica form
/*<!-- loop attraverso interventi array e generare options options -->
          ${interventi.map(intervento => `<option value="${intervento.id}"> ${intervento.nome}</option>`).join('')} 
*/

/*// prova checkbox:
let divCheck = document.getElementById("intervento");
let cont = 0;
let bottoneInterventi = document.getElementById("aggiungiIntervento");
bottoneInterventi.addEventListener("click", () =>{
    let label = document.createElement("label");
    label.setAttribute("id","interventi"+cont);
    label.setAttribute("class"," m-3");
    let checkbox = document.createElement("input");
    checkbox.setAttribute("id","interventi"+cont);
    checkbox.setAttribute("class"," m-3");
    interventi.forEach(intervento => {
        let option = document.createElement("option");
        option.textContent = intervento.nome;
        checkbox.appendChild(option);
    });
    divCheck.appendChild(select);
    cont++;
});*/ 

/*
standard:
let select = document.getElementById("intervento");
for(i = 0; i < interventi.length; i++){
    let option = document.createElement("option");
    option.textContent = interventi[i].nome;
    select.appendChild(option); 
}
*/
// con la HOF forEach():
let select = document.getElementById("intervento");

interventi.forEach(intervento => {
    let option = document.createElement("option");
    option.textContent = intervento.nome;
    select.appendChild(option);
});




//gestione tikets
let richiestaForm = document.getElementById('richiestaForm');

// Event listener per la submit del form
richiestaForm.addEventListener('submit', function (event) {
    event.preventDefault(); // previene il comportamento predefinito del submit

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const interventoId = document.getElementById('intervento').value;
    const intervento = interventi.find(intervento => intervento.id === parseInt(interventoId));
    const dettagli = document.getElementById('dettagli').value;

    // Crea oggetto ticket
    const ticket = {
        nome,
        email,
        telefono,
        intervento,
        dettagli,
        stato: 'In attesa',
        nomeHandyman:'',
        mezzore: '',
        prezzo: 'non completato',
        note: ''
    };

    // Salva ticket sul localStorage
    let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));

    // Reset form
    richiestaForm.reset();

    // Mostra messaggio di successo
    alert('Richiesta inviata con successo!');
});

let tickets = JSON.parse(localStorage.getItem("tickets"));
console.log(tickets);