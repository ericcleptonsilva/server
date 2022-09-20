import express, { application } from "express"
import { PrismaClient } from "@prisma/client";
import { convertHoursStringToMinute } from "./utils/convert-hour-string-to-minutes";
const app = express()
const prisma = new PrismaClient();

app.use(express.json());
app.get('/games', async (request, response)=>{
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    Ads: true
                }
            }
        }
    });
    return response.json(games);
});

app.post('/games/:id/ads', async (request, response)=>{
    const gameId = request.params.id;
    const body: any = request.body;

    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHoursStringToMinute(body.hourStart),
            hourEnd: convertHoursStringToMinute(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })
    return response.status(201).json(ad);
});

app.get('/games/:id/ads', async (request, response)=>{
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekdAys: true,
            useVoiceChannel:true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where:{
            gameId: gameId
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekdAys: ad.weekdAys.split(','),
        }
    }));
});

app.get('/ads/:id/discord', async(request, response) => {
   const adId = request.params.id;
   const ad = await prisma.ad.findUniqueOrThrow({
    select:{
        discord: true
    },
    where:{
        id: adId
    }
   });
   return response.json({
    discord: ad.discord
   });
});

app.listen(3333);