import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import { DiaryDispatchContext } from "../App";
import { getStringDate } from "../util/date";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/asset/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/asset/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/asset/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/asset/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/asset/emotion5.png`,
    emotion_descript: "완전 나쁨",
  },
];

const DiaryEditor = ({ isEdit, originData }) => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigation = useNavigate();

  //emotion 값을 저장할 state
  const [emotion, setEmotion] = useState(3);

  // 감정 그림을 클릭했을 때 실행되는 함수
  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  //일기 작성을 위한 state
  const [content, setContent] = useState("");
  //textarea에 포커스 주기 위해
  const contentRef = useRef();

  const navigate = useNavigate();

  //App에서 만들어준 컨텍스트를 가져와서 onCreate함수를 불러준다.
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  //작성 완료 눌렀을 때 핸들러
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    )
      if (!isEdit) {
        //수정하는 페이지가 아니면 oncreate에 데이터르 넣어주고
        onCreate(date, content, emotion);
      } else {
        // 수정하는 페이지면 onEdit에 데이터를 넣어줌
        // 그럼 app.js에 있는 context로 들어가서 새로운 배열 만들어줌
        onEdit(originData.id, date, content, emotion);
      }

    // 저장했으면 홈으로 돌아가기(뒤로가기로 다시 돌아오지 못하게 만들것임)
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      //Edit 페이지에서만 이 로직이 로딩 되도록 만들어줌
      // 예전에 입력했던 데이터가 그대로 들어오게 됨.
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigation(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {/* type='date' 날짜를 고를 수 있는 캘린터형식의 인풋박스가 나온다 */}
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box_emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onChange={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
