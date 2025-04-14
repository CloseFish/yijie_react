import React, { useState } from 'react';
import MyHomePage from './pages/MyHomePage';
import YijieMainPageGarbage from './garbage-pages/YijieMainPageGarbage';
import GarbageInterface1 from './garbage-pages/GarbageInterface1';
import GarbageInterface2 from './garbage-pages/GarbageInterface2'; // 引入 GarbageInterface2 组件

const AppGarbage: React.FC = () => {
    // 扩展 currentPage 的状态类型，添加 'yijie'、'garbage1' 和 'garbage2'
    const [currentPage, setCurrentPage] = useState<'home' | 'yijie' | 'garbage1' | 'garbage2'>('yijie'); // 修改初始值为 'yijie'

    return (
        <div className="min-h-screen bg-[#f0f5f0] text-gray-800">
            <div className="w-[1440px] mx-auto min-h-[1024px] p-6">
                <main className="flex-1 p-6">
					{currentPage === 'home' && <MyHomePage />}
                    {currentPage === 'yijie' && <YijieMainPageGarbage setCurrentPage={setCurrentPage} />}
                    {currentPage === 'garbage1' && <GarbageInterface1 setCurrentPage={setCurrentPage} />}
                    {currentPage === 'garbage2' && <GarbageInterface2 setCurrentPage={setCurrentPage} />} {/* 添加垃圾界面2的显示逻辑 */}
                </main>
            </div>
        </div>
    );
};

export default AppGarbage;