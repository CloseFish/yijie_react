import React, { useState } from 'react';
import MyHomePage from './garbage-pages/MyHomePage';
import DevicePage from './garbage-pages/DevicePage';
import LoginPage from './pages/LoginPage';
import AnalysisPage from './pages/AnalysisPage';
import SmartPage from './garbage-pages/SmartPage';
import Sidebar from './garbage-components/shared/Sidebar';
import Header from './garbage-components/shared/Header';
import YijieMainPage from './garbage-pages/YijieMainPageGarbage';
import GarbageInterface1 from './garbage-pages/GarbageInterface1';
import GarbageInterface2 from './garbage-pages/GarbageInterface2'; 

const AppGarbage: React.FC = () => {
    // 扩展 currentPage 的状态类型，添加 'yijie'
    const [currentPage, setCurrentPage] = useState<'home' | 'devices' | 'analysis' | 'history' | 'settings' | 'login' | 'smart' | 'yijie' | 'garbage1' | 'garbage2'>('yijie');

    // 判断是否显示 Sidebar 和 Header
    const shouldShowSidebarAndHeader = ['home', 'devices', 'analysis'].includes(currentPage);

    return (
        <div className="min-h-screen bg-[#f0f5f0] text-gray-800">
            <div className="w-[1440px] mx-auto min-h-[1024px] p-6">
                {shouldShowSidebarAndHeader && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
                <div className="flex">
                    {shouldShowSidebarAndHeader && <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
                    <main className="flex-1 p-6">
                        {currentPage === 'home' && <MyHomePage />}
                        {currentPage === 'devices' && <DevicePage />}
                        {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
                        {currentPage === 'analysis' && <AnalysisPage />}
                        {currentPage === 'smart' && <SmartPage setCurrentPage={setCurrentPage} />}
                        {currentPage === 'yijie' && <YijieMainPage setCurrentPage={setCurrentPage} />}
                        {/* 其他页面 */}
                        {currentPage === 'garbage1' && <GarbageInterface1 setCurrentPage={setCurrentPage} />}
                        {currentPage === 'garbage2' && <GarbageInterface2 setCurrentPage={setCurrentPage} />} {/* 添加垃圾界面2的显示逻辑 */}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AppGarbage;    