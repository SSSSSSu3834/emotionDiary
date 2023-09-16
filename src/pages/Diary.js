import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useState } from "react";
import { getStringDate } from "../util/date";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryEditor from "../components/DiaryEditor";

const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  // 가장 첫번째로 할 일은 DiaryStateContext에 있는 다이어리 데이터를 가져오는 것임.
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        // targetDiary가 존재할 때
        setData(targetDiary);
      } else {
        //targetDiary가 존재하지 않을 때: 홈으로 돌아가서 다시 되돌아 오지 못하게 replace 사용
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text="수정하기"
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
      </div>
    );
  }
};

export default Diary;
