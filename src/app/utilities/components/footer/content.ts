type FooterLink = {
    name: string;
    path: string;
};

export type FooterContent = {
    text: string;
    links: FooterLink[];
};

const angularLink: string = `
    <a class="angular" href="https://angular.dev/" target="_blank">
        Angular
    </a>
`;

export const footerContentGr: FooterContent = {
    text: `
      Μια ${angularLink} εφαρμογή απο τον 
      <a href="https://nick-polizogopoulos.web.app/" class="link nodecor" target="_blank">
        Νίκο Πολυζωγόπουλο</a><span class="monospace">.</span>
    `,
    links: [
      {
        name: 'Πληροφορίες',
        path: 'about'
      },
      {
        name: 'Cookies',
        path: 'cookies'
      },
      {
        name: 'Απόρρητο & Όροι',
        path: 'privacy-terms'
      }
    ]
  };

  export const footerContentEng: FooterContent = {
    text: `
      An ${angularLink} Application by 
      <a href="https://nick-polizogopoulos.web.app/" class="link nodecor" target="_blank">
        Nick Polizogopoulos</a><span class="monospace">.</span>
    `,
    links: [
      {
        name: 'About',
        path: 'about'
      },
      {
        name: 'Cookies',
        path: 'cookies'
      },
      {
        name: 'Privacy & Terms',
        path: 'privacy-terms'
      }
    ]
  };

  export const footerContentSp: FooterContent = {
    text: ` 
      Una aplicación ${angularLink} de
      <a href="https://nick-polizogopoulos.web.app/" class="link nodecor" target="_blank">
        Nick Polizogopoulos</a><span class="monospace">.</span>
    `,
    links: [
      {
        name: 'Acerca',
        path: 'about'
      },
      {
        name: 'Cookies',
        path: 'cookies'
      },
      {
        name: 'Privacidad y Términos',
        path: 'privacy-terms'
      }
    ]
  };

  export const footerContentFr: FooterContent = {
    text: ` 
      Une application ${angularLink} par 
      <a href="https://nick-polizogopoulos.web.app/" class="link nodecor" target="_blank">
        Nick Polizogopoulos</a><span class="monospace">.</span>
    `,
    links: [
      {
        name: 'À propos',
        path: 'about'
      },
      {
        name: 'Cookies',
        path: 'cookies'
      },
      {
        name: 'Confidentialité et Conditions',
        path: 'privacy-terms'
      }
    ]
  };

  export const footerContentIt: FooterContent = {
    text: ` 
      Un'applicazione ${angularLink} di 
      <a href="https://nick-polizogopoulos.web.app/" class="link nodecor" target="_blank">
        Nick Polizogopoulos</a><span class="monospace">.</span>
    `,
    links: [
      {
        name: 'Informazioni',
        path: 'about'
      },
      {
        name: 'Cookies',
        path: 'cookies'
      },
      {
        name: 'Privacy e Termini',
        path: 'privacy-terms'
      }
    ]
  };

  export const footerContentRu: FooterContent = {
    text: ` 
      Приложение ${angularLink} от 
      <a href="https://nick-polizogopoulos.web.app/" class="link nodecor" target="_blank">
        Nick Polizogopoulos</a><span class="monospace">.</span>
    `,
    links: [
      {
        name: 'О приложении',
        path: 'about'
      },
      {
        name: 'Куки',
        path: 'cookies'
      },
      {
        name: 'Конфиденциальность и условия',
        path: 'privacy-terms'
      }
    ]
  };

  export const footerContentKr: FooterContent = {
    text: ` 
      <a href="https://nick-polizogopoulos.web.app/" class="link nodecor" target="_blank">
        Nick Polizogopoulos</a>
         가 만든 ${angularLink} 애플리케이션<span class="monospace">.</span>
    `,
    links: [
      {
        name: '앱 소개',
        path: 'about'
      },
      {
        name: '웹 쿠키',
        path: 'cookies'
      },
      {
        name: '개인정보 보호 및 이용 약관',
        path: 'privacy-terms'
      }
    ]
  };