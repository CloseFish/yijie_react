import React, { useState, useEffect } from 'react';
import { PageType } from '../types';

interface SmartHomeButtonProps {
	setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const SmartHomeButton: React.FC<SmartHomeButtonProps> = ({ setCurrentPage }) => {
	const [showButton, setShowButton] = useState(() => {
		const stored = localStorage.getItem("showSmartHomeButton");
		return stored ? JSON.parse(stored) : false;
	});

	useEffect(() => {
		localStorage.setItem("showSmartHomeButton", JSON.stringify(showButton));
	}, [showButton]);

	// 添加一个静态方法来设置按钮的显示状态
	useEffect(() => {
		const messageCount = localStorage.getItem("messageCount");
		if (messageCount === "3") {
			setShowButton(true);
		}
	}, []);

	const handleSmartHomeClick = () => {
		setCurrentPage('home');
	};

	return showButton ? (
		<button
			className="flex items-center text-gray-600 hover:text-gray-800"
			onClick={handleSmartHomeClick}
		>
			<i className="fa-solid fa-home mr-2"></i>
			跳转到智能家居界面
		</button>
	) : null;
};

export default SmartHomeButton; 