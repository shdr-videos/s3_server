'use strict';

const dotenv = require('dotenv');
dotenv.config();

const { ACCESS_KEY, SECRET_ACCESS_KEY } = process.env;

class AWSAccount {
  constructor(accountId, displayName) {
    this.id = accountId;
    this.displayName = displayName;
    this.accessKeys = new Map();
  }

  createKeyPair(accessKeyId, secretAccessKey) {
    AWSAccount.registry.set(accessKeyId, this);
    this.accessKeys.set(accessKeyId, secretAccessKey);
  }

  revokeAccessKey(accessKeyId) {
    AWSAccount.registry.delete(accessKeyId);
    this.accessKeys.delete(accessKeyId);
  }
}
AWSAccount.registry = new Map();

exports = module.exports = AWSAccount;

// Hardcoded dummy user used for authenticated requests
exports.DUMMY_ACCOUNT = new AWSAccount(123456789000, 'S3rver');
exports.DUMMY_ACCOUNT.createKeyPair(ACCESS_KEY, SECRET_ACCESS_KEY);
