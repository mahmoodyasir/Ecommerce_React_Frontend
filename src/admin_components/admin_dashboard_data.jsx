import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Actions',
        path: '/admin_action',
        icon: <AiIcons.AiFillHome/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Add Category',
                path: '/admin_action/add_category',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Add Product',
                path: '/admin_action/add_product',
                icon: <IoIcons.IoIosPaper/>
            }
        ]
    },

    {
        title: 'Profile',
        path: '/profile_role',
        icon: <AiIcons.AiFillHome/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Admin Profile',
                path: '/profile_role/admin_profile',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'User Profile',
                path: '/profile_role/user_profile',
                icon: <IoIcons.IoIosPaper/>
            }
        ]
    },
    {
        title: 'Logout',
        path: '/admin_logout',
        icon: <IoIcons.IoMdHelpCircle/>
    }
];