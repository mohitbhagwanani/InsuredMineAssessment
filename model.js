const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyMode: String,
  producer: String,
  policyNumber: String,
  premiumAmountWritten: String,
  premiumAmount: String,
  policyType: String,
  policyStartDate: Date,
  policyEndDate: Date,
});

const agentSchema = new mongoose.Schema({
  agent: String,
  firstName: String,
  companyName: String,
})

const userSchema = new mongoose.Schema({
  userType: String,
  accountName: String,
  accountType: String,
  firstName: String,
  phone: String,
  email: String,
  address: String,
  state: String,
  zip: String,
  dob: Date,
})

const userAccountSchema = new mongoose.Schema({
  accountName: String,
  accountType: String,
  companyName: String,
  email: String,
})

const carrierSchema = new mongoose.Schema({
  categoryName: String,
  firstName: String,
  email: String,
  phone: String,
})

const Policy = mongoose.model('Policy', policySchema);
const Agent = mongoose.model('Agent', agentSchema);
const User = mongoose.model('User', userSchema);
const UserAccount = mongoose.model('UserAccount', userAccountSchema);
const carrier = mongoose.model('carrier', carrierSchema);


module.exports = {Policy, Agent, User, UserAccount, carrier};
