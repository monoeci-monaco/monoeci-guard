import axios from './axios';
import Transaction from '../models/Transaction';

export async function submitTransaction({ xdr }) {
  const transaction = await axios.post('/transactions', { xdr });
  return Transaction.fromJson(transaction);
}

export async function getTransactions() {
  const result = await axios.get(`/transactions`);
  return result.transactions.map(transaction =>
    Transaction.fromJson(transaction)
  );
}

export async function getTransaction(id) {
  const transaction = await axios.get(`/transactions/${id}`);
  return Transaction.fromJson(transaction);
}

export async function authorizeTransaction(id, { type, code }) {
  const transaction = await axios.post(`/transactions/${id}/authorize`, {
    type,
    code
  });
  return Transaction.fromJson(transaction);
}

export async function denyTransaction(id) {
  const transaction = await axios.post(`/transactions/${id}/deny`, {});
  return Transaction.fromJson(transaction);
}
