import { PrivacyTermsContentType } from "./terms-types";

export const korean: PrivacyTermsContentType = {
    pageTitle: '개인정보 보호정책 및 이용약관',
    content: [
        {
            title: '개인정보 보호정책',
            date: '시행일: 2024년 12월 27일',
            introductionText: `
                "Product offer to .pdf" 는 귀하의 개인정보를 존중하며, 이를 보호하기 위해 최선을 다하고 있습니다. 
                다음은 귀하가 알아야 할 사항입니다:`,
            list: [
                {
                    title: '데이터 수집',
                    bullet: [
                        `저희는 사용자 데이터를 수집하거나 서버에 저장하지 않습니다.`,
                        `양식에 입력된 회사 정보는 편의를 위해 브라우저에 로컬로 저장됩니다. 
                        이 정보는 공유되거나 업로드되지 않습니다.`
                    ]
                },
                {
                    title: '구글 애널리틱스',
                    bullet: [
                        `저희는 Google Analytics 4 를 사용하여 사용 패턴을 분석하고 앱을 개선합니다. 
                        이에는 기기 정보나 사용 통계와 같은 익명화된 데이터가 포함될 수 있습니다.`
                    ]
                },
                {
                    title: '귀하의 권리',
                    bullet: [
                        '저희 서버에 개인 데이터가 수집되거나 저장되지 않으므로, 귀하는 데이터를 삭제하거나 접근하기 위한 조치를 취할 필요가 없습니다.'
                    ]
                },
                {
                    title: '쿠키',
                    bullet: [
                        'Google Analytics는 사용 추적을 위해 쿠키를 사용할 수 있습니다. 브라우저 설정을 통해 쿠키를 관리할 수 있습니다.'
                    ]
                }
            ],
            contact: `질문이 있으시면 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About Privacy and Terms of -Product offer to .pdf- Application">
                여기에</a> 연락해 주세요. (영어로 작성해 주세요)`
        },
        {
            title: '이용약관',
            date: '시행일: 2024년 12월 27일',
            introductionText: '"Product offer to .pdf" 를 사용함으로써 귀하는 다음의 약관에 동의하는 것입니다:',
            list: [
                {
                    title: '앱의 목적',
                    bullet: ['이 앱은 기업들이 고객을 위한 PDF 제안을 생성하는 용도로 제공됩니다.']
                },
                {
                    title: '사용자 책임',
                    bullet: [
                        '양식에 입력된 정보의 정확성을 확인하세요.',
                        '이 앱을 사용할 때 관련 법률을 준수하는 책임은 사용자에게 있습니다.',
                    ]
                },
                {
                    title: '로컬 저장소',
                    bullet: [
                        `이 앱은 편의를 위해 회사 정보를 브라우저에 로컬로 저장합니다. 
                        이 데이터는 백업되거나 지워지면 복구할 수 없습니다.`
                    ]
                },
                {
                    title: '보증 없음',
                    bullet: [`이 앱은 "있는 그대로" 제공되며, 정확성이나 신뢰성에 대한 보증이 없습니다.`]
                },
                {
                    title: '책임 제한',
                    bullet: [
                        `저희는 앱 사용으로 인해 발생하는 문제, 
                        데이터 손실 또는 생성된 PDF 오류에 대해 책임지지 않습니다.`
                    ]
                },
            ],
            contact: `
                이 약관에 동의하지 않으시면 앱 사용을 중단해 주세요. 
                질문이 있으시면 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About Privacy and Terms of -Product offer to .pdf- Application">
                여기에</a> 연락해 주세요. (영어로 작성해 주세요)`
        }
    ],
    buttonText: '홈으로 돌아가기'
};
