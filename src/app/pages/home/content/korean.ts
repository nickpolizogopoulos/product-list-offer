import { HomeContent } from "./types";

export const korean: HomeContent = {
    company: {
        sectionTitle: '회사 정보',
        name: {
            label: '회사명',
            errorMessage: '회사명을 입력하세요.'
        },
        subtitle: {
            label: '회사 부제 (선택 사항)',
            errorMessage: ''
        },
        phone: {
            label: '전화번호',
            errorMessage: '전화번호를 입력하세요.'
        },
        email: {
            label: '이메일 주소',
            errorMessage: '유효한 이메일 주소를 입력하세요.'
        },
        location: {
            label: '위치',
            errorMessage: '회사의 위치를 입력하세요.'
        }
    },
    client: {
        sectionTitle: '클라이언트 정보',
        name: {
            label: '클라이언트 이름',
            errorMessage: '클라이언트 이름을 입력하세요.'
        },
        phone: {
            label: '전화번호',
            errorMessage: '전화번호를 입력하세요.'
        },
        email: {
            label: '이메일 주소',
            errorMessage: '유효한 이메일 주소를 입력하세요.'
        },
    },
    settings: {
        sectionTitle: '제안 설정',
        radio1: '제안은 영구적으로 유효함',
        radio2: '만료 날짜가 있음',
        input: {
            label: '제안 만료 날짜',
            errorMessage: '입력 필드 옆에 있는 버튼을 클릭하여 날짜를 선택하세요.'
        },
        button: {
            add: '메모 추가',
            delete: '메모 삭제'
        },
        textAreaLabel: '메모 (최대 200자)'
    },
    products: {
        sectionTitle: '제품 목록',
        product: {
            title: {
                label: '제품 제목',
                errorMessage: '제품 제목을 입력하세요.'
            },
            quantity: {
                label: '수량',
                errorMessage: '수량을 추가해 주세요.'
            },
            unitPrice: {
                label: '단가 ₩',
                errorMessage: '제품 가격을 추가해 주세요.'
            }
        },
        listIsEmpty: '제품 목록에 제품이 없습니다. 빈 제품 목록으로 pdf 파일을 만들 수 없습니다!',
        mobileHeader: '제품 추가'
    },
    orientation: {
        vertical: '세로 .pdf',
        horizontal: '가로 .pdf'
    },
    colourOptions: {
        coloured: '컬러 pdf 파일 인쇄',
        withoutColour: '색상 제거 (잉크 절약)'
    },
    submit: {
        listEmptyMessage: '목록이 비어 있습니다.',
        formErrorMessage: '모든 필드가 올바르게 입력되었는지 확인하세요!',
        button: '.pdf 파일 다운로드'
    }
};
