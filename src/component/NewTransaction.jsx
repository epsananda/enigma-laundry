import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Select, Button } from "@nextui-org/react";
import { packages } from "../data/data";
import { axiosInstance } from "../lib/axios";

const NewTransaction = ({ customers, onAddTransaction }) => {
  const [transactionCode, setTransactionCode] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState(0);

  const handleQtyChange = (e) => {
    const value = e.target.value;
    setQty(value);
    updateTotal(selectedPackage, value);
  };

  const updateTotal = (packageId, quantity) => {
    const selectedPackage = packages.find(p => p.id === parseInt(packageId));
    if (selectedPackage) {
      setTotal(selectedPackage.price * quantity);
    } else {
      setTotal(0);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('nilai token');
      if (!token) {
        throw new Error('No token found');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const newTransaction = {
        transactionCode,
        customerId: selectedCustomer,
        packageId: selectedPackage,
        qty,
        total,
      };

      const response = await axiosInstance.post('/transactions', newTransaction, { headers });

      if (response.status === 201) {
        onAddTransaction(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 p-4">
      <Card>
        <CardHeader>
          <h4>New Transaction</h4>
        </CardHeader>
        <CardBody>
          <Input
            placeholder="Kode Transaksi"
            value={transactionCode}
            onChange={(e) => setTransactionCode(e.target.value)}
            clearable
            underlined
          />

          <Select
            placeholder="Pilih Nama Konsumen"
            value={selectedCustomer}
            onChange={(value) => setSelectedCustomer(value)}
            clearable
          >
            {customers.map(customer => (
              <Select.Option key={customer.id} value={customer.id}>
                {customer.name}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Pilih Paket Laundry"
            value={selectedPackage}
            onChange={(value) => {
              setSelectedPackage(value);
              updateTotal(value, qty);
            }}
            clearable
          >
            {packages.map(pkg => (
              <Select.Option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </Select.Option>
            ))}
          </Select>

          <Input
            type="number"
            placeholder="Isi angka saja"
            value={qty}
            onChange={handleQtyChange}
            clearable
            underlined
          />

          <div className="mt-4">
            <strong>Total Bayar: {total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</strong>
          </div>

          <Button className="mt-4" color="primary" onClick={handleSubmit}>Submit</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewTransaction;
