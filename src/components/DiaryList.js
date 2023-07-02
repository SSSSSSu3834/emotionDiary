import React, { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "lastest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "모두" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

//일기를 정렬해주는 컴포넌트
const ControlMenu = ({ value1, onChange, optionList }) => {
  return (
    //option에서 선택된 value값이 onChange의 e.target.value가 되는 것임
    //그리고 setsortType가져와서 상태를 변화시킴. 그게 select의 value값이 됨
    <select
      className="ControlMenu"
      value={value1}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  //새 일기 쓰기에서 다른 페이지로 이동시키기 위해
  const navigate = useNavigate();
  //날짜 정렬위한 상태값
  const [sortType, setSortType] = useState("lastest");
  //감정 필터링을 위한 상태값
  const [filter, setFilter] = useState("all");

  const getPrecessedDiaryList = () => {
    //감정 필터링 함수
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      } //불리언값 반환
    };

    //sort 함수의 비교함수
    const compare = (a, b) => {
      if (sortType === "lastest") {
        //날짜숫자가 큰것부터(최신순부터) 정렬 (b-a : 내림차순)
        return parseInt(b.date) - parseInt(a.date);
      } else {
        //날짜 숫자가 작은것부터(예전것부터) 정렬(a-b: 오름차순)
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //diaryList를 sort시키면 배열자체가 바뀌기 때문에 배열을 복사해서 하나더 만든다.
    //JSON.stringify(diaryList) diaryList를 문자열로 바꿔준다음
    //다시  JSON.parse를 통해서 배열로 바꿔준 후 copy한다.
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallback(it));

    //sort 함수는 인자로 들어가는 비교함수에 따라 정렬순서를 결정한다.
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getPrecessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
