import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import React, { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
  //App에서 넘겨준 data를 프롭스로 받아준다.
  const diaryList = useContext(DiaryStateContext);

  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  //App에서 넘겨준 data를 사용하기 위해
  const [data, setData] = useState([]);

  //월을 하나씩 늘리고 줄이는 함수(버튼 클릭시 들어감)
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };
  /////////////////////////////

  //월이 변함에 따라 나오는 일기를 바꿔주기 위한 필터링 함수
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
      //아이템의 데이터가 처음날짜와 마지막 날짜 사이일때만 다이어리 리스트를 set해줌
    }
  }, [diaryList, curDate]);

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
