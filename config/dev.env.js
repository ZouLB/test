'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  	NODE_ENV: '"development"',
	API_HOST: '"http://10.200.200.160:8081/datalake/api/daasTag"'
})
	