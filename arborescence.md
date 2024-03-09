project-root/
│
├── user-service/               # Service de gestion des utilisateurs
│   ├── node_modules/           # Modules Node.js
│   ├── src/                    # Code source
│   │   ├── controllers/        # Contrôleurs de gestion des utilisateurs
│   │   ├── models/             # Modèles de données
│   │   ├── routes/             # Définition des routes
│   │   └── index.js            # Point d'entrée du service de gestion des utilisateurs
│   ├── package.json            # Fichier de configuration npm
│   └── .gitignore              # Fichier d'ignorance Git
│
├── medicament-service/         # Service de gestion des médicaments
│   ├── node_modules/           # Modules Node.js
│   ├── src/                    # Code source
│   │   ├── controllers/        # Contrôleurs de gestion des médicaments
│   │   ├── models/             # Modèles de données
│   │   ├── routes/             # Définition des routes
│   │   ├── services/           # Services pour interagir avec l'API Vidal
│   │   │   └── vidalApi.js     # Module pour appeler l'API Vidal
│   │   └── index.js            # Point d'entrée du service de gestion des médicaments
│   ├── package.json            # Fichier de configuration npm
│   └── .gitignore              # Fichier d'ignorance Git
│
├── patient-service/            # Service de gestion des patients
│   ├── node_modules/           # Modules Node.js
│   ├── src/                    # Code source
│   │   ├── controllers/        # Contrôleurs de gestion des patients
│   │   ├── models/             # Modèles de données
│   │   ├── routes/             # Définition des routes
│   │   └── index.js            # Point d'entrée du service de gestion des patients
│   ├── package.json            # Fichier de configuration npm
│   └── .gitignore              # Fichier d'ignorance Git
│
├── consultation-service/       # Service de gestion des consultations
│   ├── node_modules/           # Modules Node.js
│   ├── src/                    # Code source
│   │   ├── controllers/        # Contrôleurs de gestion des consultations
│   │   ├── models/             # Modèles de données
│   │   ├── routes/             # Définition des routes
│   │   └── index.js            # Point d'entrée du service de gestion des consultations
│   ├── package.json            # Fichier de configuration npm
│   └── .gitignore              # Fichier d'ignorance Git
│
└── package.json                # Fichier principal de configuration npm
