require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const configDB = require('./app/config/db')
const userCtlr = require('./app/controllers/users-ctlr')
const multer = require('multer')
configDB()
const { checkSchema } = require('express-validator')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//helpers
const { userRegisterSchema, companyRegisterSchema, loginValidationSchema } = require('./app/helpers/userValidationSchema')
const quotationValidationSchema = require('./app/helpers/quotationValidationSchema')
const categoryValidationSchema = require('./app/helpers/categoryValidation')
const enquiryValidationSchema = require('./app/helpers/enquiryValidationSchema')
const productValidation = require('./app/helpers/productValidation')
const authenticateUser = require('./app/middlewares/authenticate')
const orderValidation = require('./app/helpers/orderAcceptanceValidation')

//controllers
const categoryCltr = require('./app/controllers/category-ctlr')
const productCltr = require('./app/controllers/product-ctlr')
const enquiryCtlr = require('./app/controllers/enquiry-ctlr')
const quotationCtlr = require('./app/controllers/quotation-ctlr')
const orderAcceptanceCtlr = require('./app/controllers/orderAcceptance-ctlr')
const upload = multer()

const port = process.env.PORT || 3030
//users & company
app.post('/api/user/register', checkSchema(userRegisterSchema), userCtlr.userRegister)
app.get('/api/users/verify/:token', userCtlr.verify)
app.post('/api/company/register', checkSchema(companyRegisterSchema), userCtlr.companyRegister)
app.post('/api/login', checkSchema(loginValidationSchema), userCtlr.login)
app.get('/api/users/list', userCtlr.list)
app.get('/api/companies/list', userCtlr.listCompanies)
app.get('/api/getprofile', authenticateUser, userCtlr.getProfile)

//category
app.post('/api/categories', authenticateUser, checkSchema(categoryValidationSchema), categoryCltr.create)
app.get('/api/categories/list', categoryCltr.list)
// app.delete('/api/categories/:id')
// product
app.post('/api/products', upload.array('image'), authenticateUser, checkSchema(productValidation), productCltr.create)
app.get('/api/products/list', productCltr.list)
app.get('/api/:categoryId/products', productCltr.category)
app.delete('/api/products/:id', authenticateUser, productCltr.delete)
app.put('/api/products/update/:id', upload.array('image'), authenticateUser, productCltr.update)

//enquiry model
app.post('/api/enquiry/create', authenticateUser, checkSchema(enquiryValidationSchema), enquiryCtlr.create)
app.get('/api/enquiries/list', enquiryCtlr.list)

//quotation
app.post('/api/quotation/create', authenticateUser, checkSchema(quotationValidationSchema), quotationCtlr.create)
app.get('/api/quotations/list', authenticateUser, quotationCtlr.list)

//order-acceptance
app.post('/api/orders/create', checkSchema(orderValidation), orderAcceptanceCtlr.create)
app.get('/api/orders/list', orderAcceptanceCtlr.list)

app.listen(port, () => {
    console.log('connected to port', port)
})
