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
      collapsed: false,
      link: {
        type: 'doc',
        id: 'install/install',
      },
      items: [
        {
          type: 'doc',
          label: "🧰 Manual Installation",
          id: 'install/install_manual',
        },
        {
          type: 'doc',
          label: "🛠 Install with Ansible",
          id: 'install/install_ansible',
        },
      ],
    },

    {
      type: 'category',
      label: '⛭ Upgrade',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'upgrade/upgrade',
      },
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
