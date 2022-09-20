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

```JavaScript
    
model Game {
  id        String @id @default(uuid())
  title     String
  bannerUrl String
  Ads       Ad[]
}

model Ad {
  id              String   @id @default(uuid())
  gameId          String
  name            String
  yearsPlaying    Int
  discord         String
  weekDays        String
  hourStart       Int
  hourEnd         Int
  useVoiceChannel Boolean
  createdAt       DateTime @default(now())

  game Game @relation(fields: [gameId], references: [id])
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
