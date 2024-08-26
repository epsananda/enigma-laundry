import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader} from '@nextui-org/react';
import { Modal } from 'react-bootstrap';
import icon from '../image/file.png';
import { toast } from 'react-toastify';
import { axiosInstance } from '../lib/axios';
import ButtonPrimary from './ButtonPrimary';
// import ModalTambahkan from '../component/modalTambahkan'; 
import DetailTransactionModal from '../component/DetailTransacsation'
// import ModalTransaksi from '../component/modal/ModalTransaksi'
import CreateTransactionModal from '../component/CreateTransactionModal';

const TransactionList = () => {
  const [dataTransactions, setDataTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModalDetail, setShowModalDetail] = useState(false);
  // const [showModalTambahkan, setShowModalTambahkan] = useState(false); 

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

  const handleClick = (customerDataTransaction) => {
    setShowModalDetail(true);
    setSelectedCustomer(customerDataTransaction);
    console.log(customerDataTransaction);
  };

 
  return (
    <div className="p-4">
      <Card className="bg-[#f9f4ef]">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-4">Daftar Transaksi</h1>
        </CardHeader>
        <CardBody>
          {/* Tombol untuk membuka modal tambah transaksi */}
          {/* <ButtonPrimary
            className="mb-4"
            onClick={() => setShowModalTambahkan(true)}
          >
            + Tambah Transaksi
          </ButtonPrimary> */}

          {/* Modal Tambah Transaksi */}
          {/* <ModalTambahkan
            isOpen={showModalTambahkan}
            handleClose={() => setShowModalTambahkan(false)}
          /> */}
          {/* <ModalTransaksi /> */}
          
          <CreateTransactionModal />

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
                    <ButtonPrimary className="flex items-center" onClick={() => handleClick(transaction)}>
                      <img src={icon} alt="Transaksi" className="w-4 h-4 mr-2" />
                      Lihat Transaksi
                    </ButtonPrimary>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal Detail Transaksi */}
          <Modal
            open={showModalDetail}
            onClose={() => setShowModalDetail(false)}
            width="600px"
          >
            <DetailTransactionModal
              selectedCustomer={selectedCustomer}
              handleClose={() => setShowModalDetail(false)}
            />
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
};

export default TransactionList;
