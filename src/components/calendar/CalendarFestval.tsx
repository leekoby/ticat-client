import styled from 'styled-components';
import { CalendarListType, CalendarListListType } from 'types/api/calendar';
import { useNavigate } from 'react-router-dom';
// utils
import { formatDate } from '@utils/formatDate';
import { splitAddress } from '@utils/address';
import { deleteCalendarRequest } from '@api/calendar';
// icons
import { FaStar } from 'react-icons/fa';
import { TiHeartFullOutline } from 'react-icons/ti';

interface FestivalProps {
  item: CalendarListType;
}

const statusStlye = (state: string) => {
  if (state === 'ONGOING') {
    return { state: '진행중', style: 'ongoing' };
  } else if (state === 'COMPLETED') {
    return { state: '종료됨', style: 'completed' };
  } else if (state === 'EXPECTED') {
    return { state: '예정됨', style: 'expected' };
  }
  //상태가 명확하지 않을때 출력
  return { state: '미확인', style: 'completed' };
};

const CalendarFestival = ({ item }: FestivalProps) => {
  /** 2023/09/12 캘린더 삭제요청 함수 - parksubeom */
  const deleteCalendarList = () => {
    deleteCalendarRequest(item.calendarId);
    alert(`[${item.title}]일정이 삭제되었습니다.`);
  };
  const navigate = useNavigate();

  const routeStampPage = () => {
    navigate('/stamp/valid', { state: item });
  };
  return (
    <FestivalContainer>
      <ImgBox>
        <div className={`festival-status flex-all-center ${statusStlye(item.status).style}`}>
          {statusStlye(item.status).state}
        </div>
        {item.image !== '' ? <img src={item.image} /> : <img src="/assets/images/ticat-cover-image.png" />}
      </ImgBox>
      <DescriptionWrap onClick={routeStampPage}>
        <h3 className="festival-title">{item.title}</h3>
        <p className="festival-area">{splitAddress(item.address)}</p>
        <div className="icon-wrap">
          <div className="review-icon">
            <FaStar size="14px" color="#FFAD33" />
          </div>
          <p className="gap">|</p>
          <div className="review-icon">
            <TiHeartFullOutline size="14px" color="var(--color-sub)" />
          </div>
        </div>
        <p className="festival-date">
          {formatDate(item.eventStartDate)} ~ {formatDate(item.eventEndDate)}
        </p>
      </DescriptionWrap>
      <CalendarRightContainer>
        <FestivalrCategoryWrap>
          <p className="festival-right">{item.category}</p>
        </FestivalrCategoryWrap>
        <CalendarDeleteBtn onClick={deleteCalendarList}>삭제</CalendarDeleteBtn>
      </CalendarRightContainer>
    </FestivalContainer>
  );
};

export default CalendarFestival;

/** 2023/07/08 - 축제 컨테이너 - by sineTlsl */
const FestivalContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 105px;
  color: var(--color-dark);
  font-size: 13px;
`;

// 축제 정보 이미지
const ImgBox = styled.div`
  position: relative;
  flex: 0 0 95px;
  height: 100%;
  width: 100%;
  padding: 1rem 1rem 1rem 0;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  //축제 진행상태
  .festival-status {
    position: absolute;
    top: 10px;
    left: 0px;
    width: 50px;
    color: #fff;
    border-radius: 4px 0px 4px 0px;
  }

  .ongoing {
    background-color: var(--color-main);
  }

  .completed {
    background-color: var(--color-dark-gray);
  }

  .expected {
    background-color: #5597d4;
  }
`;

// 축제 정보 텍스트
const DescriptionWrap = styled.div`
  width: calc(100% - 95px - 35px);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0 1rem 0 0.3rem;

  > .festival-title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-dark);
    font-weight: 700;
    line-height: 2rem;
    font-size: 16px;
  }

  > .festival-area {
    width: 100%;
    font-size: 12px;

    @media screen and (max-width: 400px) {
      font-size: 11px;
      line-height: 15px;
    }
  }
  > .icon-wrap {
    display: flex;
  }
  > .icon-wrap > .gap {
    display: inline-block;
    font-size: 0;
    width: 1px;
    height: 10px;
    background: var(--color-dark-gray);
    margin: 4px 6px 0 8px;
    vertical-align: top;
    box-sizing: border-box;
  }
  > .icon-wrap > .review-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }
  > .festival-date {
    color: var(--color-dark-gray);
  }
`;

const CalendarRightContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 축제 카테고리
const FestivalrCategoryWrap = styled.div`
  height: 100%;
  color: var(--color-dark-gray);
  font-size: 12px;
  width: 35px;
  display: flex;
  white-space: nowrap;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 1.2rem;

  @media screen and (max-width: 400px) {
    font-size: 11px;
  }
`;
const CalendarDeleteBtn = styled.button`
  width: 35px;
  height: 20px;
  border: none;
  background-color: red;
  border-radius: 5px;
  font-size: 12px;
  padding: 0;
  margin-bottom: 20px;
  cursor: pointer;
`;