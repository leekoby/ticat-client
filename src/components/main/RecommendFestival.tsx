import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

//type
import { RecommendSwiperOptions } from 'types/swiper/swiperOptions';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const RecommendFestival = () => {
  /** 2023.07.05 recommend banner swiper options - by mscojl24 */
  const swiperOptions: RecommendSwiperOptions = {
    spaceBetween: 110,
    slidesPerView: 3,
    grabCursor: true,
    loop: true,
  };

  return (
    <>
      <Swiper {...swiperOptions} className="mySwiper">
        {[...Array(6)].map((card, index) => (
          <SwiperSlide key={`${card}${index}`}>
            <RecommendCard>
              <div className="card-image"></div>
              <div className="card-text">
                <span>축제 이름 입니다 {`${index + 1}`}</span>
                <p>서울특별시 강남구</p>
              </div>
            </RecommendCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default RecommendFestival;

const RecommendCard = styled.div`
  width: 180px;
  height: 200px;
  color: var(--color-dark);

  .card-image {
    width: 180px;
    height: 140px;
    border-radius: 10px;
    background: var(--color-light-gray);
    margin-bottom: 10px;
  }

  .card-text {
    span {
      font-size: 1.5rem;
      font-weight: 700;
    }
    p {
      margin-top: 5px;
      font-size: 1.2rem;
    }
  }
`;
