import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import SLIDES from './../SliderData';

const Slider = () => {
    //이미지 갯수 설정 : 실제 갯수보다 1개 적게
    const TOTAL_SLIDES = 2;
    const delay = 3000;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef();
    const timeoutRef = useRef();


    // 다음버튼
    const nextSlide = () => {
        if(currentSlide >= TOTAL_SLIDES) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    }

    //이전버튼
    const prevSlide = () => {
        if(currentSlide === 0){
            setCurrentSlide(2);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    }

    //useRef
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    //렌더링 되기 이전의 코드 제작할 때는 useEffect로 
    useEffect(() => {
        //자동시작
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setCurrentSlide((prevIndex) =>
              prevIndex === TOTAL_SLIDES ? 0 : prevIndex + 1,
            ),
          delay,
        );
        
        //자동끝
        slideRef.current.style.transition = 'ease 1000ms';
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    
        // cleanup 함수
        return () => {
          //리소스 잡기때문에 항상 써준다
          resetTimeout();
        };

      }, [currentSlide]);



    return (
        <SliderWrapper>
            {/* 이미지 */}
            <ContainerWrapper ref={slideRef}>
                {SLIDES.map((slide) => (
                    <img key={slide.id} src={slide.url} alt='slide'/>
                ))}                
            </ContainerWrapper>

            {/* 좌우 버튼 */}
            <ButtonWrapper>
                <Button>
                    <ArrowLeft onClick={prevSlide} />
                </Button>
                <Button>
                    <ArrowRight onClick={nextSlide} />
                </Button>
            </ButtonWrapper>

            {/* 닷메뉴 버튼 */}
            <DotWrapper>
                {SLIDES.map((dot) => (
                    <DotButton
                        key={dot.id}
                        className={currentSlide === dot.id ? 'active' : ''}
                        onClick={() => {
                            setCurrentSlide(dot.id);
                        }}
                    />
                ))}
            </DotWrapper>
        </SliderWrapper>
    );
};

const SliderWrapper = styled.section`
    width: 100%;
    overflow: hidden;
    position: relative;
    background-color: lightcoral;
`;

const ContainerWrapper = styled.div`
    width: 100%;
    display: flex;
    img{
        width:100%;
        }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 40%;
`;

const Button = styled.button`
    all : unset;
    background: rgba(255,255,255,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    /* react-icons를 꾸밀 때 */
    svg{ 
        font-size: 64px;
    }
    &:hover{
        background: #ffc300;
        color: #fff;
        transition: all 0.3s ease-in-out;
    }
`;

// reacti-icon을 styled-components로 꾸밀 때
const ArrowLeft = styled(MdKeyboardArrowLeft)`
    color: #ccc;
    &:hover{
        background: #ffc300;
        color: #fff;
        transition: all 0.3s ease-in-out;
    }
`;

const ArrowRight = styled(MdKeyboardArrowRight)`
    color: #ccc;
    &:hover{
        background: #ffc300;
        color: #fff;
        transition: all 0.3s ease-in-out;
    }
`;

const DotWrapper = styled.div`
    text-align: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
`;

const DotButton = styled.span`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    margin: 0 5px;
    cursor: pointer;

    &.active {
        background: #ffc300;
    }
`;

export default Slider;