// components/shared/Sidebar.tsx
import React from 'react';
import Button from '../../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
	currentPage: 'home' | 'yijie' | 'garbage1' | 'garbage2';
	setCurrentPage: React.Dispatch<React.SetStateAction<'home' | 'yijie' | 'garbage1' | 'garbage2'>>;
}

const GarbageSidebar1: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
	return (
		<aside className="w-72 bg-[#e0ebe0] p-6">
			<div className="flex flex-col items-center mb-8">
				<Avatar className="w-20 h-20 mb-2">
					<AvatarImage src="/images/MrsLin_35_north.jpg" />
					<AvatarFallback>用户</AvatarFallback>
				</Avatar>
				<div className="text-center">
					<h3 className="font-medium">林女士</h3>
					<p className="text-sm text-gray-600">北京市朝阳区机场北路3号</p>
				</div>
			</div>
			<nav className="space-y-6">
			</nav>
		</aside>
	);
};

export default GarbageSidebar1;