import { useLocation } from "react-router";
var XMLParser = require('react-xml-parser');



const ResultPage = () => {
  const { state: xml } = useLocation();
  const json = new XMLParser().parseFromString(xml).children[1].children[1].children;
  const ids = ["CUST_NM", 'ADR', 'PRDT_NM', 'MOPH_NO'];

  // 모든사람의 데이터
  const datas = json.map((data: {children: any}) => {
    const tmpData: any = {};
    // 한사람의 모든 데이터
    data.children.forEach((data: any) => {
      if (ids.some(id => id === data.attributes.id)) {
        tmpData[data.attributes.id] = data.value.replaceAll('&#32;', ' ');
      }
    });
    return tmpData;
  });
  console.log(datas);
  return (
    <>
      {/* {aa} */}
    </>
  );
}

export default ResultPage;