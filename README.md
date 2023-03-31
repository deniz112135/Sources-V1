# OA2

## Requirements
- NodeJS
- Serveur Mariadb/MySQL
- Optionnel: PM2

## Dossiers
- API: Ce dossier contient les fichiers de l'API
- Client: Ce dossier contient les fichiers du client
- Database: Ce dossier contient les fichiers de la base de données
- Routine: Ce dossier contient les fichiers de la routine

## Installation

### API
- Installer les dépendances avec la commande `npm install`  
- Lancer le serveur avec la commande `ts-node index.ts`
- L'API est maintenant disponible sur le port 8080

### Client
- Installer les dépendances avec la commande `npm install`
  
#### Ajouter un client
Lancé le script `runClient.sh` en spécifiant le nom du client en paramètre ainsi que le token
Exemple: `./runClient.sh IdDuBot token`

### Database
- Installer les dépendances avec la commande `npm install`
- Configurer le fichier `index.ts` avec les informations de la base de données

Exemple : 
```typescript
export const sequelizeInstance = new sequelize.Sequelize({
    host: "localhost",
    username: "root",
    password: "root",
    database: "oa2",
    port: 3306,
    dialect: "mysql",
    define: {
        timestamps: true
    },
    logging: false,
    timezone: "Europe/Paris",
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 300000
    }
});
```

### Routine
- Installer les dépendances avec la commande `npm install`
- Configurer le fichier `.env` avec les informations de la base de données
- Lancer le script `Routine.ts` avec la commande `ts-node Routine.ts`

## Compiler en Javascript
- Il vous faudra installer le package `typescript` avec la commande `npm install -g typescript`
- Compiler le dossier `API` avec la commande `tsc`
- Compiler le dossier `Client` avec la commande `tsc`
- Compiler le dossier `Routine` avec la commande `tsc`