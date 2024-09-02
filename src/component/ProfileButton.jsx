import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import user from '../image/user.png';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProfileButton = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        dispatch({ type: "LOGOUT" });
        navigate("/");
        toast.success('Logout');
      };

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
               
                <DropdownItem   
                textValue="logout"
                key="logout"
                className="text-danger"
                color="danger"
                onClick={handleLogout}
                >
                        Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default ProfileButton;
