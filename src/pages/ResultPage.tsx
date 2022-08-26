import { useMemo } from "react";
import { useLocation } from "react-router";
import Table, { TTableColumns, TTableData } from "../components/Table";
var XMLParser = require('react-xml-parser');




const ResultPage = () => {
  const { state: xml } = useLocation();
  const json = new XMLParser().parseFromString(xml).children[1].children[1].children;
  const ids = ["CUST_NM", 'ADR', 'PRDT_NM', 'MOPH_NO', 'ORD_NO'];

  const datas = json.map((data: {children: any}) => {
    const tmpData: {[idx:string]: string} = {};
    // 한사람의 모든 데이터
    data.children.forEach((data: any) => {
      if (ids.some(id => id === data.attributes.id)) {
        tmpData[data.attributes.id] = data.value.replaceAll('&#32;', ' ');
      }
    });
    return tmpData;
  });
  

  const rows = useMemo(()=>{
    const r: TTableData[] = [];
    datas.forEach( (data:any) => {
      const colums: TTableColumns[] = [
        {key:`ADR${data["ORD_NO"]}`, render: <span>{data["ADR"]}</span>},
        {key:`CUST_NM${data["ORD_NO"]}`, render: <span>{data["CUST_NM"]}</span>},
        {key:`MOPH_NO${data["ORD_NO"]}`, render: <span>{data["MOPH_NO"]}</span>},
        {key:`PRDT_NM${data["ORD_NO"]}`, render: <span>{data["PRDT_NM"]}</span>}
      ];
      r.push({id: data["ORD_NO"], columns: colums});
    });
    return r;
  },[datas]);
  
  return (
    <>
      <Table 
        headers={["이름", "주소", "전화번호", "상품명"]}
        rows={rows}
      />
    </>
  );
}

export default ResultPage;