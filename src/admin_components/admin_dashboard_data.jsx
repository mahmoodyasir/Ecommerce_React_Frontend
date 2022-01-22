import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import {useGlobalState} from "../state/provider";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>
    },
    {
        title: 'Actions',
        path: '#',
        icon: <AiIcons.AiFillTool/>,
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
        title: 'Orders',
        path: '#',
        icon: <AiIcons.AiFillPlusCircle/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'All Orders',
                path: '/order_page/all_order',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Incomplete Orders',
                path: '/order_page/incomplete_order',
                icon: <IoIcons.IoIosPaper/>
            }
        ]
    },
    {
        title: 'Create Admin User',
        path: '/admin_user',
        icon: <FaIcons.FaUserPlus/>
    },
    {
        title: 'Logout',
        path: '/admin_logout',
        icon: <IoIcons.IoMdHelpCircle/>
    }
];