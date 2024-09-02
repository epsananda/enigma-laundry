import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { axiosInstance } from '../lib/axios';
import { toast } from "react-toastify";
import Layout from '../component/Layout';
import ButtonPrimary from '../component/ButtonPrimary';
import FooterBar from '../component/FooterNavbar';

const ProdukPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', type: '' });
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingProductData, setEditingProductData] = useState({ name: '', price: '', type: '' });

    const fetchListOfProduct = async () => {
        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers = { Authorization: `Bearer ${token}` };
            const response = await axiosInstance.get('/products', { headers });

            if (response.status === 200) {
                setProducts(response.data.data || []);
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
            const productData = {
                name: newProduct.name,
                price: parseFloat(newProduct.price),
                type: newProduct.type
            };

            const response = await axiosInstance.post('/products', productData, { headers });

            if (response.status === 201) {
                toast.success('Produk Berhasil di Tambahkan');
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
        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers = { Authorization: `Bearer ${token}` };
            const productData = {
                id: editingProductId,
                name: editingProductData.name,
                price: parseFloat(editingProductData.price),
                type: editingProductData.type
            };

            const response = await axiosInstance.put(`products/`, productData, { headers });

            if (response.status === 200) {
                setProducts(prevProducts => prevProducts.map(product =>
                    product.id === editingProductId ? { ...product, ...productData } : product
                ));
                setEditingProductId(null);
                setEditingProductData({ name: '', price: '', type: '' });
                toast.success('Produk Berhasil di Update');
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
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axiosInstance.delete(`products/${productId}`, { headers });

            setProducts(prevProduct => prevProduct.filter(product => product.id !== productId));
            toast.success('Produk berhasil di hapus');
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
        setEditingProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <Layout>
            <div className="p-4">
                <Card className="bg-[#f9f4ef] mb-4">
                    <CardHeader>
                        <h3 className="text-2xl font-bold mb-4">Tambah Produk Baru</h3>
                    </CardHeader>
                    <CardBody>
                        <Input
                            clearable
                            underlined
                            label="Nama Produk"
                            placeholder="Masukkan Nama Produk"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="mb-4"
                        />
                        <Input
                            clearable
                            underlined
                            label="Harga"
                            placeholder="Masukkan Harga Produk"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="mb-4"
                        />
                        <Input
                            clearable
                            underlined
                            label="Jenis"
                            placeholder="Masukkan Jenis Produk"
                            value={newProduct.type}
                            onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                            className="mb-4"
                        />
                        <ButtonPrimary
                            onClick={handleCreateProduct}
                            text={"Tambahkan Produk"} />

                    </CardBody>
                </Card>

                <Card className="bg-[#f9f4ef]">
                    <CardHeader>
                        <h3 className="text-2xl font-bold mb-4">Daftar Produk</h3>
                    </CardHeader>
                    <CardBody>
                        {products.length > 0 ? (
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">ID</th>
                                        <th className="py-2 px-4 border-b">Nama</th>
                                        <th className="py-2 px-4 border-b">Harga</th>
                                        <th className="py-2 px-4 border-b">Jenis</th>
                                        <th className="py-2 px-4 border-b">Created At</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="py-2 px-4 border-b">{product.id}</td>
                                            <td className="py-2 px-4 border-b">
                                                {editingProductId === product.id ? (
                                                    <Input
                                                        name="name"
                                                        value={editingProductData.name}
                                                        onChange={handleEditChange}
                                                    />
                                                ) : (
                                                    product.name
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {editingProductId === product.id ? (
                                                    <Input
                                                        name="price"
                                                        value={editingProductData.price}
                                                        onChange={handleEditChange} />
                                                ) : (
                                                    product.price
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {editingProductId === product.id ? (
                                                    <Input
                                                        name="type"
                                                        value={editingProductData.type}
                                                        onChange={handleEditChange} />
                                                ) : (
                                                    product.type
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">{new Date(product.createdAt).toLocaleString()}</td>
                                            <td className="py-2 px-4 border-b flex space-x-2">
                                                {editingProductId === product.id ? (
                                                    <>
                                                        <ButtonPrimary
                                                            onClick={handleUpdateProduct}
                                                            text={"Save"} />

                                                        <Button
                                                            onClick={() => {
                                                                setEditingProductId(null);
                                                            }}
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
                                                                setEditingProductId(product.id);
                                                                setEditingProductData({ name: product.name, price: product.price, type: product.type });
                                                            }} />

                                                        <Button
                                                            onClick={() => handleDeleteProduct(product.id)}
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
                            <p>Tidak Ada Produk.</p>
                        )}
                    </CardBody>
                </Card>
            </div>
            <FooterBar />
        </Layout>
    );
};

export default ProdukPage;
