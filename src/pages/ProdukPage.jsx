import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
import { Divider } from "@nextui-org/react";

const Produk = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', type: '' });

    const fetchListOfProduct = async () => {
        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers = { Authorization: `Bearer ${token}` };
            const response = await axiosInstance.get('/products', { headers });

            if (response.status === 200) {
                setDataProducts(response.data.data || []);
            } else {
                toast.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch products');
        }
    };

    useEffect(() => {
        fetchListOfProduct();
    }, []);

    const handleCreateProduct = async () => {
        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers = { Authorization: `Bearer ${token}` };
            const response = await axiosInstance.post('/products', newProduct, { headers });

            if (response.status === 201) {
                toast.success('Product created successfully');
                setNewProduct({ name: '', price: '', type: '' });
                fetchListOfProduct();
            } else {
                toast.error('Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error(error.response?.data?.message || 'Failed to create product');
        }
    };

    const handleUpdateProduct = async () => {
        if (!editProduct) return;

        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers = { Authorization: `Bearer ${token}` };
            const response = await axiosInstance.put(`/products/${editProduct.id}`, editProduct, { headers });

            if (response.status === 200) {
                toast.success('Product updated successfully');
                setEditProduct(null);
                fetchListOfProduct();
            } else {
                toast.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error(error.response?.data?.message || 'Failed to update product');
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers = { Authorization: `Bearer ${token}` };
            const response = await axiosInstance.delete(`/products/${productId}`, { headers });

            if (response.status === 200) {
                toast.success('Product deleted successfully');
                fetchListOfProduct();
            } else {
                toast.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error(error.response?.data?.message || 'Failed to delete product');
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <Card className="bg-[#f9f4ef]">
                    <CardHeader>
                        <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
                    </CardHeader>
                    <CardBody>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Type</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.type}</td>
                                        <td>{new Date(product.createdAt).toLocaleString()}</td>
                                        <td>
                                        <Divider />
                                            <Button className="bg-[#8c7851] text-white mt-1" onClick={() => setEditProduct(product)}>Edit</Button>
                                            <Button className="bg-[#8c7851] text-white mt-1" color="error" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-4">
                            <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
                            <input
                                type="text"
                                placeholder="Name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Type"
                                value={newProduct.type}
                                onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                            />
                            <Button className="bg-[#8c7851] text-white" onClick={handleCreateProduct}>Add Product</Button>
                        </div>

                        {editProduct && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">Edit Product</h2>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={editProduct.name}
                                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={editProduct.price}
                                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Type"
                                    value={editProduct.type}
                                    onChange={(e) => setEditProduct({ ...editProduct, type: e.target.value })}
                                />
                                <Button className="bg-[#8c7851] text-white" onClick={handleUpdateProduct}>Update Product</Button>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </Layout>
    );
}

export default Produk;
