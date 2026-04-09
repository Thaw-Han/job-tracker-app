const express = require('express')
const cors = require('cors')
require('dotenv').config()
const supabase = require('./supabaseClient')

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend is running')
})

app.get('/jobs', async (req, res) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

app.post('/jobs', async (req, res) => {
  const { company, title, status, date, notes } = req.body

  const { data, error } = await supabase
    .from('jobs')
    .insert([{ company, title, status, date, notes }])
    .select()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json(data[0])
})

app.delete('/jobs/:id', async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json({ message: 'Job deleted successfully' })
})

app.put('/jobs/:id', async (req, res) => {
  const { id } = req.params
  const { company, title, status, date, notes } = req.body

  const { data, error } = await supabase
    .from('jobs')
    .update({ company, title, status, date, notes })
    .eq('id', id)
    .select()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data[0])
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})