class APIFilters {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    const queryStringCopy = {...this.queryString}

    // Removing non-filter fields from the query
    const removeFields = ['sort', 'fields', 'q']
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

  selectFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      // by default without `__v` field
      this.query = this.query.select('-__v')
    }

    return this
  }

  searchByQuery() {
    if (this.queryString.q) {
      const qu = this.queryString.q.split('-').join(' ')
      this.query = this.query.find({ $text: { $search: "\"" + qu + "\"" }})
    }

    return this
  }
}

module.exports = APIFilters