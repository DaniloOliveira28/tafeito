# Inicialização do projeto vazio

Utilize esses comandos para inicializar um projeto vazio.

**NPM**

Iniciar npm para criar o package.json

```bash
npm init
```

Instalar dependencias e configurar projeto

**React**
```bash
npm install --save react react-dom
```

**TypeScript**

Módulo necessário para poder desenvolver em TS.

```bash
npm i --save-dev typescript @types/react @types/react-dom type-fest
```

Criar configuração do tscript "tsconfig.json" na raiz 

Modelo: [tsconfig.json](../tsconfig.json)

**Babel**

Módulo para poder transpilar o codigo.

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader core-js

```

Criar configuração do babel "babel.config" na raiz 

Modelo: [babel.config.js](../babel.config.js)

**Webpack**
Modulo para realizar o build e servir o projeto

```
npm install --save-dev webpack react-refresh webpack-cli webpack-dev-server @pmmmwh/react-refresh-webpack-plugin source-map-loader html-webpack-plugin fork-ts-checker-webpack-plugin cross-env dotenv-webpack

```
Criar configuração do webpack "webpack.config" na raiz 

Modelo: [webpack.config.js](../webpack.config.js)


MUI
biblioteca de componentes
```bash
npm install @mui/material @mui/styled-engine-sc styled-components
```
Configurar o styled component, seguindo esses [passos](https://mui.com/guides/styled-engine/)


Storybook

```
npm install --save-dev @storybook/addon-actions @storybook/addon-essentials @storybook/addon-links @storybook/react
```


Testes

TODO
