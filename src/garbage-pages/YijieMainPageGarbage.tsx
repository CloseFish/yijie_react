import React, { useEffect, useState, useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// 修改 setCurrentPage 的参数类型，添加 'garbage1' 和 'garbage2'
interface YijieMainPageProps {
    setCurrentPage: (page: 'home' | 'yijie' | 'garbage1' | 'garbage2' | 'garbage3' | 'analysis') => void;
}

const YijieMainPageGarbage: React.FC<YijieMainPageProps> = ({ setCurrentPage }) => {
    // 从 localStorage 中读取聊天记录和回复索引
    const storedMessages = localStorage.getItem('chatMessages');
    const storedResponseIndex = localStorage.getItem('responseIndex');
    const storedThirdResponseIndex = localStorage.getItem('thirdResponseIndex');

    const [greeting, setGreeting] = useState<string>("");
    const [userInput, setUserInput] = useState<string>(""); // 保存输入框内容
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
        storedMessages ? JSON.parse(storedMessages) : [
            { text: "你好！我是翌界 AI 助手，请告诉我你想要的界面设计风格，我会为你生成完美的用户界面。", isUser: false }
        ]
    ); // 用户发过的消息列表
    const [responseIndex, setResponseIndex] = useState<number>(
        storedResponseIndex ? parseInt(storedResponseIndex, 10) : 0
    );
    const [thirdResponseIndex, setThirdResponseIndex] = useState<number | null>(
        storedThirdResponseIndex ? parseInt(storedThirdResponseIndex, 10) : null
    );

    // Add a ref for auto-scrolling
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 新增状态来控制进度条的显示和进度值
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [progress, setProgress] = useState(0);

    // 新增状态来控制下载完成弹窗的显示
    const [showDownloadSuccessModal, setShowDownloadSuccessModal] = useState(false);

    const aiResponses = [
        "好的！您希望这个界面包含哪些内容呢？",
        "好的，我将为您生成智能家具界面。根据您的需求，智能家居界面要包含常用设备开关与数据监测统计功能。请问您家中一共有哪些智能家具设备呢？",
        "好的。正在为您生成智能家居界面。",
        "好的！我将为您在主页轮播家中智能摄像头的实时画面，并对整个房间的耗电量进行实时监控，实现对家庭设备的实时检测与控制。",
        "好的，我将为您生成设备界面，可以对所有的设备进行便捷操作。",
        "好的，我将结合大数据，为您生成智能分析界面，同时，您还可以在主页右上方点击输入指令，我会对您的要求进行智能回答。"
    ];

    useEffect(() => {
        updateGreeting();
    }, []);

    // Add scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Function to scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const updateGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            setGreeting("早上好，欢迎使用翌界！");
        } else if (hour >= 12 && hour < 18) {
            setGreeting("下午好，欢迎使用翌界！");
        } else {
            setGreeting("晚上好，欢迎使用翌界！");
        }
    };

    const handleSend = () => {
        if (userInput.trim() !== "") {
            setMessages((prev) => {
                const newMessages = [...prev, { text: userInput, isUser: true }];
                setUserInput(""); // 清空输入框
                // 添加自动回复
                if (responseIndex < aiResponses.length) {
                    setTimeout(() => {
                        const updatedMessages = [...newMessages, { text: aiResponses[responseIndex], isUser: false }];
                        setMessages(updatedMessages);
                        if (responseIndex === 2) {
                            setThirdResponseIndex(updatedMessages.length - 1);
                            localStorage.setItem('thirdResponseIndex', (updatedMessages.length - 1).toString());
                        }
                        setResponseIndex(responseIndex + 1);
                        // 保存更新后的聊天记录和回复索引到 localStorage
                        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
                        localStorage.setItem('responseIndex', (responseIndex + 1).toString());
                    }, 500);
                }
                return newMessages;
            });
        }
    };

    const handleJumpToGarbageInterface1 = () => {
        setTimeout(() => {
            setCurrentPage('garbage1'); // 0.5秒后跳转到 垃圾界面1
        }, 500);
    };

    const handleJumpToGarbageInterface2 = () => {
        setTimeout(() => {
            setCurrentPage('garbage2'); // 0.5秒后跳转到 垃圾界面2
        }, 500);
    };

    const handleJumpToGarbageInterface3 = () => {
        setTimeout(() => {
            setCurrentPage('garbage3'); // 0.5秒后跳转到 垃圾界面3
        }, 500);
    };

    const handleJumpToMyHomePage = () => {
        setTimeout(() => {
            setCurrentPage('analysis'); // 0.5秒后跳转到 好的
        }, 500);
    };

    const handleNewConversation = () => {
        const initialMessages = [
            { text: "你好！我是翌界 AI 助手，请告诉我你想要的界面设计风格，我会为你生成完美的用户界面。", isUser: false }
        ];
        setMessages(initialMessages);
        setResponseIndex(0);
        setThirdResponseIndex(null);
        localStorage.setItem('chatMessages', JSON.stringify(initialMessages));
        localStorage.setItem('responseIndex', '0');
        localStorage.setItem('thirdResponseIndex', 'null');
    };

    const handleDownload = () => {
        setShowProgressBar(true);
        setProgress(0);

        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 1;
                if (newProgress >= 100) {
                    clearInterval(timer);
                    setShowProgressBar(false);
                    // 下载完成后显示弹窗
                    setShowDownloadSuccessModal(true);
                }
                return newProgress;
            });
        }, 50);
    };

    // 关闭下载完成弹窗的函数
    const handleCloseDownloadSuccessModal = () => {
        setShowDownloadSuccessModal(false);
    };

    return (
        <div className="bg-gradient-to-tr from-blue-100 via-white to-blue-100 min-h-screen w-full m-0">
            <div className="p-6">
                <style>
                    {`
            @font-face {
              font-family: 'DingTalkProgress';
              src: url('/fonts/钉钉进步体.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
          `}
                </style>
                <div className="flex h-full relative justify-center items-center">
                    {/* 左侧导航栏 */}
                    <div className="fixed left-6 top-1/2 -translate-y-1/2 w-[80px] bg-white shadow-lg flex flex-col items-center py-4 rounded-2xl space-y-6">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                            <img
                                src="/icons/yijie_logo.svg"
                                alt="翌界 logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="relative">
                            <Popover>
                                <PopoverTrigger isOpen={false} togglePopover={() => { }}>
                                    <Avatar className="w-12 h-12 cursor-pointer">
                                        <img
                                            src="/images/MissLi_20_south_dog.jpg"
                                            alt="用户头像"
                                            className="w-[120%] h-[120%] object-cover"
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent isOpen={false}>
                                    <div className="space-y-2">
                                        <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                                            <i className="fas fa-user text-gray-600"></i> 用户信息
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                                            <i className="fas fa-palette text-gray-600"></i> 界面主题
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                                            <i className="fas fa-language text-gray-600"></i> 语言选择
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                                            <i className="fas fa-comment-dots text-gray-600"></i> 用户反馈
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                                            <i className="fas fa-sign-out-alt text-gray-600"></i> 退出登录
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex-1 flex flex-col gap-4 justify-center">
                            <TooltipProvider>
                                <Tooltip content="添加新会话">
                                    <TooltipTrigger>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="!rounded-button hover:bg-blue-50 w-12 h-12 flex items-center justify-center"
                                            onClick={handleNewConversation}
                                        >
                                            <i className="fas fa-plus text-gray-600 text-2xl"></i>
                                        </Button>
                                    </TooltipTrigger>
                                </Tooltip>
                                <Tooltip content="历史记录">
                                    <TooltipTrigger>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="!rounded-button hover:bg-blue-50 w-12 h-12 flex items-center justify-center"
                                        >
                                            <i className="fas fa-history text-gray-600 text-2xl"></i>
                                        </Button>
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="mt-auto">
                            <Popover>
                                <PopoverTrigger isOpen={false} togglePopover={() => { }}>
                                    <Tooltip content="下载">
                                        <TooltipTrigger>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="!rounded-button hover:bg-blue-50 w-12 h-12 flex items-center justify-center"
                                                onClick={handleDownload}
                                            >
                                                <i className="fas fa-download text-gray-600 text-2xl"></i>
                                            </Button>
                                        </TooltipTrigger>
                                    </Tooltip>
                                </PopoverTrigger>
                                <PopoverContent isOpen={false}>
                                    <div className="space-y-2">
                                        <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                                            <i className="fas fa-desktop text-gray-600"></i> 下载桌面端
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                                            <i className="fas fa-puzzle-piece text-gray-600"></i> 添加浏览器插件
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    {/* 主体内容区 */}
                    <div className="flex-1 flex flex-col pl-20 h-full">
                        <div className="text-center mb-12 mt-20">
                            <h1
                                className="text-[100px] font-bold mb-6"
                                style={{
                                    fontFamily: 'DingTalkProgress, sans-serif',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    letterSpacing: '4px',
                                    background: 'linear-gradient(to bottom, rgba(22, 124, 255, 1), rgba(92, 169, 255, 0.6))',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                翌 界
                            </h1>
                            <p className="text-gray-600 mb-12 text-2xl">{greeting}</p>
                            <div className="flex flex-col items-center justify-center h-full pb-6">
                                <div className="w-1/2 bg-blue-200/50 rounded-t-3xl p-4 shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-blue-300 h-[500px] overflow-auto flex flex-col justify-between">
                                    {/* 对话区域 */}
                                    <div className="flex flex-col gap-3 overflow-y-auto flex-1">
                                        {/* 消息列表 */}
                                        {messages.map((msg, index) => (
                                            <div key={index} className={`flex gap-3 ${msg.isUser ? 'justify-end' : ''}`}>
                                                {!msg.isUser && (
                                                    <Avatar className="w-10 h-10">
                                                        <img
                                                            src="https://ai-public.mastergo.com/ai/img_res/40498f8a432cce37978cd3df80f9db7e.jpg"
                                                            alt="AI头像"
                                                        />
                                                    </Avatar>
                                                )}
                                                <div className={`rounded-2xl p-4 shadow-sm max-w-[70%] ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-white'}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                                    <p className="text-lg text-left" dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                                                    {/* 判断是否为第三次 AI 回复并显示跳转按钮 */}
                                                    {!msg.isUser && index === thirdResponseIndex && (
                                                        <Button
                                                            onClick={handleJumpToGarbageInterface1}
                                                            className="mt-0 ml-3 text-sm px-2 py-1"
                                                        >
                                                            跳转到 智能家居界面
                                                        </Button>
                                                    )}
                                                    {/* 判断是否为第四次 AI 回复并显示跳转按钮 */}
                                                    {!msg.isUser && responseIndex === 4 && index === messages.length - 1 && (
                                                        <Button
                                                            onClick={handleJumpToGarbageInterface2}
                                                            className="mt-0 ml-3 text-sm px-2 py-1"
                                                        >
                                                            跳转到 改进智能家居界面
                                                        </Button>
                                                    )}
                                                    {/* 判断是否为第五次 AI 回复并显示跳转按钮 */}
                                                    {!msg.isUser && responseIndex === 5 && index === messages.length - 1 && (
                                                        <Button
                                                            onClick={handleJumpToGarbageInterface3}
                                                            className="mt-0 ml-3 text-sm px-2 py-1"
                                                        >
                                                            跳转到 设备界面
                                                        </Button>
                                                    )}
                                                    {/* 判断是否为第六次 AI 回复并显示跳转按钮 */}
                                                    {!msg.isUser && responseIndex === 6 && index === messages.length - 1 && (
                                                        <Button
                                                            onClick={handleJumpToMyHomePage}
                                                            className="mt-0 ml-3 text-sm px-2 py-1"
                                                        >
                                                            跳转到 智能分析界面
                                                        </Button>
                                                    )}
                                                </div>
                                                {msg.isUser && (
                                                    <Avatar className="w-10 h-10">
                                                        <img
                                                            src="/images/MissLi_20_south_dog.jpg"
                                                            alt="用户头像"
                                                            className="w-[120%] h-[120%] object-cover"
                                                        />
                                                    </Avatar>
                                                )}
                                            </div>
                                        ))}
                                        {/* Add div reference for auto-scrolling */}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* 输入区域 - 修改为更好的输入框 */}
                                    <div>
                                        <div className="relative mb-8">
                                            <input
                                                className="bg-white text-xl py-4 rounded-xl border-2 border-gray-100 w-full pl-4 pr-36"
                                                placeholder="请输入你想要的界面设计风格..."
                                                type="text"
                                                value={userInput}
                                                onChange={(e) => setUserInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") handleSend();
                                                }}
                                            />
                                            <Button
                                                className="!rounded-xl whitespace-nowrap bg-blue-500 hover:bg-blue-600 text-white absolute right-2 top-1/2 -translate-y-1/2 py-3 px-8 text-lg"
                                                style={{
                                                    top: '50%',
                                                    bottom: 'auto',
                                                    height: 'calc(100% - 16px)'
                                                }}
                                                onClick={handleSend}
                                            >
                                                <i className="fas fa-paper-plane mr-2"></i>
                                                发送
                                            </Button>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex gap-4 justify-center">
                                                {["现代简约风格", "科技感设计", "明亮清新布局"].map((style, i) => (
                                                    <Button
                                                        key={i}
                                                        variant="outline"
                                                        className="bg-white/80 hover:bg-blue-50 rounded-xl py-3 px-6 text-lg w-1/3 whitespace-nowrap"
                                                        onClick={() => {
                                                            setMessages((prev) => {
                                                                const newMessages = [...prev, { text: style, isUser: true }];
                                                                if (responseIndex < aiResponses.length) {
                                                                    setTimeout(() => {
                                                                        const updatedMessages = [...newMessages, { text: aiResponses[responseIndex], isUser: false }];
                                                                        setMessages(updatedMessages);
                                                                        if (responseIndex === 2) {
                                                                            setThirdResponseIndex(updatedMessages.length - 1);
                                                                            localStorage.setItem('thirdResponseIndex', (updatedMessages.length - 1).toString());
                                                                        }
                                                                        setResponseIndex(responseIndex + 1);
                                                                        // 保存更新后的聊天记录和回复索引到 localStorage
                                                                        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
                                                                        localStorage.setItem('responseIndex', (responseIndex + 1).toString());
                                                                    }, 500);
                                                                }
                                                                return newMessages;
                                                            });
                                                        }}
                                                    >
                                                        {style}
                                                    </Button>
                                                ))}
                                            </div>
                                            <div className="flex gap-4 justify-center">
                                                {["深色主题界面", "智慧办公界面"].map((style, i) => (
                                                    <Button
                                                        key={i + 3}
                                                        variant="outline"
                                                        className="bg-white/80 hover:bg-blue-50 rounded-xl py-3 px-6 text-lg w-1/3 whitespace-nowrap"
                                                        onClick={() => {
                                                            setMessages((prev) => {
                                                                const newMessages = [...prev, { text: style, isUser: true }];
                                                                if (responseIndex < aiResponses.length) {
                                                                    setTimeout(() => {
                                                                        const updatedMessages = [...newMessages, { text: aiResponses[responseIndex], isUser: false }];
                                                                        setMessages(updatedMessages);
                                                                        if (responseIndex === 2) {
                                                                            setThirdResponseIndex(updatedMessages.length - 1);
                                                                            localStorage.setItem('thirdResponseIndex', (updatedMessages.length - 1).toString());
                                                                        }
                                                                        setResponseIndex(responseIndex + 1);
                                                                        // 保存更新后的聊天记录和回复索引到 localStorage
                                                                        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
                                                                        localStorage.setItem('responseIndex', (responseIndex + 1).toString());
                                                                    }, 500);
                                                                }
                                                                return newMessages;
                                                            });
                                                        }}
                                                    >
                                                        {style}
                                                    </Button>
                                                ))}
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showProgressBar && (
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white p-8 rounded-md shadow-md border-2 border-blue-700 ">
                        <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div className="bg-blue-500 h-6 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-center mt-2">{progress}%</p>
                    </div>
                )}
                {showDownloadSuccessModal && (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white p-8 rounded-lg shadow-md border-2 border-blue-700">
        <p className="text-center text-xl mb-4">代码成功导出到本地！</p>
        <div className="flex justify-center">
            <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-4 py-2" onClick={handleCloseDownloadSuccessModal}>
                关闭
            </button>
        </div>
    </div>
)}
            </div>
        </div>
    );
};

export default YijieMainPageGarbage;    