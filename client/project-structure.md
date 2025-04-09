# Project Structure Plan
The current client-side file structure is disorganized and hard to maintain. I suggest organizing the files according to the following structure.
## Directory Structure

```
src/
├── assets/           # Static assets like images, icons, fonts
├── components/       # Reusable UI components
│   ├── common/       # Shared components like buttons, inputs
│   ├── layout/       # Layout components like header, footer
│   └── ui/          # UI specific components like cards, tables
├── pages/           # Page components (routes)
├── services/        # API services and business logic
├── styles/          # Global styles. just tailwind would be better.
│   ├── components/  # Component specific styles
│   └── pages/       # Page specific styles
├── utils/           # Utility functions and helpers
└── context/         # React context providers
```

## Migration

1. Create new directory structure
2. Move components to appropriate directories
3. Consolidate styles
4. Update import paths
5. Clean up redundant files
6. Update build configuration