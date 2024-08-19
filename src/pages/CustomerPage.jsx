import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import { Card, CardBody, CardHeader, Button, Input } from "@nextui-org/react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify"; 

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        phoneNumber: "",
        address: ""
    });
    const [editingCustomer, setEditingCustomer] = useState(null);

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
                console.log(token);
                setCustomers(response.data); 
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
                console.log(token);
                fetchCustomers();
                setNewCustomer({ name: "", phoneNumber: "", address: "" });
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
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axiosInstance.put(`/customers/${editingCustomer.id}`, editingCustomer, { headers });
            if (response.status === 200) {
                console.log(token);
                fetchCustomers(); 
                setEditingCustomer(null);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Unauthorized. Please login again.');
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

            const response = await axiosInstance.delete(`/customers/${customerId}`, { headers });
            if (response.status === 200) {
                console.log(token);
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
                        <Input
                            label="Nama"
                            placeholder="Nama Customer"
                            value={newCustomer.name}
                            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                        />
                        <Input
                            label="No. Telepon"
                            placeholder="No. Telepon"
                            value={newCustomer.phoneNumber}
                            onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
                        />
                        <Input
                            label="Alamat"
                            placeholder="Alamat"
                            value={newCustomer.address}
                            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                        />
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
                        {Array.isArray(customers) && customers.length > 0 ? (
                            customers.map((customer) => (
                                <div key={customer.id} className="mb-4 p-4 border border-gray-300">
                                    {editingCustomer && editingCustomer.id === customer.id ? (
                                        <div>
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
                                            <Button onClick={handleUpdateCustomer} className="mt-4 bg-[#8c7851] text-white">
                                                Update
                                            </Button>
                                            <Button onClick={() => setEditingCustomer(null)} className="mt-4 ml-2 bg-[#8c7851] text-white">
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p><strong>Nama:</strong> {customer.name}</p>
                                            <p><strong>No. Telepon:</strong> {customer.phoneNumber}</p>
                                            <p><strong>Alamat:</strong> {customer.address}</p>
                                            <Button onClick={() => setEditingCustomer(customer)} className="mt-2 bg-[#8c7851] text-white">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDeleteCustomer(customer.id)} className="mt-2 ml-2 bg-[#8c7851] text-white">
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No customers found.</p>
                        )}
                    </CardBody>
                </Card>
            </div>
        </Layout>
    );
};

export default CustomerPage;
