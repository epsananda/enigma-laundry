import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import CreateTransactionModal from "../CreateTransactionModal";

const ModalTransaksi = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
        console.log("Opening modal");
        setIsOpen(true);
    };
    
    const onClose = () => {
        console.log("Closing modal");
        setIsOpen(false);
    };
    
    return (
        <>
            <Button onClick={onOpen} color="primary">Tambahkan Transaksi</Button>
            <CreateTransactionModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default ModalTransaksi;
