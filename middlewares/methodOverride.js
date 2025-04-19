// This middleware allows us to use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
// For example, browsers only support GET and POST.
exports.methodOverride = (req, res , next)=> {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      req.method= method; 
      delete req.body._method
    }
  next();
  };