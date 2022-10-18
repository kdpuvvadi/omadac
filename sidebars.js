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
          label: "🧰 Manual",
          id: 'install/install_manual',
        },
        {
          type: 'doc',
          label: "🛠 Ansible",
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
          label: "🧰 Manual",
          id: 'upgrade/upgrade_manual',
        },
        {
          type: 'doc',
          label: "🛠 Ansible",
          id: 'upgrade/upgrade_ansible',
        },
      ],
    },

    {
      type: 'category',
      label: '🔒 SSL',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'ssl/ssl',
      },
      items: [
        {
          type: 'doc',
          label: "⚿ minica",
          id: 'ssl/minica',
        },
        {
          type: 'doc',
          label: "⚿ mkcert",
          id: 'ssl/mkcert',
        },
        {
          type: 'doc',
          label: "⚿ pkcs",
          id: 'ssl/pkcs',
        },
      ],
    },

  ],
};
