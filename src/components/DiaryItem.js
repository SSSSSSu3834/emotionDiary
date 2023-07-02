import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  //date값을 우리가 알아볼 수 있는 값으로 변경해준다
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const navigate = useNavigate();

  //사진이나 글 누르면 detail 페이지로 가도록하는 함수
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      {/* className을 emotion에 따라 유동적으로 바뀌도록 설정 */}
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `asset/emotion${emotion}.png`} />
        {/* 들어오는 emotion의 값에따라 로드되는 이미지가 바뀌도록 해주었다. */}
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
};

export default DiaryItem;
