const express =require('express')
const authRoutes = require('./routes/index.routes')
const app = express()
const cookieParser = require('cookie-parser')
const postAuth = require('../src/routes/post.routes')
const cors = require('cors');
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/posts',postAuth)
module.exports = app