# OpenWeatherMap App

Servizio che mostra i dati recuperati da https://openweathermap.org/

## Avvio in modalità produzione

Requisiti:

- Docker
- docker-compose

```
docker compose up
```

Dopo la procedura di build delle immagini Docker, l'applicativo sarà disponbile a http://127.0.0.1:8080

## Avvio in modalità sviluppo

Requisiti:

- Node.js

```
npm run start
```

N.B. in questa modalità è attivo un sistema di cache lato applicazione delle risposte all'API di OpenWeatherMap. I risultati di meteo e previsioni saranno sempre gli stessi finchè non si ripulisce il localStorage!

## Struttura di progetto

Il progetto segue la classica struttura generata da `@angular-cli`, dove all'interno di `app` ho categorizzato i vari file per tipologia.

Ho aggiunto le varie configurazione di Docker nella cartella principale del progetto, inoltre a una configurazione nginx, che ho usato come immagine base.

Inoltre, per lo stile faccio uso di [Tailwind.css](https://tailwindcss.com/), configurato in `tailwind.config.js`.

Per le icone ho scelto le [Bootstrap Icons](https://icons.getbootstrap.com/), e per i grafici [Chart.js](https://www.chartjs.org/)
