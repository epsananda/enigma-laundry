import React from 'react';
import { Card, CardBody, CardHeader, Divider, } from '@nextui-org/react';
import logoImage from '../image/logo.png';
import transactionLogo from '../image/transaction.png';
import ProfileButton from './ProfileButton';
import produk from '../image/produk.png'
import ButtonPrimary from './ButtonPrimary';
import customer from '../image/customer.png'

const Sidebar = () => {
  return (
    <div className="w-64  text-gray-100 p-4 flex flex-col">
      <Card className='flex-1'>
        <CardBody className="bg-[#f9f4ef] flex flex-col h-full">
          <CardHeader className="flex-1 flex flex-col">
            <img src={logoImage} className="w-full h-40 object-cover" />

            <Divider />

            <CardHeader>
              <ul>
                <li>
                  <a className='font-semibold'>Menu</a>
                </li>
                <li>

                  <ButtonPrimary to="/transaksi" className="w-40" text={"Transaksi"}>
                    <img src={transactionLogo} alt="Transaksi" className="w-4 h-4 mr-2" />
                  </ButtonPrimary>

                  <ul>
                    <li >

                      <ButtonPrimary to="/produk" text={"Produk"} className="w-40">
                        <img src={produk} alt="produk" className="w-4 h-4 mr-2" />
                      </ButtonPrimary>

                      <ul>
                        <li>
                          <ButtonPrimary to="/costumer" text={"Konsumen"} className="w-40">
                            <img src={customer} alt="customer" className="w-4 h-4 mr-2" />
                          </ButtonPrimary>
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <ProfileButton className="mt-2" />
                        </li>
                      </ul>



                    </li>
                  </ul>
                </li>
              </ul>
            </CardHeader>
          </CardHeader>
        </CardBody>
      </Card>
    </div>
  );
};

export default Sidebar;