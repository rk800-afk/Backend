const createFilter = (req) => {
  const { query } = req;
  const filter = {};
  const skipKeys = [
    'page',
    'per_page'
  ];

  Object.keys(query).forEach((key) => {
    if (!skipKeys.includes(key)) {
      filter[key] = new RegExp(query[key], 'i')
    }
  });

  return filter;
};

module.exports = { createFilter };
