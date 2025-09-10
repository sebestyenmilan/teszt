//console.log("ok");
import express from "express";

const app=express();
app.use(express.json());
const port =8000;

//adatbázisból megfkapjuk az adatokat:
let students=[
    {id:1,name:"Gyula",year:2005},
    {id:2,name:"Anna",year:2004},
    {id:4,name:"Peti",year:2000},
    {id:5,name:"Tomi",year:2008},
]
//GET diákok lista:
app.get('/students',(req,resp)=>{
    resp.json(students)
})
//GET egy diák adatai:
app.get('/students/:id',(req,resp)=>{
    const {id}=req.params
    //console.log("url -ben paraméter:",id);
    const student=students.find(obj=>obj.id==id)

    //console.log(!student ? "hibás id" :"ok" );

    if(!student) resp.json({msg:`Hibás id:${id}!`})
    else resp.json(student)
})
//törlés azonosító érkezik az url-ben:
app.delete('/students/:id',(req,resp)=>{
    const {id}=req.params
    const indexOfItem=students.findIndex(obj=>obj.id==id)//-1 ha nincs
    if(indexOfItem==-1) 
        resp.json({msg:`Hibás id:${id}!`})
    else{
        students=students.filter(obj=>obj.id!=id)
        resp.json({msg:"Sikeres törlés!"})
    }
   
})
//új diák bevezetése:
app.post("/students",(req,resp)=>{
    const {name,year}=req.body
    const lastId=students.at(-1).id
    const newItem={id:lastId+1,name,year}
    console.log(newItem);
    students.push(newItem)
    resp.json({msg:"Sikeres hozzáadás!"})
    

})



app.use((request,response)=>{
    response.send("Page NOT found!!!!!!!!!!!!!!!!");
})


app.listen(port,()=>console.log(`server listening on port ${port} `))
