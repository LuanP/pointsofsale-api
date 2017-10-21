'use strict'

const boom = require('boom')

const errorSource = {
  payload: 'payload',
  params: 'params',
  query: 'query'
}

const ResponseHandler = () => {}

ResponseHandler.errorHandler = () => {}
ResponseHandler.errorSource = errorSource

/**
 * Method: Create an error object to throw, with luizalabs-commons pattern
 * @param {Object} error Error
 * @param {String} sourceValidation Type of validation, can be payload, path, query or undefined
 */
ResponseHandler.parser = (error, sourceValidation) => {
  error.output = {}

  error.output = {
    payload: {
      validation: {
        source: sourceValidation
      }
    }
  }

  return error
}

/**
 * Method: Create a record not found error object to raise
 * @param {String} message - Text to display that was not found
 */
ResponseHandler.errorHandler.recordNotFound = (message) => {
  const data = {
    parameters: message
  }

  return boom.notFound('Record not found', data)
}

/**
 * Method: Create a resource not found error object to raise
 */
ResponseHandler.errorHandler.resourceNotFound = () => {
  const data = {
    parameters: 'Resource'
  }

  return boom.notFound('Resource not found', data)
}

/**
 * Method: Create a bad request error object to raise
 * @param {Object} error - Error to raise
 * @param {String} source - Type of validation, can be payload, path, query or undefined
 */
ResponseHandler.errorHandler.badRequest = (error, source) => {
  let result = boom.badRequest('Bad request', error)
  let parsedError = ResponseHandler.parser(result, source)

  return parsedError
}

/**
 * Method: Create an internal server error object to be raised
 * @param {Object} message - Message to be displayed on error
 * @param {Object} error - Error to raise
 */
ResponseHandler.errorHandler.internal = (message, error) => {
  return boom.internal(message, error)
}

/**
 * Method: Apply apigee success body response patterns
 * @param {Object} request - Current Request
 */
ResponseHandler.successResponse = (request) => {
  const payload = Array.isArray(request.body) ? request.body : [request.body]

  return {
    records: payload
  }
}

module.exports = ResponseHandler
