import TelegramBot from 'node-telegram-bot-api';
import express from 'express'
import cors from 'cors';
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const userCollection = collection(db, "user");

const app=express()
app.use(cors());

const BOT_TOKEN = '7118396575:AAFvahtATlJdTT6AvDFdCduF9GePNJ52aX4';

let bot = new TelegramBot(BOT_TOKEN, { polling: true });

let mapping={}


bot.onText(/\/start/,async (msg) =>{

    const chatId = msg.chat.id;
  
    console.log(msg.chat.username)
 

       
           
            let otp=Math.floor(1000 + Math.random() * 9000)
            const data = await getDocs(userCollection);
     
            let db=await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            let flag=0;
       
            for(let i=0;i<db.length;i++)
               {
                   const username=msg.chat.username;
                 
                   if(db[i].username==username)
                       {
                          flag=1;
                          break;
                       }
                   
                   }
            if(flag==0)
                {
                    try{
                        await addDoc(userCollection,{username:msg.chat.username,chatId:chatId,otp:otp});
                        bot.sendMessage(chatId, `If you are not a robot 🤖\n\nEnter your username (${msg.chat.username}) and the code in the Mini App ${otp}`);
                    }
                    catch(error){
                        bot.sendMessage(chatId, `Username not found`)
                    }
                   
                }
            
        
    
  
  })
app.get('/getauth', async(req,res)=>{

    
    try{

        const data = await getDocs(userCollection);
     
        let dbdata=await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
   
        for(let i=0;i<dbdata.length;i++)
           {
               const username=req.query.username;
               const otp=req.query.otp
               if(dbdata[i].username==username)
                   {
                       dbdata[i].otp==otp
                       {
                           res.send('success')
                       }
                   }
               else{
                   res.send('faliure')
               }
               }
               res.send('faliure')
           }
    
    catch{
       console.log('Internal sever error')
    }
}
    
   
    )
       
    


    

 


app.listen(8000,()=>{
    console.log('App listeing to port 8000')
})