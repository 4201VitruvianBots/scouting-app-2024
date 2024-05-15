# scouting-app-2024

[![Build all components](https://github.com/4201VitruvianBots/scouting-app-2024/actions/workflows/build.yml/badge.svg)](https://github.com/4201VitruvianBots/scouting-app-2024/actions/workflows/build.yml) [![Format with Prettier](https://github.com/4201VitruvianBots/scouting-app-2024/actions/workflows/format.yml/badge.svg)](https://github.com/4201VitruvianBots/scouting-app-2024/actions/workflows/format.yml)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js
-   npm
-   Docker (server only)

### Installation

1. Clone the repository

```
git clone https://github.com/yourusername/scouting-app-2024.git
```

2. Navigate into the cloned repository

```
cd scouting-app-2024
```

3. Install dependencies

```
npm install
```

### Running the Client/Server

1. Running the client

```
npm run dev --workspace client
```

2. Running the server

```
npm run dev --workspace server
```

3. Running both the server and the client

```
npm run dev
```

### Generate Fake Data

If you don't have real scouting data to use to test the picklist interface/other interfaces, run the following to generate some fake data:

```
npm run --workspace server gen-fake-json
```
