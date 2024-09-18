import React, { useCallback } from "react";
import search from "../assets/search.svg";
import CustomButton from "./CustomButton";
import { usePrivy } from "@privy-io/react-auth";
import { IconBrandMantine } from "@tabler/icons-react";
import menu from "../assets/menu.svg";
import { useState } from "react";
import { navLinks } from "../constants";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const {ready, authenticated, login, user, logout} = usePrivy()
    const [toggleMenu, setToggleMenu] = useState(false);
    const [isActive, setIsActive] = useState('dashboard');
    const handleLoginLogout = useCallback(() => {
        if(authenticated) {
            logout()
        } else {
            login().then(() => {
                if(user){
                    console.log(user)
                    // fetch user
                }
            })
        }
    }, [authenticated, login, user, logout])
    return (
        <div className="mb-[35px] flex flex-col-reverse justify-between pt-3 gap-6 md:flex-row">
            {/* Search Bar */}
            <div className="flex h-[52px] max-w-[458px] flex-row rounded-[100px] bg-[#1c1c24] py-2 pl-4 pr-2 lg:flex-1">
                <input 
                    type="text"
                    placeholder="Search"
                    className="flex w-full bg-transparent font-epilogue text-[14px] font-normal text-white outline-none placeholder:text-[#4b5264]"

                />
                <div className="flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[20px] bg-[#4acd8d]">
                    <img 
                        src={search}
                        alt="search"
                        className="w-[15px] h-[15px] object-contain"
                    />

                </div> 
            </div>

            <div className="hidden flex-row justify-end gap-2 sm:flex">
                <CustomButton
                    btnType={'button'}
                    title={authenticated ? 'Logout' : 'Login'}
                    styles={authenticated ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                    handleClick={handleLoginLogout}
                />
            </div>

            <div className="relative flex items-center justify-between sm:hidden">
                <div className="flex h-[40px] cursor-pointer items-center justify-center rounded-[10px] bg-[#2c2f32]">
                    <IconBrandMantine size={60} color="#1ec070" className="p-2"/>
                </div>
                <img src={menu} alt="menu" className="w-[34px] h-[34px] cursor-pointer object-contain" 
                onClick={() => { setToggleMenu((prev)=> !prev)}} 
                />
                <div className={`absolute left-0 right-0 top-[60px] z-10 bg-[#1c1c24] py-4 shadow-secondary
                    ${!toggleMenu ? 'hidden' : 'block'}
                    transition-all duration-700
                    `}>
                     <ul className="mb-4">
                        {
                            navLinks.map((link) => (
                                <li key={link.name} className={`flex p-4 ${isActive === link.name && "bg-[#3a3a43]"}`}
                                    onClick={() => {
                                        setIsActive(link.name);
                                        setToggleMenu(false);
                                        navigate(link.link);
                                    }}
                                >
                                    {link.name}
                                </li>
                            ))
                        }
                     </ul>

                </div>
            </div>
        </div>
    )
}

export default Navbar;