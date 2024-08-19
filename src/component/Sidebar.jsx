import React from 'react';
import { Button, Card, CardBody, CardHeader, Divider, } from '@nextui-org/react';
import logoImage from '../image/logo.png';
import transactionLogo from '../image/transaction.png';
import user from '../image/user.png';
import ProfileButton from './ProfileButton';
import { Link } from 'react-router-dom';
import produk from '../image/produk.png'
import ButtonPrimary from './ButtonPrimary';

const Sidebar = () => {
  return (
    <div className="w-64  bg-[#eaddcf] text-gray-100 p-4 flex flex-col">
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
                  {/* <Button className='mt-2 font-semibold w-40 bg-[#8c7851] py-2 px-1 text-[#fffffe] '>
                    <img src={transactionLogo} alt="Transaksi" className="w-4 h-4 mr-2" />
                    <Link to="/mainmenu" className="text-white no-underline">
                      Transaksi
                    </Link>

                  </Button> */}
                  <ButtonPrimary to="/mainmenu" className="w-40" text={"Transaksi"}>
                    <img src={transactionLogo} alt="Transaksi" className="w-4 h-4 mr-2" />
                  </ButtonPrimary>

                  <ul>
                    <li >
                      {/* <Button className='mt-2 font-semibold w-40 bg-[#8c7851] py-2 px-1 text-[#fffffe] '>
                        <img src={produk} alt="produk" className="w-4 h-4 mr-2" />
                        <Link to="/produk" className="text-white no-underline">
                          Produk
                        </Link>
                      </Button> */}
                      <ButtonPrimary to="/produk" text={"Produk"} className="w-40">
                        <img src={produk} alt="produk" className="w-4 h-4 mr-2" />
                      </ButtonPrimary>
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