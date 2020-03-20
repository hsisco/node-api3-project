// code away!

const express = require('express');
const server = require('./server.js')

const PORT = 4094
server.listen(PORT, () => {
	console.log(`\n*^^*~~Server Running on http://localhost:${PORT}~~*^^*\n`)
});