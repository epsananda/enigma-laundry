import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import user from '../image/user.png';
import { Link } from 'react-router-dom'
import { axiosInstance } from "../lib/axios";

const ProfileButton = () => {

    const [users, setUsers] = useState("")

    const getUser = async () => {
        const response = await axiosInstance.get("")
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className="bg-[#8c7851] text-white mt-1 font-semibold w-40
                  hover:bg-white hover:text-[#8c7851] hover:border hover:border-[#8c7851]"
                    variant="bordered"
                >
                    <img src={user} alt="user" className="w-4 h-4 mr-2" />
                    Profile
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Profile</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                    <Link to='/'>
                    Logout
                    </Link>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default ProfileButton