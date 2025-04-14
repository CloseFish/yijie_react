import React, { useState } from 'react';
import MyHomePage from './pages/MyHomePage';
import YijieMainPageGarbage from './garbage-pages/YijieMainPageGarbage';
import GarbageInterface1 from './garbage-pages/GarbageInterface1'; // 引入 GarbageInterface1 组件

const AppGarbage: React.FC = () => {
	// 扩展 currentPage 的状态类型，添加 'yijie' 和 'garbage1'
	const [currentPage, setCurrentPage] = useState<'home' | 'yijie' | 'garbage1'>('yijie'); // 修改初始值为 'yijie'

	return (
		<div className="min-h-screen bg-[#f0f5f0] text-gray-800">
			<div className="w-[1440px] mx-auto min-h-[1024px] p-6">
				<main className="flex-1 p-6">
					{currentPage === 'home' && <MyHomePage />}
					{currentPage === 'yijie' && <YijieMainPageGarbage setCurrentPage={setCurrentPage} />}
					{currentPage === 'garbage1' && <GarbageInterface1 setCurrentPage={setCurrentPage} />} {/* 传递 setCurrentPage 函数 */}
				</main>
			</div>
		</div>
	);
};

export default AppGarbage;