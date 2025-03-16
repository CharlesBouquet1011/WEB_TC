const csrf = require('csurf');
const csrfProtection = csrf({ 
    
    cookie: { httpOnly: true, secure: false } //mettre true pour la prod pour secure
  });

module.exports = csrfProtection