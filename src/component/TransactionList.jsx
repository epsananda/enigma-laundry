import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import icon from '../image/file.png';
import { toast } from 'react-toastify';
import { axiosInstance } from '../lib/axios';
import ButtonPrimary from './ButtonPrimary';
import ModalTambahkan from './modalTambahkan';

const TransactionList = () => {
  const [dataTransactions, setDataTransactions] = useState([]);

  const fetchListOfTransactions = async () => {
    try {
      const token = localStorage.getItem('nilai token');
      if (!token) {
        throw new Error('No token found');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      const response = await axiosInstance.get('/bills', { headers });

      if (response.status === 200) {
        console.log(response.data.data);
        setDataTransactions(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized. Please login again.');
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchListOfTransactions();
  }, []);

  return (
    <div className="p-4">
      <Card className="bg-[#f9f4ef]">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-4">Daftar Transaksi</h1>
        </CardHeader>
        <CardBody>

          {/* <Button
            className="bg-[#8c7851] text-[#fffffe] mb-4
             hover:bg-white hover:text-[#8c7851] hover:border hover:border-[#8c7851]"      
          >
          +Tambah Transaksi
          </Button> */}
          <ModalTambahkan />
      
          <table className="min-w-full bg-[#f9f4ef]">
            <thead>
              <tr>
                <th className="py-2">Kode Pelanggan</th>
                <th className="py-2">Nama Pelanggan</th>
                <th className="py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="py-2">{transaction.id}</td>
                  <td className="py-2">{transaction.customer.name}</td>
                  <td className="py-2">
                    <ButtonPrimary className="flex items-center" text={"Lihat Transaksi"}>
                    <img src={icon} alt="Transaksi" className="w-4 h-4 mr-2" />
                    </ButtonPrimary>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TransactionList;
