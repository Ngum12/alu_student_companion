import { useEffect, useState } from "react";
import { useConversations } from "@/hooks/useConversations";
import { useChatMessageHandler } from "./chat/ChatMessageHandler";
import { ChatInput } from "./ChatInput";
import { ConversationSidebar } from "./chat/ConversationSidebar";
import { ChatMessages } from "./chat/ChatMessages";
import { BackendStatus } from "./chat/BackendStatus";
import { OpportunityWidget } from "./opportunities/OpportunityWidget";

export const ChatContainer = () => {
  const [activeModel, setActiveModel] = useState("gemini");
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  useEffect(() => {
    setActiveModel(localStorage.getItem("ACTIVE_MODEL") || "gemini");
    setAccessibilityMode(localStorage.getItem("ACCESSIBILITY_MODE") === "true");
  }, []);

  const {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    getCurrentConversation,
    createNewConversation,
    handleDeleteConversation,
    addMessageToConversation,
    updateMessageInConversation,
  } = useConversations();

  const currentConversation = getCurrentConversation();

  const { isLoading, handleSendMessage, handleEditMessage } = useChatMessageHandler({
    currentConversationId,
    messages: currentConversation?.messages || [],
    onAddMessage: addMessageToConversation,
    onUpdateMessage: updateMessageInConversation,
  });

  return (
    <div
      className={`min-h-screen bg-white font-sans text-[#1A1A1A] flex ${
        accessibilityMode ? "text-lg leading-relaxed" : ""
      }`}
    >
      <ConversationSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onNewChat={createNewConversation}
        onSelectConversation={setCurrentConversationId}
        onDeleteConversation={handleDeleteConversation}
      />

      <main className="flex-1 pl-16 md:pl-64 lg:pr-80 transition-all duration-300 relative">
        {/* Top bar with backend status */}
        <div className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b border-[#E8DDB0]">
          <div className="h-14 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#D4AF37] flex items-center justify-center text-[#1A1A1A] font-bold text-xs">
                A
              </div>
              <span className="text-sm font-medium text-[#1A1A1A]">
                {currentConversation?.title || "New chat"}
              </span>
            </div>
            <BackendStatus />
          </div>
        </div>

        {/* Messages */}
        <div className="pb-44">
          <ChatMessages
            messages={currentConversation?.messages || []}
            isLoading={isLoading}
            onEditMessage={handleEditMessage}
            activeModel={activeModel}
          />
        </div>

        {/* Input pinned to bottom */}
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </main>

      {/* Right rail: Opportunities — hidden under lg breakpoint */}
      <aside className="hidden lg:flex fixed right-0 top-0 h-full w-80 bg-[#FBF7E9]/30 border-l border-[#E8DDB0] flex-col z-30">
        <div className="h-14 px-5 flex items-center border-b border-[#E8DDB0]">
          <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 font-semibold">
            For students
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <OpportunityWidget />
        </div>
        <div className="px-5 py-3 border-t border-[#E8DDB0] text-[10px] text-[#1A1A1A]/40 leading-relaxed">
          Opportunities rotate every few seconds. Hover the card to pause.
        </div>
      </aside>
    </div>
  );
};
