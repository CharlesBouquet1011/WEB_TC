import { useNavigate } from "react-router";

function Switch({page,texte}) {
  const navigate=useNavigate()
  return (
    <div>
      <button onClick={() => change(page,navigate)}> {texte} </button>
    </div>
  );
}


async function change(page,navigate){
    navigate(page)   
}
export default Switch