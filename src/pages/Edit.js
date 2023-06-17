import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  //쿼리 스트링 사용하기
  //http://localhost:3000/edit?id=10&mode=dark
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  console.log(id, mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>일기 수정 페이지</p>
      {/* http://localhost:3000/edit?who=sooo111 */}
      <button onClick={() => setSearchParams({ who: "sooo111" })}>
        QS바꾸기
      </button>

      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
