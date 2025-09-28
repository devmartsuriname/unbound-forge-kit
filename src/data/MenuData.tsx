
interface MenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
}

const menu_data: MenuItem[] = [
    {
        id: 1,
        has_dropdown: false,
        title: "Home",
        link: "/",
    },
    {
        id: 2,
        has_dropdown: false,
        title: "Tours",
        link: "/tours",
    },
    {
        id: 3,
        has_dropdown: false,
        title: "About",
        link: "/about",
    },
    {
        id: 4,
        has_dropdown: false,
        title: "Pricing",
        link: "/pricing",
    },
    {
        id: 5,
        has_dropdown: false,
        title: "Schedule",
        link: "/schedule",
    },
    {
        id: 6,
        has_dropdown: false,
        title: "Team",
        link: "/team",
    },
    {
        id: 7,
        has_dropdown: false,
        title: "Gallery",
        link: "/gallery",
    },
    {
        id: 8,
        has_dropdown: false,
        title: "FAQ",
        link: "/faq",
    },
    {
        id: 9,
        has_dropdown: false,
        title: "Shop",
        link: "/shop",
    },
    {
        id: 10,
        has_dropdown: false,
        title: "Contact",
        link: "/contact",
    },
];

export default menu_data;