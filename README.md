## install dependencies

`npm i`

## build project

`npm run build`

## run in development mode

`npm run dev`

## run in production mode

`npm run start`

# simple project structure

```
project/
│
├── public/                             # Static files
│   ├── icons/                          # PWA icons
│   └── manifest.json                   # PWA manifest
│
├── src/                                # Source files
│   ├── app/                            # Next.js app router
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Root page
│   │   └── ...                         # Other routes
│   ├── components/                     # Reusable components (UI Layer)
│   │   ├── ui/                         # UI components (buttons, forms, etc.)
│   │   ├── maps/                       # Leaflet map components
│   │   └── ...                         # Other component categories
│   ├── hooks/                          # Custom hooks
│   │   ├── useStore.ts                 # Zustand store hooks
│   │   └── ...                         # Other hooks
│   ├── infrastructure/                 # Infrastructure Layer
│   │   ├── api/                        # API clients
│   │   ├── persistence/                # Data persistence (e.g., Zustand stores)
│   │   └── ...                         # Other infrastructure
│   ├── domain/                         # Domain Layer
│   │   ├── models/                     # Domain models/entities
│   │   ├── repositories/               # Interfaces for repositories
│   │   └── services/                   # Domain services
│   ├── application/                    # Application Layer
│   │   ├── use-cases/                  # Use cases / application services
│   │   └── ...                         # Other application services
│   ├── pages/                          # Next.js pages (fallback for app router)
│   ├── styles/                         # Stylesheets
│   │   ├── globals.scss                # Global styles
│   │   └── tailwind.css                # Tailwind CSS import
│   ├── tests/                          # Tests
│   │   ├── components/                 # Component tests
│   │   ├── hooks/                      # Hook tests
│   │   ├── pages/                      # Page tests
│   │   ├── mocks/                      # Mock data
│   │   └── utils/                      # Test utilities
│   ├── types/                          # TypeScript types
│   │   └── index.ts                    # Global types
│   └── utils/                          # General utilities
│       └── helpers.ts                  # Helper functions
│
├── .eslintrc.ts                        # ESLint configuration
├── .husky/                             # Husky hooks
│   ├── pre-commit                      # Pre-commit hook
│   └── ...                             # Other hooks
├── cypress/
│   ├── fixtures/                            # Test data
│   │   └── example.json
│   ├── integration/                         # End-to-end tests
│   │   ├── components/                      # Component tests
│   │   │   └── Counter.spec.ts
│   │   ├── pages/                           # Page tests
│   │   │   └── home.spec.ts
│   │   └── ...                              # Other test categories
│   ├── plugins/                             # Cypress plugins
│   │   └── index.ts
│   └── support/                             # Cypress support files
│       ├── commands.ts                      # Custom commands
│       └── index.ts
├── cypress.json                             # Cypress configuration
├── .lintstagedrc                       # lint-staged configuration
├── .gitignore                          # Git ignore rules
├── next.config.mjs                      # Next.js configuration
├── package.json                        # Package dependencies and scripts
├── postcss.config.js                   # PostCSS configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
└── jest.config.js                      # Jest configuration

```
