import React, { useState, useEffect } from "react";
import { navLinks } from "../constants";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IconBrandMantine } from "@tabler/icons-react";

const Icon = ({ styles, name, imageUrl, isActive, handleClick, size = '24px' }) => {
    const activeColor = '#1ec070'; // Green color for active icons
    const inactiveColor = '#808191'; // Gray color for inactive icons

    return (
        <div 
            className={`flex items-center justify-center ${isActive === name ? 'bg-[#2c2f32]' : ''} rounded-[10px] ${styles}`}
            onClick={handleClick}
            style={{ width: size, height: size }}
        >
            <img 
                src={imageUrl} 
                alt={`${name} icon`}
                className={`w-4/5 h-4/5`}
                style={{
                    filter: `brightness(0) saturate(100%) ${isActive === name 
                        ? `invert(48%) sepia(79%) saturate(2476%) hue-rotate(130deg) brightness(118%) contrast(119%)`
                        : `invert(55%) sepia(12%) saturate(282%) hue-rotate(202deg) brightness(87%) contrast(85%)`}`
                }}
            />
        </div>
    )
}

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isActive, setIsActive] = useState('dashboard');

    useEffect(() => {
        const currentPath = location.pathname;
        const activeLink = navLinks.find(link => link.link === currentPath);
        if (activeLink) {
            setIsActive(activeLink.name);
        } else {
            setIsActive(''); // Set to empty string if no match (e.g., home page)
        }
    }, [location]);

    return (
        <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
            <Link 
            to='/'
            >
                <div className="rounded-[10px] bg-[#2c2f32] p-2">
                    <IconBrandMantine size={60} color="#1ec070"/>
                </div>
            </Link>

            <div className="flex w-[80px] flex-col items-center justify-center rounded-[20px] bg-[#1c1c24] py-8">
                <div className="flex flex-col items-center justify-center gap-20">
                    {
                        navLinks.map((link) => (
                            <Icon 
                                key={link.name}
                                {...link}
                                isActive={isActive}
                                size="60px"  // Adjust size here
                                handleClick={() => {
                                    setIsActive(link.name);
                                    navigate(link.link);
                                }}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="h-[60px]"></div> {/* Spacer div */}
        </div>
    )
}

export default Sidebar;