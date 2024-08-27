import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Table, Badge } from "@nextui-org/react";


const DetailTransacsation = ({ selectedCustomer}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    return (
        <>
            <Button onPress={onOpen} color="primary">Lihat Transaksi</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"> Riwayat Transaksi a.n {selectedCustomer?.name}</ModalHeader>
                            <ModalBody>
                                {selectedCustomer && (
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Kode Transaksi</th>
                                                <th>Tanggal Transaksi</th>
                                                <th>Jumlah</th>
                                                <th>Jenis Laundry</th>
                                                <th>Total Harga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedCustomer.transactions.map((transaction, index) => (
                                                <tr key={index}>
                                                    <td><Badge bg="secondary">{transaction.id.slice(0, 8)}</Badge></td>
                                                    <td>{formatDate(transaction.billDate)}</td>
                                                    <td>
                                                        {transaction.billDetails.map((item) => item.qty)}
                                                        <span> </span>

                                                        {transaction.billDetails.map((item) => item.product.type)}
                                                    </td>
                                                    <td>
                                                        {transaction.billDetails.map((item) => item.product.name)}
                                                    </td>
                                                    <td>
                                                        {new Intl.NumberFormat('id-ID', {
                                                            style: 'currency',
                                                            currency: 'IDR',
                                                            minimumFractionDigits: 0,
                                                        }).format(
                                                            transaction.billDetails.reduce((acc, item) => acc + item.price * item.qty, 0)
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
export default DetailTransacsation