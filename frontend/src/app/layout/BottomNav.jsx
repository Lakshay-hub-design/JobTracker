import { MdDashboard } from "react-icons/md";
import { TbBriefcase2Filled } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

const bottomMenu = [
    {
        name: "Dashboard",
        icon: MdDashboard,
        path: "/dashboard",
    },
    {
        name: "Applications",
        icon: TbBriefcase2Filled,
        path: "/jobs",
    },
    {
        name: "Settings",
        icon: IoSettings,
        path: "/settings",
    },
];

const BottomNav = () => {
    const location = useLocation()
  return (
    <div className="bg-white dark:bg-[#1c1c1c] border-t dark:border-gray-800 flex justify-around py-3.5">

      {bottomMenu.map((item, index) => {
        const Icon = item.icon

        return (
            <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => {
                const path = location.pathname
                let active = isActive   
                
                if (item.path === "/jobs") {
                    active = path === "/jobs" || path.startsWith("/job")
                }
                return `flex flex-col items-center py-1.5 px-4 rounded-full font-medium
                    ${
                        active
                        ? 'bg-gradient-to-br from-[#f89f87] via-[#f78161] to-[#fa7753] dark:text-[#282626] shadow-sm'
                        : 'text-[#565454] dark:text-[#ADAAAA]'
                    }
                `
            }}
            >
                <Icon size={20} />
                <span className="text-sm uppercase">{item.name}</span>
            </NavLink>
        )
      })}
    </div>
  );
};

export default BottomNav;