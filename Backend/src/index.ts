import app from "./app.js";
import { connectToDatabase } from "./database/connection.js";


//connections & listeners
const PORT = process.env.PORT || 5000
connectToDatabase()
.then(() =>{  
    app.listen(PORT,()=> console.log ("server is running & connected to DB")) 
})
.catch((error) => console.log(error))