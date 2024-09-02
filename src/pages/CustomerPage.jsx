import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import { Card, CardBody, CardHeader, Button, Input } from "@nextui-org/react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import ButtonPrimary from "../component/ButtonPrimary";
import FooterBar from "../component/FooterNavbar";

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ name: "", phoneNumber: "", address: "" });
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [editingCustomerData, setEditingCustomerData] = useState({ name: "", phoneNumber: "", address: "" });

    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axiosInstance.get('/customers', { headers });

            if (response.status === 200) {
                const data = response.data.data;
                const validCustomers = data.filter(customer => customer.name.trim() !== '' || customer.phoneNumber.trim() !== '' || customer.address.trim() !== '');
                setCustomers(validCustomers);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
            if (error.response && error.response.status === 401) {
                toast.error('Unauthorized. Please login again.');
            } else {
                toast.error(error.message);
            }
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleAddCustomer = async () => {
        try {
            const token = localStorage.getItem('nilai token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axiosInstance.post("/customers", newCustomer, { headers });
            if (response.status === 201) {
                fetchCustomers();
                setNewCustomer({ name: "", phoneNumber: "", address: "" });
                toast.success('Konsumen Berhasil di Tambahkan');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Unauthorized. Please login again.');
            } else {
                toast.error(error.message);
            }
        }
    };

    const handleUpdateCustomer = async () => {
        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                console.error('No token found');
                toast.error('No token found. Please login again.');
                return;
            }

            const headers = { Authorization: `Bearer ${token}`, };

            const customerData = {
                id: editingCustomerId,
                name: editingCustomerData.name,
                phoneNumber: editingCustomerData.phoneNumber,
                address: editingCustomerData.address,
            };

            const response = await axiosInstance.put(
                `customers/`, customerData, { headers });

            // const response = await axios.put(
            //     `http://localhost:5173/api/v1/customers/`, customerData, { headers });

            if (response.status === 200) {
                setCustomers(prevCustomers => prevCustomers.map(customer =>
                    customer.id === editingCustomerId ? { ...customer, ...customerData } : customer
                ));
                setEditingCustomerId(null);
                setEditingCustomerData({ name: "", phoneNumber: "", address: "" });
                toast.success('Kostumer Berhasil di Perbarui');
            }
        } catch (error) {
            console.error('Error updating customer:', error.response ? error.response.data : error.message);
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error('Unauthorized. Please login again.');
                } else if (error.response.status === 404) {
                    toast.error('Customer not found.');
                } else {
                    toast.error(`Error: ${error.response.status}`);
                }
            } else {
                toast.error(error.message);
            }
        }
    };


    const handleDeleteCustomer = async (customerId) => {
        try {
            const token = localStorage.getItem('nilai token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axiosInstance.delete(`/customers/${customerId}`, { headers });

            setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== customerId));
            toast.success('Konsumen Berhasil di hapus');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Unauthorized. Please login again.');
            } else {
                toast.error(error.message);
            }
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingCustomerData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <Layout>
            <div className="p-4">
                <Card className="bg-[#f9f4ef] mb-4">
                    <CardHeader>
                        <h3 className="text-2xl font-bold mb-4">Tambah Konsumen Baru</h3>
                    </CardHeader>
                    <CardBody>
                        <Input
                            clearable
                            underlined
                            label="Nama Customer"
                            placeholder="Masukkan Nama Customer"
                            value={newCustomer.name}
                            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                            className="mb-4"
                        />
                        <Input
                            clearable
                            underlined
                            label="No. Telepon"
                            placeholder="Masukkan No. Telepon"
                            value={newCustomer.phoneNumber}
                            onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
                            className="mb-4"
                        />
                        <Input
                            clearable
                            underlined
                            label="Alamat"
                            placeholder="Masukkan Alamat"
                            value={newCustomer.address}
                            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                            className="mb-4"
                        />
                        <ButtonPrimary 
                        onClick={handleAddCustomer} 
                        text={"Tambahkan Konsumen"} 
                        className={"w-full"} />
                      
                    </CardBody>
                </Card>

                <Card className="bg-[#f9f4ef]">
                    <CardHeader>
                        <h3>Daftar Konsumen</h3>
                    </CardHeader>
                    <CardBody>
                        {customers.length > 0 ? (
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Nama</th>
                                        <th className="py-2 px-4 border-b">No. Telepon</th>
                                        <th className="py-2 px-4 border-b">Alamat</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td className="py-2 px-4 border-b">
                                                {editingCustomerId === customer.id ? (
                                                    <Input
                                                        name="name"
                                                        value={editingCustomerData.name}
                                                        onChange={handleEditChange}
                                                    />
                                                ) : (
                                                    customer.name
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {editingCustomerId === customer.id ? (
                                                    <Input
                                                        name="phoneNumber"
                                                        value={editingCustomerData.phoneNumber}
                                                        onChange={handleEditChange}
                                                    />
                                                ) : (
                                                    customer.phoneNumber
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {editingCustomerId === customer.id ? (
                                                    <Input
                                                        name="address"
                                                        value={editingCustomerData.address}
                                                        onChange={handleEditChange}
                                                    />
                                                ) : (
                                                    customer.address
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b flex space-x-2">
                                                {editingCustomerId === customer.id ? (
                                                    <>
                                                        <ButtonPrimary
                                                            onClick={handleUpdateCustomer}
                                                            text={"Save"} />
                                                        <Button

                                                            onClick={() => setEditingCustomerId(null)}
                                                            className="bg-gray-400 text-white mb-4
                                                                     hover:bg-white hover:text-gray-400
                                                                        hover:border hover:border-gray-400"
                                                        >
                                                            Cancel
                                                        </Button>

                                                    </>
                                                ) : (
                                                    <>
                                                        <ButtonPrimary
                                                            text={"Edit"}
                                                            onClick={() => {
                                                                setEditingCustomerId(customer.id);
                                                                setEditingCustomerData({
                                                                    name: customer.name,
                                                                    phoneNumber: customer.phoneNumber,
                                                                    address: customer.address
                                                                });
                                                            }} />

                                                        <Button
                                                            onClick={() => handleDeleteCustomer(customer.id)}
                                                            className="bg-red-600 text-white mb-4
                                                                     hover:bg-white hover:text-red-600 
                                                                        hover:border hover:border-red-600"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Tidak Ada Konsumen.</p>
                        )}
                    </CardBody>
                </Card>
            </div>
            <FooterBar />
        </Layout>
    );
};

export default CustomerPage;
