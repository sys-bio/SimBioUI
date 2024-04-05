import {useState} from "react";

export function useTabManager(initialTabData) {
    const [tabs, setTabs] = useState([{ ...initialTabData, id: 1 }]);
    const [activeTabId, setActiveTabId] = useState(1);

    const addNewTab = () => {
        // Handle case when all tabs are closed and `tabs` array is empty
        const newId = tabs.length > 0 ? tabs[tabs.length - 1].id + 1 : 1;

        const newTab = { ...initialTabData, id: newId };
        setTabs([...tabs, newTab]);
        setActiveTabId(newId);
    };

    const switchTab = (id) => {
        setActiveTabId(id);
    };

    const updateActiveTabContent = (newContent) => {
        setTabs(tabs.map(tab => tab.id === activeTabId ? { ...tab, textContent: newContent } : tab));
    };

    const closeTab = (id) => {
        setTabs(currentTabs => {
            const newTabs = currentTabs.filter(tab => tab.id !== id);
            if (id === activeTabId && newTabs.length > 0) {
                // Immediately find a new tab to activate
                const newActiveTab = newTabs[0].id; // Default to the first tab
                setActiveTabId(newActiveTab);
            } else if (newTabs.length === 0) {
                setActiveTabId(null); // Or consider re-adding an initial tab here.
            }
            return newTabs;
        });
    };

    const getContentOfActiveTab = () => {
        const activeTab = tabs.find(tab => tab.id === activeTabId);
        return activeTab ? activeTab.textContent : '';
    };

    return { tabs, addNewTab, switchTab, updateActiveTabContent, closeTab, activeTabId, getContentOfActiveTab };
}
