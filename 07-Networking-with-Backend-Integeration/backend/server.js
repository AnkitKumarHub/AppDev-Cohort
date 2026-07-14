import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({ origin: "*" })); //allow all origins

app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' }).status(200);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})


