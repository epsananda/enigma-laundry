import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

const ModalTambahkan = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="bg-[#8c7851] text-white mb-4
    hover:bg-white hover:text-[#8c7851] hover:border hover:border-[#8c7851]">+ Tambah Transaksi</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Tambah Transaksi Baru</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Kode Transaksi"
                  placeholder="Masukkan kode pelanggan"
                  variant="bordered"
                />
                <Input
                  label="Nama Konsumen"
                  placeholder="Pilih Konsumen"
                  variant="bordered"
                />
                <Input
                  label="Pilih Paket Laundry"
                  placeholder="Pilih Paket"
                  type="number"
                  variant="bordered"
                />
                <Input
                  label="Qty(Kg)"
                  placeholder="Isi Kolom dengan format angka"
                  type="number"
                  variant="bordered"
                />
                <Input
                  label="Total Bayar"
                  placeholder="Total akan Tercetak otomatis"
                  type="number"
                  variant="bordered"
                />
                {/* Tambahkan input lain sesuai kebutuhan */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Batal
                </Button>
                <Button color="primary" onPress={() => {
                  // Logika untuk menyimpan transaksi
                  onClose();
                }}>
                  Simpan Transaksi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalTambahkan