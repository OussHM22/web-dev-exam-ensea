import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import recipesRouter from "./routes/recipes.js"
import cors from "cors"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes API
app.use("/api/recipes", recipesRouter)

// Servir les fichiers statiques du frontend
const frontendPath = path.join(__dirname, "../frontend")
app.use(express.static(frontendPath))

// Route pour servir index.html sur la racine
app.get("/", (req, res) => {
	res.sendFile(path.join(frontendPath, "index.html"))
})

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
