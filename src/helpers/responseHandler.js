'use strict'

const boom = require('boom')

const ResponseHandler = () => {}

ResponseHandler.errorHandler = () => {}

/**
 * Method: Create an error object to throw, with pattern
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
 * Method: Create a resource not found error object to raise
 */
ResponseHandler.errorHandler.resourceNotFound = () => {
  const data = {
    parameters: 'Resource'
  }

  return boom.notFound('Resource not found', data)
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
