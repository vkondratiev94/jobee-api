class APIFilters {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    const queryStringCopy = {...this.queryString}

    // Advanced filter using: lt, lte, gt, gte
    let queryString = JSON.stringify(queryStringCopy)
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryString))
    return this
  }
}

module.exports = APIFilters