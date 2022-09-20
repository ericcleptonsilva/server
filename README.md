# Aplication Esports Server

# Back-end

## Entidades

### Game

    id
    title
    bannerUrl

### Ad

    id
    gameId
    name
    yearsPlaying
    discord
    weekdAys
    hourStart
    hourEnd
    useVoiceChannel
    createdAt

### Casos de uso

    - Listagem de games com contagem de anúncios
    - Criação de novo anúncio
    - Listagem de anúncios por game
    - Buscar discord pelo ID do anúncio

### Comandos

    - Criar schema dentroa da pasta prisma e o arquivo .env
    npx prisma init --datasource-provider SQLite
    - Criar o molde com suas entidades

```schema
    model Game {
        id          String @id
        title       String
        bannerUrl   String
    }
```

- Adicionar no arquivo settings.json od vsCode as sequites linhas

```JSON
    "[prisma]":{
        "editor.formatOnSave":true
    }
    
```

- criar o migrate e nomei o migration
 npx prisma migrate dev
