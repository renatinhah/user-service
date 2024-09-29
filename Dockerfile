# Use a imagem oficial do Node.js
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Exponha a porta em que o aplicativo está rodando
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
