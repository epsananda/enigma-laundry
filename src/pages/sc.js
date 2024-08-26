import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import { Card, CardBody, CardHeader, Button, Input, Select, Modal, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState("");
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch customers from server
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

        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);

        if (response.status === 200) {
            const data = response.data.data;
            console.log('Raw Data:', data); // Log raw data

            const validCustomers = data.filter(customer => customer.name.trim() !== '' || customer.phoneNumber.trim() !== '' || customer.address.trim() !== '');
            console.log('Filtered Customers:', validCustomers); // Log filtered data

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

    // Handle adding new customer
    const handleAddCustomer = async () => {
        try {
            const token = localStorage.getItem('nilai token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axiosInstance.post("/customers", 
                { name: newCustomer }, 
                { headers }
            );
            if (response.status === 201) {
                // Fetch customers again to get the latest data
                fetchCustomers();
                setNewCustomer("");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Unauthorized. Please login again.');
            } else {
                toast.error(error.message);
            }
        }
    };

    // Handle updating existing customer
    const handleUpdateCustomer = async () => {
        try {
            const token = localStorage.getItem('nilai token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axiosInstance.put(
                `/customers/${editingCustomer.id}`, 
                editingCustomer, 
                { headers }
            );
            if (response.status === 200) {
                fetchCustomers();
                setEditingCustomer(null);
                setIsModalOpen(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Unauthorized. Please login again.');
            } else {
                toast.error(error.message);
            }
        }
    };

    // Handle deleting a customer
    const handleDeleteCustomer = async (customerId) => {
        try {
            const token = localStorage.getItem('nilai token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axiosInstance.delete(`/customers/${customerId}`, { headers });
            if (response.status === 200) {
                fetchCustomers();
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Unauthorized. Please login again.');
            } else {
                toast.error(error.message);
            }
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <Card className="bg-[#f9f4ef] mb-4">
                    <CardHeader>
                        <h3>Tambah Customer Baru</h3>
                    </CardHeader>
                    <CardBody>
                        <Select
                            label="Nama Customer"
                            placeholder="Pilih Nama Customer"
                            value={newCustomer}
                            onChange={(e) => setNewCustomer(e.target.value)}
                        >
                            {customers.map(customer => (
                                <Select.Option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </Select.Option>
                            ))}
                        </Select>
                        <Button onClick={handleAddCustomer} className="mt-4 bg-[#8c7851] text-white">
                            Tambah Customer
                        </Button>
                    </CardBody>
                </Card>

                <Card className="bg-[#f9f4ef]">
                    <CardHeader>
                        <h3>Daftar Customer</h3>
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
                                            <td className="py-2 px-4 border-b">{customer.name}</td>
                                            <td className="py-2 px-4 border-b">{customer.phoneNumber}</td>
                                            <td className="py-2 px-4 border-b">{customer.address}</td>
                                            <td className="py-2 px-4 border-b flex space-x-2">
                                                <Button
                                                    onClick={() => { setEditingCustomer(customer); setIsModalOpen(true); }}
                                                    className="bg-[#8c7851] text-white"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteCustomer(customer.id)}
                                                    className="bg-red-600 text-white"
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No customers found.</p>
                        )}
                    </CardBody>
                </Card>

                {editingCustomer && (
                    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <ModalHeader>
                            <h3>Edit Customer</h3>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                label="Nama"
                                value={editingCustomer.name}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                            />
                            <Input
                                label="No. Telepon"
                                value={editingCustomer.phoneNumber}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, phoneNumber: e.target.value })}
                            />
                            <Input
                                label="Alamat"
                                value={editingCustomer.address}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, address: e.target.value })}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleUpdateCustomer} className="bg-[#8c7851] text-white">
                                Update
                            </Button>
                            <Button onClick={() => setIsModalOpen(false)} className="ml-2 bg-gray-400 text-white">
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </div>
        </Layout>
    );
};

export default CustomerPage;
