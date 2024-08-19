import React from 'react';

const TransactionHistory = ({ transactions }) => {
  return (
    <div>
      <h2>Riwayat Transaksi</h2>
      <table className="min-w-full bg-[#f9f4ef]">
        <thead>
          <tr>
            <th className="py-2">Kode Pelanggan</th>
            <th className="py-2">Nama Pelanggan</th>
            <th className="py-2">Tanggal</th>
            <th className="py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="py-2">{transaction.id}</td>
              <td className="py-2">{transaction.customer.name}</td>
              <td className="py-2">{new Date(transaction.billDate).toLocaleDateString()}</td>
              <td className="py-2">{transaction.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
