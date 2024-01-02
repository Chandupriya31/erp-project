const linkSchma = require('../helpers/yupSchema')

const validate = async (req, res, next) => {
   try {
      await linkSchma.validate(req.body, { abortEarly: false })
      return next()
   } catch (err) {
      if (err.name === 'ValidationError') {
         console.log(err)
         return res.status(500).json({ message: (err.errors).toString() });
      }
   }
}
module.exports = validate