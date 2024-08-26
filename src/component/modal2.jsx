import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Input, useDisclosure, ModalContent } from "@nextui-org/react";
// import { Form } from "react-bootstrap";

const transactionSchema = z.object({
    customerId: z.string().nonempty("Pilih nama konsumen"),
    productId: z.string().nonempty("Pilih paket laundry"),
    quantity: z.number().min(1, "Jumlah harus lebih dari 0"),
});

const CreateTransactionModal = () => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(transactionSchema),
        mode: "onSubmit",
        defaultValues: {
            customerId: "",
            productId: "",
            quantity: 0,
        }
    });

    const selectedProduct = watch("productId");
    const quantity = watch("quantity");

    const createTransaction = async (data) => {
        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const payload = {
                customerId: data.customerId,
                billDetails: [
                    {
                        product: {
                            id: data.productId,
                        },
                        qty: data.quantity,
                    },
                ],
            };
            const response = await axiosInstance.post("/bills", payload, { headers });
            if (response.status === 201) {
                toast.success("Transaction Created Successfully");
                setTimeout(() => {
                    onClose();
                }, 500);
            } else {
                toast.error("Transaction Failed");
            }
        } catch (error) {
            if (error?.response?.data?.status?.description) {
                toast.error("Data Tidak Valid");
            } else {
                console.log(error);
                toast.error("Create Transaction Failed");
            }
        }
    };

    const getProducts = async () => {
        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axiosInstance.get("/products", { headers });
            setProducts(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getCustomers = async () => {
        try {
            const token = localStorage.getItem('nilai token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axiosInstance.get("/customers", { headers });
            setCustomers(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const formatRupiah = (value) => {
        return value.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    };

    useEffect(() => {
        getProducts();
        getCustomers();
    }, []);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (

        <>
            <Button onPress={onOpen} color="primary">Tambahkan Transaksi</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Transaksi</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit(createTransaction)}>
                                    <Input
                                        as="select"
                                        {...register("customerId")}
                                        isInvalid={errors.customerId}
                                    >
                                        <option value="" disabled>Pilih Nama Konsumen</option>
                                        {customers.map((customer, index) => (
                                            <option key={customer.id} value={customer.id} disabled={index > 1}>
                                                {index > 1 ? `${customer.name} (tidak dapat dipilih)` : customer.name}
                                            </option>
                                        ))}
                                    </Input>
                                    {errors.customerId && <span>{errors.customerId.message}</span>}

                                    <Input
                                        as="select"
                                        {...register("productId")}
                                        isInvalid={errors.productId}
                                    >
                                        <option value="" disabled>Pilih Paket Laundry</option>
                                        {products.map((product, index) => (
                                            <option key={product.id} value={product.id} disabled={index > 1}>
                                                {index > 1 ? `${product.name} (tidak dapat dipilih)` : product.name}
                                            </option>
                                        ))}
                                    </Input>
                                    {errors.productId && <span>{errors.productId.message}</span>}

                                    <Input
                                        type="number"
                                        {...register("quantity", { valueAsNumber: true })}
                                        isInvalid={errors.quantity}
                                    />
                                    {errors.quantity && <span>{errors.quantity.message}</span>}

                                    <Input
                                        type="text"
                                        value={formatRupiah(products.find((product) => product.id === selectedProduct)?.price * quantity || 0)}
                                        disabled
                                    />
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}


export default CreateTransactionModal;
