class APIFilters {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    const queryStringCopy = {...this.queryString}

    // Removing non-filter fields from the query
    const removeFields = ['sort']
    removeFields.forEach(el => delete queryStringCopy[el])

    // Advanced filter using: lt, lte, gt, gte
    let queryString = JSON.stringify(queryStringCopy)
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryString))
    return this
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      // default sorting
      this.query = this.query.sort('-postingDate')
    }

    return this
  }
}

module.exports = APIFilters