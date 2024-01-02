const yup = require("yup")

const linkSchma = yup.object().shape({
   username: yup.string().required('username required'),
   email: yup.string().email('invalid email').required('email required'),
   password: yup.string().min(8, 'minimun 8 characters required').required('password required')
})
module.exports = linkSchma

