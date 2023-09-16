import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  //targetDiary를 상태로 다룰 state만들어 줌
  const [originData, setOriginData] = useState();

  useEffect(() => {
    if (DiaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      console.log(targetDiary);

      if (targetDiary) {
        //id 값이 제대로 전달 되었을 때
        setOriginData(targetDiary);
      } else {
        //아이디가 잘못전달되었을 때
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {/* originData가 있으면 DiaryEditor 랜더 */}
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
