module.exports = {
  
  Sidebar: [
    
    {
      type: 'doc',
      id: 'intro',
      label: '🚀 Getting started',
    },

    {
      type: 'category',
      label: '⚙️ Installation',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          label: "🧰 Manual Installation",
          id: 'installation/install_manual',
        },
        {
          type: 'doc',
          label: "🛠 Install with Ansible",
          id: 'installation/install_ansible',
        },
      ],
    },

    {
      type: 'category',
      label: '⛭ Upgrade',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          label: "🧰 Manual Upgrade",
          id: 'upgrade/upgrade_manual',
        },
        {
          type: 'doc',
          label: "🛠 Upgrade with Ansible",
          id: 'upgrade/upgrade_ansible',
        },
      ],
    },

  ],
};
