import { AboutContent } from "./about-types";

export const contentKr: AboutContent = {
    pageHeader: '이 애플리케이션에 대하여',
    appDescription: `
        이 <strong><u>무료 오픈 소스</u></strong> 애플리케이션은 최신 도구들로 개발되었으며, 
        전문적인 제품 제안을 쉽게 만들고 공유할 수 있도록 도와줍니다. 
        최신 웹 기술을 사용하여 구축된 이 애플리케이션은 사용자 친화적이고 효율적인 경험을 제공하며, 
        기업이 간단히 양식을 작성하는 것만으로 상세한 제품 제안 PDF를 몇 분 만에 생성할 수 있도록 합니다. 
        생성된 제안서는 고객에게 직접 보낼 수 있습니다.
    `,
    keyFeaturesHeader: '주요 기능은 다음과 같습니다:',
    features: [
        {
            name: '동적 맞춤화',
            information: `회사는 자신의 정보와 고객 또는 클라이언트의 정보를 입력하고, 제안을 맞춤화하여 개인화된 PDF를 생성할 수 있습니다.`
        },
        {
            name: '시간 절약 기능',
            information: '회사 정보는 브라우저에 로컬로 저장되어, 이후 사용이 더 빠르고 편리합니다.'
        },
        {
            name: '제안 만료일',
            information: '이 애플리케이션은 PDF에 제안 만료일을 포함할 수 있도록 해줍니다.'
        },
        {
            name: '메모 추가',
            information: `
                메모를 추가하려면 "메모 추가" 버튼을 클릭하고 필드를 작성하십시오.
                메모를 PDF에서 제외하려면 "메모 삭제" 버튼을 클릭하면 메모가 제거됩니다.
            `
        },
        {
            name: '다국어 PDF',
            information: `
                PDF는 애플리케이션 상단에서 사용자가 선택한 언어로 생성됩니다.
            `
        },
        {
            name: '동적 제품 목록',
            information: `
                녹색 원 안에 있는 '+' 버튼을 클릭하여 제품을 목록에 추가하십시오.
                빨간색 쓰레기통 버튼을 클릭하여 제품을 목록에서 삭제하십시오.
                수량과 단가를 선택하면 애플리케이션이 자동으로 총 비용을 계산해줍니다.
            `
        },
        {
            name: '색상 있는 또는 없는 PDF',
            information: `
                PDF에 색상 세부 정보를 포함할지 여부를 선택할 수 있습니다.
                색상 옵션은 회사 세부 정보에 파란색 배경을 추가하고, 제품 테이블에 색상을 포함합니다.
            `
        }
    ],
    customPdfHeader: '맞춤형 PDF',
    contact: [
        `이 애플리케이션은 기업이 자체 맞춤형 PDF 파일을 생성할 수 있도록 맞춤화가 가능합니다. 
                여기에는 회사 로고와 기업이 표시하고자 하는 기타 콘텐츠를 포함할 수 있습니다.`,
        `제품 제안서뿐만 아니라 다양한 종류의 PDF 파일을 생성할 수 있는 옵션이 있습니다.`,
        `저에게 연락하려면 
        <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About a custom .pdf generator">
            여기 </a>를 클릭하세요. (영어로 작성해 주세요)`,
        `- Nick Polizogopoulos`,
    ],
    credits: '홈 페이지 일러스트레이션: <a href="https://undraw.co/" target="_blank">&nbsp;unDraw&nbsp;</a> - Katerina Limpitsouni. (대단히 감사합니다!)',
    buttonText: '나만의 .pdf 만들기!'
};
